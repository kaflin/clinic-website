# Orthopedics clinic website: security checklist

Every item here must be ticked before the site is deployed. Go through the list again before each major release. The stack is Node.js, Express, EJS and MySQL, so the items name the tools that fit it.

## 1. Secrets and configuration

- [ ] Database password, session secret, email and SMS credentials live in environment variables, not in the code
- [ ] `.env` is in `.gitignore` and has never been committed
- [ ] Git history checked for leaked passwords or API keys
- [ ] Production uses different secrets from development
- [ ] `NODE_ENV=production` is set on the server
- [ ] Debug routes, test accounts and sample data are removed

## 2. HTTPS and headers

- [ ] A valid SSL certificate is installed and renews automatically
- [ ] All HTTP traffic redirects to HTTPS
- [ ] `helmet` middleware is on, which sets the standard security headers
- [ ] HSTS is on
- [ ] A Content Security Policy is set and tested against the live pages
- [ ] The `X-Powered-By` header is off

## 3. Forms and user input

- [ ] Every field is validated on the server, not only in the browser (`express-validator` or similar)
- [ ] Length limits on every text field
- [ ] Request body size is limited (`express.json({ limit })`)
- [ ] CSRF protection on every form that changes data
- [ ] Rate limiting on the appointment and contact forms (`express-rate-limit`)
- [ ] A honeypot field or CAPTCHA stops spam bots
- [ ] Phone and email formats are checked before sending SMS or email

## 4. SQL injection

- [ ] Every MySQL query uses parameterized queries or prepared statements (`mysql2` placeholders)
- [ ] No query is built by joining user input into a string
- [ ] Search and filter inputs are tested with SQL injection strings

## 5. Cross-site scripting (XSS)

- [ ] EJS output uses `<%= %>`, which escapes HTML
- [ ] `<%- %>` is used only for trusted partials, never for user input
- [ ] User input is never placed inside a `<script>` block or an inline event handler
- [ ] Form fields are tested with script tags to confirm they show as plain text

## 6. Database

- [ ] The app connects with its own MySQL user, not `root`
- [ ] That user has only the permissions it needs on one database
- [ ] MySQL is not open to the internet. It accepts connections from the app server only.
- [ ] A strong, unique database password
- [ ] Automatic daily backups are running
- [ ] A backup has been restored once as a test
- [ ] Backups are stored away from the web server

## 7. Patient data

- [ ] The site collects only what is needed to book an appointment
- [ ] Patient details never appear in URLs
- [ ] Patient details are not written to log files
- [ ] Confirmation emails and SMS carry no medical details
- [ ] The privacy policy says what is collected, why, and how long it is kept
- [ ] Old appointment records are deleted or archived on a set schedule
- [ ] Only named staff can see appointment data

## 8. Admin area and login

- [ ] The admin area is behind a login
- [ ] Passwords are hashed with bcrypt or argon2, never stored as plain text
- [ ] A minimum password length is enforced
- [ ] Login attempts are rate limited, and the account locks after repeated failures
- [ ] Session cookies are set with `httpOnly`, `secure` and `sameSite`
- [ ] Sessions expire after a period of inactivity
- [ ] Logout destroys the session on the server
- [ ] Every admin route checks that the user is logged in and allowed to be there
- [ ] No default or shared admin accounts

## 9. File uploads (if the site accepts any)

- [ ] File type and size are checked on the server
- [ ] Uploaded files are renamed and stored outside the public folder
- [ ] Uploaded files can never run as code

## 10. Dependencies

- [ ] `npm audit` shows no high or critical issues
- [ ] Packages are up to date
- [ ] Unused packages are removed
- [ ] `package-lock.json` is committed
- [ ] Node.js is on a supported LTS version

## 11. Errors and logging

- [ ] Patients see a plain error page. No stack traces or SQL errors reach the browser.
- [ ] Custom 404 and 500 pages are in place
- [ ] Errors are logged on the server with the time and route
- [ ] Logs hold no passwords, tokens or patient details
- [ ] Failed logins are logged

## 12. Server and hosting

- [ ] The firewall allows only ports 80 and 443, plus SSH
- [ ] SSH uses keys, not passwords, and root login is off
- [ ] The Node process runs as a non-root user
- [ ] A process manager (PM2 or systemd) restarts the app if it crashes
- [ ] The operating system has current security updates
- [ ] `robots.txt` does not list private paths that would point attackers to them
- [ ] Directory listing is off
- [ ] CORS is closed, or limited to the site's own domain

## 13. Final tests before go-live

- [ ] Run an OWASP ZAP scan against the staging site and fix what it finds
- [ ] Check the headers at securityheaders.com
- [ ] Check the certificate with SSL Labs
- [ ] Submit the forms with empty, oversized and malicious input
- [ ] Try opening admin URLs while logged out
- [ ] Confirm backups and monitoring alerts are working
- [ ] A second person has reviewed this list

## Patient portal (later)

When the portal is built, add these before it opens:

- [ ] Each patient can see only their own records, tested by changing IDs in the URL
- [ ] Email or phone verification on sign-up
- [ ] A safe password reset flow with tokens that expire
- [ ] Two-step login for staff accounts
- [ ] An audit log of who viewed or changed a patient record
- [ ] Sensitive fields encrypted in the database
- [ ] Portal pages marked `noindex`
