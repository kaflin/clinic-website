# Orthopedics clinic website: tech stack

This is the stack the clinic website is built on, and the reason behind each choice.

## The stack

| Layer | What we use |
|---|---|
| Runtime | Node.js |
| Backend | Express.js |
| Frontend | HTML, CSS and a little JavaScript, rendered on the server with EJS templates |
| Styling | `theme.css` (Medical teal theme, CSS variables) |
| Database | MySQL |

## Why each one

### Node.js + Express.js

Node.js runs the server and Express is the framework on top of it. The backend for this site is small: an appointment form, a doctors and services list, and email or SMS notifications. Express handles routing, form parsing and validation through middleware, so none of that has to be written by hand. It is also cheap to host and easy for another developer to pick up later.

### EJS templates

Pages are rendered on the server and sent to the browser as plain HTML. That gives two things a clinic site needs:

- **Search visibility.** Patients find clinics through Google. Server-rendered pages are indexed cleanly.
- **Fast loading.** Pages open quickly even on slow mobile connections.

The header, footer and doctor cards are written once as EJS partials and reused on every page. There is no build step.

JavaScript in the browser is kept small: the mobile menu and the appointment form.

### theme.css

The theme is already built on CSS variables (colours, fonts, spacing, base components). It loads first on every page. No Tailwind or component library is needed.

### MySQL

Appointments go into a real database from the start. When patient accounts are added later, they sit on top of the same database and nothing has to be migrated.

## Patient portal (later)

The same stack can run a patient portal: login with sessions, a dashboard and appointment history, all server-rendered.

If the portal ever needs heavy interaction, such as live appointment slots or chat, add a React app at `/portal` that talks to the same Express backend through JSON routes. The public site stays as it is.

## Rules to follow while building

- Keep the logic in separate functions, not inside route handlers. The same code can then serve an EJS page now and a JSON API later.
- Treat patient data as sensitive from day one: hashed passwords, HTTPS everywhere, and access checks on every route.
- Load `theme.css` first on every page and use its variables. Do not hard-code colours or fonts.
