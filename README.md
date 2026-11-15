# Orthopedics clinic website: files

Everything for the clinic website lives in this `clinic-website/` folder. New files go here too.

## Files

| File | What it is |
|---|---|
| `clinic-website/theme.css` | Medical teal theme in the classic "Established practice" style: colours, fonts, spacing and base components as CSS variables. Load it first on every page. |
| `clinic-website/documentation/tech-stack.md` | The tech stack, why each part was chosen, and how the patient portal fits in later. |
| `clinic-website/documentation/seo-checklist.md` | Full SEO checklist: local SEO, content, on-page tags, structured data, technical setup, speed, trust and after-launch tasks. |
| `clinic-website/documentation/content-checklist.md` | Rules for every piece of text on the site: human-sounding writing, words to remove, formatting, and the no-emoji rule. |
| `clinic-website/documentation/security-checklist.md` | Security checks that must all pass before deployment. |

## Designs

| Design | Link |
|---|---|
| Home page, three directions. Option 3, "Classic: Established practice", is the chosen one and is shown in the Medical teal colours. | https://claude.ai/artifact/9ore8LJPoPmSaezsY4ZaiY |

## Tech stack

Node.js, Express.js, EJS templates, `theme.css` and MySQL. Full details are in `clinic-website/documentation/tech-stack.md`.

## Decisions so far

- Appearance: option 3, "Classic: Established practice". Top bar with OPD hours and phone, centred clinic name and menu, surgeon portrait hero, credentials strip, treatments as a ruled two-column list, testimonial band, appointment request form.
- Colour palette: Medical teal (white background, `#EFF8F7` tint, `#0E7C7B` accent, `#12262B` text and dark bands).
- Fonts: Playfair Display for headings, Source Sans 3 for body text.
- Shape: near-square corners (2px), thin divider lines, no heavy shadows.
- Stack: Node.js + Express backend, EJS server-rendered frontend, styled with `theme.css`.
- Database: MySQL.
- SEO: the site follows `clinic-website/documentation/seo-checklist.md`.
- Content: all text must read as human-written and pass `clinic-website/documentation/content-checklist.md`.
- Emoji: none on the website. SVG icons where a symbol is needed.
- Security: every item in `clinic-website/documentation/security-checklist.md` is checked before deployment.

## Still needed

- Clinic name, city, address, phone and opening hours.
- Doctor names, qualifications and photos.
- Year established, hospital affiliations and other credentials for the home page strip.
