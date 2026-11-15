# Orthopedics clinic website: SEO checklist

Everything the site needs to rank well on Google. Tick each item off as it is done. Local SEO comes first because that is where a clinic gets most of its patients.

## 1. Local SEO

- [ ] Create and verify a Google Business Profile for the clinic
- [ ] Fill in the profile fully: name, address, phone, hours, category ("Orthopedic clinic"), services, photos
- [ ] Put the clinic name, address and phone (NAP) in the footer of every page
- [ ] Write the NAP exactly the same way everywhere: website, Google profile, Facebook, directories
- [ ] Embed a Google Map on the contact page
- [ ] Use the city and area name in titles and headings, like "Orthopedic Clinic in [City]"
- [ ] List the clinic on local directories and health listing sites
- [ ] Make the phone number a tap-to-call link (`tel:`)
- [ ] Add a "Get directions" link that opens Google Maps

## 2. Pages and content

- [ ] One page per service: knee replacement, fracture care, sports injury, spine, arthritis, physiotherapy
- [ ] One page per doctor: qualifications, experience, specialities, registration number, photo
- [ ] About page with the clinic's history and facilities
- [ ] Contact page with address, phone, hours, map and appointment form
- [ ] FAQ section answering real patient questions
- [ ] Each service page covers: what the condition is, symptoms, treatment, recovery, when to see a doctor
- [ ] Write for patients in plain language, not medical jargon
- [ ] At least 300 words of original text on every main page
- [ ] No copied text from other clinic sites
- [ ] A blog (later) for posts like "when to see a doctor for knee pain"
- [ ] Nepali versions of key pages (later), if patients search in Nepali

## 3. Keywords

- [ ] List the terms patients search for: "orthopedic doctor in [City]", "knee pain treatment [City]", "bone specialist near me"
- [ ] Give each page one main keyword and use it in the title, the `<h1>`, the first paragraph and the URL
- [ ] Use related terms naturally in the text. Do not stuff keywords.
- [ ] Check Google Search Console after launch to see which searches bring visitors

## 4. On every page

- [ ] A unique `<title>`, about 60 characters, with the main keyword and city
- [ ] A unique meta description, about 155 characters, that gives a reason to click
- [ ] Exactly one `<h1>`
- [ ] `<h2>` and `<h3>` used in order, not skipped
- [ ] A clean, readable URL: `/services/knee-replacement`, not `/page?id=12`
- [ ] Lowercase URLs with hyphens between words
- [ ] A canonical tag pointing to the page's own URL
- [ ] `<html lang="en">` set (or `ne` on Nepali pages)
- [ ] The viewport meta tag for mobile
- [ ] Open Graph tags (title, description, image) so links look right on Facebook and WhatsApp
- [ ] A favicon

## 5. Images

- [ ] Descriptive alt text on every image
- [ ] Descriptive file names: `dr-name-orthopedic-surgeon.webp`, not `IMG_0234.jpg`
- [ ] WebP format, compressed
- [ ] Width and height set on every `<img>` so the page does not jump while loading
- [ ] `loading="lazy"` on images below the first screen
- [ ] Real photos of the clinic and doctors where possible, not stock photos

## 6. Internal links

- [ ] A clear main menu that reaches every important page in one or two clicks
- [ ] Service pages link to the doctors who treat that condition
- [ ] Doctor pages link to their services
- [ ] Every page has a "Book appointment" link
- [ ] Link text describes the destination ("knee replacement surgery"), not "click here"
- [ ] Breadcrumbs on service and doctor pages
- [ ] No broken links

## 7. Structured data (JSON-LD)

- [ ] `MedicalClinic` on the home and contact pages: name, address, phone, hours, map coordinates
- [ ] `Physician` on each doctor page
- [ ] `FAQPage` on the FAQ section
- [ ] `BreadcrumbList` on inner pages
- [ ] `Article` on blog posts (later)
- [ ] Test every type with Google's Rich Results Test

## 8. Technical

- [ ] HTTPS on every page, with HTTP redirecting to HTTPS
- [ ] One version of the domain (www or non-www), the other redirecting to it
- [ ] `sitemap.xml` listing every public page
- [ ] `robots.txt` that allows public pages and blocks admin and portal routes
- [ ] Site added to Google Search Console and the sitemap submitted
- [ ] Site added to Bing Webmaster Tools
- [ ] A custom 404 page with links back to the main pages
- [ ] 301 redirects for any URL that changes
- [ ] No duplicate pages reachable at two URLs
- [ ] Patient portal pages marked `noindex` (when the portal is built)

## 9. Speed and mobile

- [ ] Mobile-first layout, tested on real phones
- [ ] Buttons and links large enough to tap
- [ ] Text readable without zooming
- [ ] gzip or Brotli compression turned on in Express (`compression` middleware)
- [ ] Cache headers on static files (CSS, JS, images)
- [ ] Minified CSS and JavaScript
- [ ] Fonts loaded with `font-display: swap`, and only the weights in use
- [ ] As little JavaScript in the browser as possible
- [ ] Core Web Vitals passing in PageSpeed Insights
- [ ] Hosting with a server close to Nepal, or a CDN in front

## 10. Trust (important for medical sites)

Google holds health sites to a higher standard, so the site has to show who is behind it.

- [ ] Doctor credentials, degrees and registration numbers shown clearly
- [ ] Medical content reviewed by a doctor, with the reviewer's name and the date on the page
- [ ] Full contact details and a physical address
- [ ] Privacy policy page
- [ ] Terms and a medical disclaimer page
- [ ] Real patient reviews on Google, linked from the site
- [ ] Ask happy patients to leave a Google review
- [ ] Reply to every Google review

## 11. Off-site

- [ ] Facebook page with the same NAP, linking to the site
- [ ] Links from local sources: hospital partners, local news, health directories
- [ ] No paid or spam backlinks

## 12. After launch

- [ ] Google Analytics (or a similar tool) installed
- [ ] Check Search Console monthly for errors, indexing problems and search terms
- [ ] Keep hours, doctors and services up to date on the site and the Google profile
- [ ] Add new content regularly: a blog post, an FAQ, a new service page
- [ ] Re-test page speed after any big change

## How this fits the stack

- EJS renders pages on the server, so Google sees the full content straight away.
- Keep one shared `<head>` partial. Each route passes in its own title, description, canonical URL and Open Graph image.
- Put the JSON-LD in partials too: one for the clinic, one for doctors, one for FAQs.
- Generate `sitemap.xml` from an Express route so it stays in step with the pages and, later, the doctors and services in MySQL.
