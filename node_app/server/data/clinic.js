'use strict';

/*
  The clinic's own facts. This is the one place to fill them in.

  Anything left as null shows on the site as a marker in square brackets,
  like [CLINIC NAME], so nothing is ever invented. Run `npm run check:content`
  to list what is still missing. The site refuses to start in production
  until this list is empty.

  Every value here must come from the clinic's own records.
*/

module.exports = {
  // Shown in the header, footer, page titles and search results.
  name: null,                 // e.g. 'Himal Orthopaedic Clinic'
  tagline: 'Orthopaedic and joint care',
  establishedYear: null,      // e.g. 2004

  // Name, address and phone (NAP). Write these exactly as they appear on
  // the Google Business Profile and the Facebook page.
  city: null,                 // e.g. 'Kathmandu'
  address: {
    street: null,             // e.g. 'Maharajgunj Road'
    area: null,               // e.g. 'Maharajgunj'
    region: null,             // province, e.g. 'Bagmati'
    postalCode: null,         // e.g. '44600'
    country: 'NP',            // two-letter country code
  },
  phone: null,                // with country code, e.g. '+977-1-4000000'
  emergencyPhone: null,
  email: null,

  // Opening hours. `display` is what patients read. `schema` is the same
  // information for Google, e.g.
  //   [{ days: ['Sunday', 'Monday'], opens: '09:00', closes: '17:00' }]
  hours: {
    display: null,            // e.g. 'Sunday to Friday, 9am to 5pm'
    schema: null,
  },

  // Map. Take these from the clinic's Google Maps listing.
  geo: { latitude: null, longitude: null },
  mapEmbedUrl: null,          // "Share" > "Embed a map" > the src address only
  directionsUrl: null,        // "Share" > "Send a link"

  // Profiles elsewhere.
  googleReviewsUrl: null,
  facebookUrl: null,

  // The four facts in the strip under the home page hero.
  credentials: [
    { label: 'Hospital affiliation', value: null },
    { label: 'Medical council registration', value: null },
    { label: 'Fellowship training', value: null },
    { label: 'Joint replacements performed', value: null },
  ],

  // One real patient's words, used with their permission. Never write one.
  testimonial: {
    quote: null,
    patientName: null,
    treatment: null,
    year: null,
  },

  // About page. Each entry is one paragraph.
  about: {
    history: null,            // e.g. ['Dr ... opened the clinic in ...', '...']
    facilities: null,         // e.g. ['Digital X-ray', 'Plaster room', ...]
  },

  // How long appointment requests are kept before they are deleted.
  // The privacy policy quotes this number.
  appointmentRetentionMonths: null,   // e.g. 12

  // The date the legal pages were last approved by the clinic, e.g. '2026-11-15'.
  policiesReviewedOn: null,
};
