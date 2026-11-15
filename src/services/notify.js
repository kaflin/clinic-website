'use strict';

// Tells the front desk that a request has arrived. The email carries the
// name and phone number so staff can call back. It never carries what the
// patient wants to be seen for.

const nodemailer = require('nodemailer');
const { config } = require('../config');
const { display } = require('./content');

let transport;

function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.port === 465,
      auth: config.mail.user ? { user: config.mail.user, pass: config.mail.password } : undefined,
    });
  }
  return transport;
}

const isEnabled = () => Boolean(config.mail.host && config.mail.from && config.mail.frontDesk);

async function notifyFrontDesk({ name, phone }) {
  if (!isEnabled()) return false;
  await getTransport().sendMail({
    from: config.mail.from,
    to: config.mail.frontDesk,
    subject: `New appointment request, ${display.clinicName}`,
    text: [
      'A new appointment request came in through the website.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      '',
      'Please call the patient back to agree a time.',
    ].join('\n'),
  });
  return true;
}

module.exports = { isEnabled, notifyFrontDesk };
