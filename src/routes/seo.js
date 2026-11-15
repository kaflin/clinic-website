'use strict';

// robots.txt and sitemap.xml, built from the same lists the pages use so
// they never fall out of step.

const express = require('express');
const { config } = require('../config');
const { services, doctors } = require('../services/content');

const router = express.Router({ caseSensitive: true, strict: true });

const STATIC_PATHS = [
  '/', '/about', '/doctors', '/services', '/patient-information', '/contact',
  '/appointment', '/privacy-policy', '/terms', '/medical-disclaimer',
];

function publicPaths() {
  return [
    ...STATIC_PATHS,
    ...services.map((service) => `/services/${service.slug}`),
    ...doctors.map((doctor) => `/doctors/${doctor.slug}`),
  ];
}

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
});

router.get('/sitemap.xml', (req, res) => {
  const urls = publicPaths()
    .map((path) => `  <url><loc>${config.siteUrl}${path === '/' ? '/' : path}</loc></url>`)
    .join('\n');
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
});

module.exports = router;
module.exports.publicPaths = publicPaths;
