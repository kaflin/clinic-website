'use strict';

// Reads the clinic's facts and reports what is still missing. Templates use
// fact() so a missing value shows as a clear marker and is never invented.

const clinic = require('../data/clinic');
const doctors = require('../data/doctors');
const services = require('../data/services');
const faqs = require('../data/faqs');

const isEmpty = (value) =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

// Returns the value, or a marker like [CLINIC NAME] when it has not been filled in.
function fact(value, label) {
  return isEmpty(value) ? `[${label}]` : value;
}

function missingFacts() {
  const missing = [];
  const need = (value, where) => { if (isEmpty(value)) missing.push(where); };

  need(clinic.name, 'clinic.js: name');
  need(clinic.establishedYear, 'clinic.js: establishedYear');
  need(clinic.city, 'clinic.js: city');
  need(clinic.address.street, 'clinic.js: address.street');
  need(clinic.address.area, 'clinic.js: address.area');
  need(clinic.phone, 'clinic.js: phone');
  need(clinic.emergencyPhone, 'clinic.js: emergencyPhone');
  need(clinic.email, 'clinic.js: email');
  need(clinic.hours.display, 'clinic.js: hours.display');
  need(clinic.hours.schema, 'clinic.js: hours.schema');
  need(clinic.geo.latitude, 'clinic.js: geo.latitude');
  need(clinic.geo.longitude, 'clinic.js: geo.longitude');
  need(clinic.mapEmbedUrl, 'clinic.js: mapEmbedUrl');
  need(clinic.directionsUrl, 'clinic.js: directionsUrl');
  need(clinic.googleReviewsUrl, 'clinic.js: googleReviewsUrl');
  clinic.credentials.forEach((item) => need(item.value, `clinic.js: credentials "${item.label}"`));
  need(clinic.testimonial.quote, 'clinic.js: testimonial.quote');
  need(clinic.testimonial.patientName, 'clinic.js: testimonial.patientName');
  need(clinic.about.history, 'clinic.js: about.history');
  need(clinic.about.facilities, 'clinic.js: about.facilities');
  need(clinic.appointmentRetentionMonths, 'clinic.js: appointmentRetentionMonths');
  need(clinic.policiesReviewedOn, 'clinic.js: policiesReviewedOn');

  if (doctors.length === 0) missing.push('doctors.js: no doctors listed');
  doctors.forEach((doctor) => {
    const where = `doctors.js: ${doctor.slug}`;
    need(doctor.name, `${where} name`);
    need(doctor.qualifications, `${where} qualifications`);
    need(doctor.role, `${where} role`);
    need(doctor.registrationNumber, `${where} registrationNumber`);
    need(doctor.experienceYears, `${where} experienceYears`);
    need(doctor.bio, `${where} bio`);
    need(doctor.photo, `${where} photo`);
  });

  services.forEach((service) => {
    need(service.review.reviewedBy, `services.js: ${service.slug} review.reviewedBy`);
    need(service.review.reviewedOn, `services.js: ${service.slug} review.reviewedOn`);
  });

  need(faqs.review.reviewedBy, 'faqs.js: review.reviewedBy');
  need(faqs.review.reviewedOn, 'faqs.js: review.reviewedOn');

  return missing;
}

// The clinic's facts as shown on the page, each with its marker for when it
// is missing. Routes, templates and emails all read them from here.
const display = {
  clinicName: fact(clinic.name, 'CLINIC NAME'),
  city: fact(clinic.city, 'CITY'),
  hours: fact(clinic.hours.display, 'OPENING HOURS'),
  phone: fact(clinic.phone, 'PHONE'),
  emergencyPhone: fact(clinic.emergencyPhone, 'EMERGENCY PHONE'),
};

// One line for the footer and contact details, written the same way everywhere.
function addressLine() {
  const a = clinic.address;
  const parts = [a.street, a.area, clinic.city, a.postalCode].filter((part) => !isEmpty(part));
  return parts.length ? parts.join(', ') : '[ADDRESS]';
}

function telHref(phone) {
  return isEmpty(phone) ? null : `tel:${String(phone).replace(/[^\d+]/g, '')}`;
}

function formatDate(isoDate) {
  if (isEmpty(isoDate)) return null;
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// FAQ answers with the clinic's phone and hours filled in.
function faqItems() {
  return faqs.items.map((item) => ({
    question: item.question,
    answer: item.answer.replace(/\{(\w+)\}/g, (match, key) => display[key] ?? match),
  }));
}

const findService = (slug) => services.find((service) => service.slug === slug);
const findDoctor = (slug) => doctors.find((doctor) => doctor.slug === slug);
const leadDoctor = () => doctors.find((doctor) => doctor.lead) || doctors[0] || null;
const doctorsForService = (slug) => doctors.filter((doctor) => doctor.services.includes(slug));
const servicesForDoctor = (doctor) => services.filter((service) => doctor.services.includes(service.slug));

module.exports = {
  clinic, doctors, services, faqs,
  isEmpty, fact, display, missingFacts, addressLine, telHref, formatDate, faqItems,
  findService, findDoctor, leadDoctor, doctorsForService, servicesForDoctor,
};
