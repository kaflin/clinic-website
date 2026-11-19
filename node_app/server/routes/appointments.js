'use strict';

const express = require('express');
const { rateLimit } = require('express-rate-limit');
const { validationResult, matchedData } = require('express-validator');

const { issueToken, verifyToken } = require('../middleware/csrf');
const appointments = require('../services/appointments');
const notify = require('../services/notify');
const { display } = require('../services/content');

const router = express.Router({ caseSensitive: true, strict: true });

const meta = {
  title: `Book an appointment in ${display.city}`,
  description: 'Ask for an appointment with an orthopaedic surgeon. Leave your name and phone number and our front desk will call you back to agree a time.',
  path: '/appointment',
};

const renderForm = (res, status, form) =>
  res.status(status).render('pages/appointment', { meta, form: { ...appointments.EMPTY_FORM, ...form } });

// Five requests in fifteen minutes from one address is plenty for a patient
// and too few for a spam run.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => renderForm(res, 429, {
    message: `You've sent several requests in a short time. Please wait fifteen minutes, or call us on ${display.phone}.`,
  }),
});

router.get('/appointment', issueToken, (req, res) => renderForm(res, 200, {}));

router.post('/appointment', issueToken, limiter, verifyToken, appointments.rules, async (req, res) => {
  // The "website" field is hidden from people. Only a bot fills it in, and
  // the bot is shown the same thank-you page so it learns nothing.
  if (req.body.website) return res.redirect(303, '/appointment/received');

  // What the patient typed, to show again if the form needs correcting.
  const values = Object.fromEntries(
    Object.keys(appointments.LIMITS).map((field) => [field, String(req.body[field] || '').slice(0, 2000)]),
  );

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = Object.fromEntries(Object.entries(result.mapped()).map(([field, error]) => [field, error.msg]));
    return renderForm(res, 422, { values, errors, message: 'Please check the fields marked below and send the form again.' });
  }

  const request = matchedData(req);
  try {
    await appointments.createAppointment(request);
  } catch {
    return renderForm(res, 503, {
      values,
      message: `We couldn't save your request just now. Please try again in a few minutes, or call us on ${display.phone}.`,
    });
  }

  // The request is saved, so an email problem must not show the patient an error.
  notify.notifyFrontDesk(request).catch(() => {});

  res.redirect(303, '/appointment/received');
});

router.get('/appointment/received', (req, res) => {
  res.render('pages/appointment-received', {
    meta: { title: 'Request received', description: 'We have your appointment request.', path: '/appointment/received', noindex: true },
  });
});

module.exports = router;
