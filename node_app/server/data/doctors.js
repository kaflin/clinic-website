'use strict';

/*
  The clinic's doctors. One entry per doctor, one page per entry.

  Fill these in from the clinic's records. null values show on the site as
  markers in square brackets until they are filled in.

  slug       the page address: /doctors/<slug>. Lowercase, hyphens, no spaces.
             Change 'lead-surgeon' to the doctor's name, e.g. 'dr-first-last'.
  lead       true for the surgeon named in the home page hero. One doctor only.
  services   slugs from services.js that this doctor treats. These make the
             links between doctor pages and treatment pages.
  photo      a WebP file in images, named like
             'dr-first-last-orthopaedic-surgeon.webp', with its real pixel size.
*/

module.exports = [
  {
    slug: 'lead-surgeon',
    lead: true,
    name: null,                   // e.g. 'Dr First Last'
    qualifications: null,         // e.g. 'MBBS, MS (Orthopaedics)'
    role: null,                   // e.g. 'Senior consultant orthopaedic surgeon'
    registrationNumber: null,     // medical council number
    experienceYears: null,
    services: ['knee-hip-replacement', 'spine-surgery', 'fracture-care', 'arthroscopy', 'arthritis'],
    bio: null,                    // paragraphs, e.g. ['Trained at ...', '...']
    photo: null,                  // { file: 'dr-....webp', width: 800, height: 1000 }
  },
];
