'use strict';

// Builds the JSON-LD objects Google reads. Missing facts are left out, so
// the markup never carries a made-up value.

const { clinic, isEmpty, faqItems, servicesForDoctor } = require('./content');

const clean = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => !isEmpty(value)));

function clinicData(siteUrl) {
  const a = clinic.address;
  const address = clean({
    '@type': 'PostalAddress',
    streetAddress: [a.street, a.area].filter((part) => !isEmpty(part)).join(', '),
    addressLocality: clinic.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  });
  const hasGeo = !isEmpty(clinic.geo.latitude) && !isEmpty(clinic.geo.longitude);

  return clean({
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}/#clinic`,
    name: clinic.name,
    url: `${siteUrl}/`,
    medicalSpecialty: 'Orthopedic',
    telephone: clinic.phone,
    email: clinic.email,
    foundingDate: clinic.establishedYear ? String(clinic.establishedYear) : null,
    address,
    geo: hasGeo ? { '@type': 'GeoCoordinates', latitude: clinic.geo.latitude, longitude: clinic.geo.longitude } : null,
    hasMap: clinic.directionsUrl,
    openingHoursSpecification: isEmpty(clinic.hours.schema) ? null : clinic.hours.schema.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [clinic.facebookUrl, clinic.googleReviewsUrl].filter((url) => !isEmpty(url)),
  });
}

function physicianData(doctor, siteUrl) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    url: `${siteUrl}/doctors/${doctor.slug}`,
    image: doctor.photo ? `${siteUrl}/images/${doctor.photo.file}` : null,
    jobTitle: doctor.role,
    medicalSpecialty: 'Orthopedic',
    identifier: doctor.registrationNumber,
    availableService: servicesForDoctor(doctor).map((service) => ({
      '@type': 'MedicalProcedure',
      name: service.name,
      url: `${siteUrl}/services/${service.slug}`,
    })),
    worksFor: { '@id': `${siteUrl}/#clinic` },
  });
}

function faqData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems().map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

// trail: [{ name, path }] from the home page down to the current page.
function breadcrumbData(trail, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${siteUrl}${step.path}`,
    })),
  };
}

// Turns an object into text that is safe inside a <script> tag. The data is
// the clinic's own, but "<" is still escaped so it can never close the tag.
function toScriptJson(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

module.exports = { clinicData, physicianData, faqData, breadcrumbData, toScriptJson };
