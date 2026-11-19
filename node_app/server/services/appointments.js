'use strict';

// Appointment requests: the rules for the form and the database work.
// Kept apart from the routes so a JSON API or the patient portal can use
// the same functions later.

const { body } = require('express-validator');
const db = require('../db');

const LIMITS = { name: 80, phone: 20, concern: 500 };

// The form before anything has been typed or checked.
const EMPTY_FORM = { values: {}, errors: {}, message: null };

// A phone number is digits with optional spaces, hyphens, brackets and a
// leading plus. Between 7 and 15 digits once those are removed.
const isPhone = (value) => {
  if (!/^\+?[\d\s\-()]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

const rules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Please enter your full name.').bail()
    .isLength({ min: 2, max: LIMITS.name }).withMessage(`Your name should be between 2 and ${LIMITS.name} characters.`),
  body('phone')
    .trim()
    .notEmpty().withMessage('Please enter a phone number we can call you on.').bail()
    .isLength({ max: LIMITS.phone }).withMessage('That phone number is too long.').bail()
    .custom(isPhone).withMessage('Please check the phone number. Use digits only, with the country code if you\'re abroad.'),
  body('concern')
    .trim()
    .isLength({ max: LIMITS.concern }).withMessage(`Please keep this under ${LIMITS.concern} characters. You can tell us more on the phone.`),
];

async function createAppointment({ name, phone, concern }) {
  await db.execute(
    'INSERT INTO appointments (full_name, phone, concern) VALUES (?, ?, ?)',
    [name, phone, concern || null],
  );
}

// Deletes requests older than the clinic's retention period. Returns how many went.
async function purgeOlderThan(months) {
  if (!Number.isInteger(months) || months < 1) throw new Error('Retention period must be a whole number of months.');
  const result = await db.execute(
    'DELETE FROM appointments WHERE created_at < DATE_SUB(NOW(), INTERVAL ? MONTH)',
    [months],
  );
  return result.affectedRows;
}

module.exports = { LIMITS, EMPTY_FORM, rules, createAppointment, purgeOlderThan };
