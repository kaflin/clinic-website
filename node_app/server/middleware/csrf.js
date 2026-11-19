'use strict';

// CSRF protection for forms, using a signed cookie and a matching hidden
// field. Another site cannot read or set the signed cookie, so it cannot
// send a matching pair.

const crypto = require('node:crypto');
const { config } = require('../config');

// The __Host- prefix makes browsers refuse the cookie unless it is secure
// and tied to this exact host. It only works over HTTPS.
const COOKIE = config.isProduction ? '__Host-csrf' : 'csrf';

const cookieOptions = {
  signed: true,
  httpOnly: true,
  sameSite: 'strict',
  secure: config.isProduction,
  path: '/',
  maxAge: 2 * 60 * 60 * 1000,
};

// Makes sure the visitor has a token and hands it to the templates.
function issueToken(req, res, next) {
  let token = req.signedCookies[COOKIE];
  if (typeof token !== 'string' || token.length !== 64) {
    token = crypto.randomBytes(32).toString('hex');
    res.cookie(COOKIE, token, cookieOptions);
  }
  res.locals.csrfToken = token;
  next();
}

function verifyToken(req, res, next) {
  const cookieToken = req.signedCookies[COOKIE];
  const formToken = req.body && req.body._csrf;
  const valid =
    typeof cookieToken === 'string' &&
    typeof formToken === 'string' &&
    cookieToken.length === formToken.length &&
    crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(formToken));

  if (valid) return next();
  const error = new Error('Form token missing or wrong');
  error.status = 403;
  next(error);
}

module.exports = { issueToken, verifyToken };
