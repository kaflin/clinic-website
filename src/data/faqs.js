'use strict';

/*
  Questions patients ask, shown on the Patient information page.

  Answers are plain text. {phone}, {emergencyPhone} and {hours} are replaced
  with the values from clinic.js, so they only need changing in one place.

  A doctor at the clinic must read and approve this file before launch.
  Record that in `review` below.
*/

module.exports = {
  review: {
    reviewedBy: null,   // e.g. 'Dr First Last, MS (Orthopaedics)'
    reviewedOn: null,   // e.g. '2026-11-15'
  },

  items: [
    {
      question: 'How do I book an appointment?',
      answer: 'Fill in the appointment form on this site or call us on {phone}. If you use the form, our front desk will call you back to agree a time. Your appointment isn\'t confirmed until you\'ve spoken to us.',
    },
    {
      question: 'What should I bring to my first visit?',
      answer: 'Bring any X-rays, MRI or CT scans and reports you already have, even old ones. Bring a list of the medicines you take, including the dose. If another doctor has treated the same problem, bring their notes or discharge summary. Wear loose clothes so we can examine the joint easily.',
    },
    {
      question: 'When should I go to emergency instead of booking a visit?',
      answer: 'Go to an emergency department straight away if a bone is showing through the skin, a limb looks bent or out of place, you can\'t move or feel your arm or leg after an injury, you\'ve lost control of your bladder or bowel along with back pain, or a joint is hot, swollen and you have a fever. Our emergency number is {emergencyPhone}.',
    },
    {
      question: 'Do I need surgery if I have knee pain?',
      answer: 'Usually not. Most knee pain gets better with rest, exercises, weight control and medicine. We only talk about surgery when the pain stops you from doing ordinary things and other treatment hasn\'t helped. We\'ll examine you and look at your X-rays before we suggest anything.',
    },
    {
      question: 'How long does it take to recover from a joint replacement?',
      answer: 'It differs from person to person. Most people stand and take a few steps with a walker within a day or two of the operation, and walk with a stick after a few weeks. Getting back full strength often takes three to six months of regular exercises. Your surgeon will give you a plan based on your age, health and the joint that was replaced.',
    },
    {
      question: 'Will I need physiotherapy?',
      answer: 'After most operations and many injuries, yes. Physiotherapy is a set of guided exercises that brings back movement and strength. Patients who do their exercises regularly tend to recover faster and have less stiffness.',
    },
    {
      question: 'What are your OPD hours?',
      answer: 'Our outpatient department (OPD) is open {hours}. Call {phone} before you travel on public holidays, because hours can change.',
    },
  ],
};
