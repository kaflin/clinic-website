'use strict';

const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const { config } = require('./config');
const content = require('./services/content');
const structuredData = require('./services/structured-data');
const { LIMITS, EMPTY_FORM } = require('./services/appointments');
const { logError, errorName } = require('./services/log');
const pageRoutes = require('./routes/pages');
const appointmentRoutes = require('./routes/appointments');
const seoRoutes = require('./routes/seo');

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About the practice', path: '/about' },
  { label: 'Our surgeons', path: '/doctors' },
  { label: 'Treatments', path: '/services' },
  { label: 'Patient information', path: '/patient-information' },
  { label: 'Contact', path: '/contact' },
  { label: 'Book appointment', path: '/appointment' },
];

// The <head> details for pages that search engines should skip.
const hiddenPageMeta = (title, description, path) => ({ title, description, path, noindex: true });

function createApp(assets) {
  const app = express();
  const publicDir = path.join(__dirname, '..', 'public');

  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('case sensitive routing', true);
  app.set('strict routing', true);

  if (config.isProduction) {
    // The app sits behind one reverse proxy (nginx or the host's load balancer).
    app.set('trust proxy', 1);
    app.set('view cache', true);

    // One address only: https, on the host named in SITE_URL.
    const site = new URL(config.siteUrl);
    app.use((req, res, next) => {
      if (req.secure && req.hostname === site.hostname) return next();
      res.redirect(301, `${config.siteUrl}${req.originalUrl}`);
    });
  }

  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        frameSrc: ['https://www.google.com'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        ...(config.isProduction ? { upgradeInsecureRequests: [] } : {}),
      },
    },
    strictTransportSecurity: config.isProduction
      ? { maxAge: 31536000, includeSubDomains: true }
      : false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  }));

  app.use(compression());

  // One address per page: lowercase, no trailing slash.
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const clean = req.path.length > 1 ? req.path.toLowerCase().replace(/\/+$/, '') || '/' : req.path;
    if (clean === req.path || req.path.startsWith('//')) return next();
    const query = req.originalUrl.slice(req.path.length);
    res.redirect(301, clean + query);
  });

  // Minified CSS and JavaScript, cached for a year because the name changes with the content.
  for (const asset of [assets.css, assets.js]) {
    app.get(asset.path, (req, res) => {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
      res.type(asset.type).send(asset.body);
    });
  }

  app.use(express.static(publicDir, {
    index: false,
    dotfiles: 'ignore',
    maxAge: config.isProduction ? '7d' : 0,
  }));

  app.use(cookieParser(config.cookieSecret));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  // Values every template can use.
  app.use((req, res, next) => {
    Object.assign(res.locals, {
      clinic: content.clinic,
      services: content.services,
      fact: content.fact,
      clinicName: content.display.clinicName,
      cityName: content.display.city,
      hoursText: content.display.hours,
      addressLine: content.addressLine(),
      telHref: content.telHref,
      formatDate: content.formatDate,
      toScriptJson: structuredData.toScriptJson,
      nav: NAV,
      currentPath: req.path,
      siteUrl: config.siteUrl,
      assets,
      form: EMPTY_FORM,
      formLimits: LIMITS,
    });
    next();
  });

  app.use(seoRoutes);
  app.use(appointmentRoutes);
  app.use(pageRoutes);

  // Nothing matched.
  app.use((req, res) => {
    res.status(404).render('pages/not-found', {
      meta: hiddenPageMeta('Page not found', 'This page does not exist.', req.path),
    });
  });

  // Something went wrong. The patient sees a plain page. The log gets the
  // time, the route and the error, and never the form contents.
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    const status = error.status && error.status >= 400 && error.status < 600 ? error.status : 500;
    if (status >= 500) {
      logError(`${req.method} ${req.path} ${status} ${errorName(error)}`);
      if (!config.isProduction) console.error(error.stack);
    }
    if (res.headersSent) return res.end();

    const tooLarge = status === 413;
    const badForm = status === 403;
    res.status(status).render('pages/error', {
      meta: hiddenPageMeta('Something went wrong', 'This page could not be shown.', req.path),
      heading: badForm ? 'This form has expired' : tooLarge ? 'That was too much text' : 'Something went wrong on our side',
      message: badForm
        ? 'The page was open for a long time, so we couldn\'t accept the form. Please open the appointment page again and resend it.'
        : tooLarge
          ? 'Please shorten your message and send the form again.'
          : 'We couldn\'t show this page. Please try again in a few minutes, or call us.',
    });
  });

  return app;
}

module.exports = { createApp };
