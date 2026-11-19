'use strict';

const express = require('express');
const { config } = require('../config');
const { issueToken } = require('../middleware/csrf');
const content = require('../services/content');
const data = require('../services/structured-data');

const router = express.Router({ caseSensitive: true, strict: true });
const { fact } = content;
const { city } = content.display;
const HOME = { name: 'Home', path: '/' };

/*
  Renders an inner page. Every inner page needs the same things: a breadcrumb
  trail from the home page, the matching breadcrumb data for Google, and its
  own title and description. They are put together here once.

  page      { name, path, title, description }
  options   jsonLd  extra structured data for this page
            parent  the page above this one, as { name, path }
            locals  anything else the template needs
*/
function renderPage(res, view, page, { jsonLd = [], parent, locals = {} } = {}) {
  const trail = [HOME, ...(parent ? [parent] : []), { name: page.name, path: page.path }];
  res.render(view, {
    meta: {
      title: page.title,
      description: page.description,
      path: page.path,
      jsonLd: [...jsonLd, data.breadcrumbData(trail, config.siteUrl)],
    },
    trail,
    ...locals,
  });
}

const DOCTORS = { name: 'Our surgeons', path: '/doctors' };
const SERVICES = { name: 'Treatments', path: '/services' };

router.get('/', issueToken, (req, res) => {
  res.render('pages/home', {
    meta: {
      title: `Orthopaedic clinic in ${city}`,
      description: `Orthopaedic clinic in ${city} for joint replacement, spine surgery, fractures and sports injuries. See our surgeons, OPD hours and how to book.`,
      path: '/',
      jsonLd: [data.clinicData(config.siteUrl)],
    },
    lead: content.leadDoctor(),
    faqs: content.faqItems().slice(0, 3),
  });
});

router.get('/about', (req, res) => {
  renderPage(res, 'pages/about', {
    name: 'About the practice',
    path: '/about',
    title: `About our orthopaedic practice in ${city}`,
    description: `Who we are, how the clinic started, what we have on site and what happens at your first visit to our orthopaedic clinic in ${city}.`,
  }, { locals: { doctors: content.doctors } });
});

router.get(DOCTORS.path, (req, res) => {
  renderPage(res, 'pages/doctors', {
    ...DOCTORS,
    title: `Orthopaedic surgeons in ${city}`,
    description: `Meet the orthopaedic surgeons at our clinic in ${city}: their qualifications, registration numbers, experience and the conditions they treat.`,
  }, { locals: { doctors: content.doctors, servicesForDoctor: content.servicesForDoctor } });
});

router.get('/doctors/:slug', (req, res, next) => {
  const doctor = content.findDoctor(req.params.slug);
  if (!doctor) return next();
  const name = fact(doctor.name, 'DOCTOR NAME');
  renderPage(res, 'pages/doctor', {
    name,
    path: `/doctors/${doctor.slug}`,
    title: `${name}, orthopaedic surgeon in ${city}`,
    description: `${name}, ${fact(doctor.qualifications, 'QUALIFICATIONS')}. Qualifications, experience, medical council registration and the conditions treated.`,
  }, {
    parent: DOCTORS,
    jsonLd: [data.physicianData(doctor, config.siteUrl)],
    locals: { doctor, doctorServices: content.servicesForDoctor(doctor) },
  });
});

router.get(SERVICES.path, (req, res) => {
  renderPage(res, 'pages/services', {
    ...SERVICES,
    title: `Orthopaedic treatments in ${city}`,
    description: `Treatments at our orthopaedic clinic in ${city}: joint replacement, spine surgery, fracture care, arthroscopy, arthritis and physiotherapy.`,
  });
});

router.get('/services/:slug', (req, res, next) => {
  const service = content.findService(req.params.slug);
  if (!service) return next();
  renderPage(res, 'pages/service', {
    name: service.name,
    path: `/services/${service.slug}`,
    title: `${service.heading} in ${city}`,
    description: service.summary,
  }, {
    parent: SERVICES,
    locals: {
      service,
      serviceDoctors: content.doctorsForService(service.slug),
      otherServices: content.services.filter((other) => other.slug !== service.slug),
    },
  });
});

router.get('/patient-information', (req, res) => {
  renderPage(res, 'pages/patient-information', {
    name: 'Patient information',
    path: '/patient-information',
    title: `Patient information and common questions, ${city}`,
    description: 'What to bring to your first orthopaedic visit, when to go to emergency, how long recovery takes and other questions patients ask us.',
  }, {
    jsonLd: [data.faqData()],
    locals: { faqs: content.faqItems(), review: content.faqs.review },
  });
});

router.get('/contact', issueToken, (req, res) => {
  renderPage(res, 'pages/contact', {
    name: 'Contact',
    path: '/contact',
    title: `Contact our orthopaedic clinic in ${city}`,
    description: `Address, phone number, OPD hours and a map for our orthopaedic clinic in ${city}. Call us or send an appointment request.`,
  }, { jsonLd: [data.clinicData(config.siteUrl)] });
});

// The legal pages differ only in their text, so one route serves all three.
const LEGAL_PAGES = [
  { path: '/privacy-policy', view: 'pages/privacy-policy', name: 'Privacy policy', description: 'What we collect when you ask for an appointment, why we collect it, who can see it and how long we keep it.' },
  { path: '/terms', view: 'pages/terms', name: 'Terms of use', description: 'The terms for using this website, including how appointment requests work.' },
  { path: '/medical-disclaimer', view: 'pages/medical-disclaimer', name: 'Medical disclaimer', description: 'The health information on this site is general. It does not replace an examination by a doctor.' },
];

for (const { view, ...page } of LEGAL_PAGES) {
  router.get(page.path, (req, res) => renderPage(res, view, { ...page, title: page.name }));
}

module.exports = router;
