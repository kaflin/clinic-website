# Orthopedics clinic website: files

Everything for the clinic website lives in this `clinic-website/` folder. New files go here too. Paths below start from this folder.

## Run it on your machine

You need Node.js 22 or newer and MySQL or MariaDB.

1. `npm install`
2. `sudo mysql < db/schema.sql`, then create the app's database user with the two commands at the end of that file.
3. Copy `.env.example` to `.env` and fill in the database password.
4. `npm run dev`, then open http://localhost:3000

The pages open without a database. Only sending the appointment form needs one.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site and restarts it when a file changes. |
| `npm start` | Starts the site. With `NODE_ENV=production` it refuses to start if a secret is weak or a clinic fact is missing. |
| `npm run check:content` | Lists the clinic facts that are still missing. |
| `npm run purge:appointments` | Deletes appointment requests older than the retention period. Run it daily from cron. |

## Files

| File or folder | What it is |
|---|---|
| `src/data/` | The clinic's facts and all page content: `clinic.js`, `doctors.js`, `services.js`, `faqs.js`. Fill in the clinic's details here. |
| `server.js` | Starts the site. |
| `src/app.js` | The Express app: security headers, redirects, static files, error pages. |
| `src/routes/` | One file each for the pages, the appointment form, and `robots.txt` and `sitemap.xml`. |
| `src/services/` | The logic, kept out of the routes: appointments, front desk email, content helpers, structured data. |
| `src/middleware/csrf.js` | CSRF protection for the form. |
| `src/assets.js` | Minifies the CSS and JavaScript when the site starts. There is no build step. |
| `views/` | EJS templates. `partials/` holds the shared head, header, footer, form and icons. `pages/` holds one file per page. |
| `public/` | `css/site.css` (layout only, built on the theme variables), `js/site.js` (mobile menu) and `images/`. |
| `db/schema.sql` | Creates the database and the appointments table. |
| `documentation/theme.css` | Medical teal theme in the classic "Established practice" style: colours, fonts, spacing and base components as CSS variables. It is loaded first on every page. |
| `documentation/tech-stack.md` | The tech stack, why each part was chosen, and how the patient portal fits in later. |
| `documentation/seo-checklist.md` | Full SEO checklist: local SEO, content, on-page tags, structured data, technical setup, speed, trust and after-launch tasks. |
| `documentation/content-checklist.md` | Rules for every piece of text on the site: human-sounding writing, words to remove, formatting, and the no-emoji rule. |
| `documentation/security-checklist.md` | Security checks that must all pass before deployment. |

## Designs

| Design | Link |
|---|---|
| Home page, three directions. Option 3, "Classic: Established practice", is the chosen one and is shown in the Medical teal colours. | https://claude.ai/artifact/9ore8LJPoPmSaezsY4ZaiY |

## Tech stack

Node.js, Express.js, EJS templates, `theme.css` and MySQL. Full details are in `documentation/tech-stack.md`.

## Decisions so far

- Appearance: option 3, "Classic: Established practice". Top bar with OPD hours and phone, centred clinic name and menu, surgeon portrait hero, credentials strip, treatments as a ruled two-column list, testimonial band, appointment request form.
- Colour palette: Medical teal (white background, `#EFF8F7` tint, `#0E7C7B` accent, `#12262B` text and dark bands).
- Fonts: Playfair Display for headings, Source Sans 3 for body text.
- Shape: near-square corners (2px), thin divider lines, no heavy shadows.
- Stack: Node.js + Express backend, EJS server-rendered frontend, styled with `theme.css`.
- Database: MySQL.
- SEO: the site follows `documentation/seo-checklist.md`.
- Content: all text must read as human-written and pass `documentation/content-checklist.md`.
- Emoji: none on the website. SVG icons where a symbol is needed.
- Security: every item in `documentation/security-checklist.md` is checked before deployment.

## Still needed

Run `npm run check:content` for the full list. Until a fact is filled in, the site shows it as a marker in square brackets, like `[CLINIC NAME]`.

- Clinic name, city, address, phone, email and opening hours.
- Map link, map coordinates and the Google reviews link.
- Doctor names, qualifications, registration numbers and photos (WebP, in `public/images/`).
- Year established, hospital affiliations and other credentials for the home page strip.
- One real patient testimonial, used with the patient's permission.
- Clinic history and facilities for the About page.
- A doctor's review of every treatment page and the patient questions, with their name and the date.
- The clinic's sign-off on the privacy policy, terms and medical disclaimer, and how many months appointment requests are kept.

## Not built yet

- A staff login to read appointment requests. For now the front desk gets an email with the name and phone number, and the full request is in the database.
- SMS notifications, the blog, Nepali pages, analytics and the patient portal.
