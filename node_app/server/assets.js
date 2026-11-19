'use strict';

// Minifies the CSS and JavaScript once at start-up and serves them from
// memory under a name that contains a hash of the content. Browsers can
// then cache them for a year, and a changed file gets a new address.
// This replaces a build step.

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

const root = path.join(__dirname, '..', '..');

// theme.css always comes first, as the theme requires. Then the shared base
// styles, then one file per partial, then one file per page, so a page can
// override a partial.
const listCss = (dir) => fs.readdirSync(path.join(root, dir))
  .filter((name) => name.endsWith('.css'))
  .sort()
  .map((name) => `${dir}/${name}`);
const CSS_FILES = [
  'documentation/theme.css',
  'css/base.css',
  ...listCss('css/partials'),
  ...listCss('css/pages'),
];
const JS_FILES = ['js/site.js'];

const read = (files) => files.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const hash = (text) => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);

async function buildAssets() {
  const css = new CleanCSS({ level: 1 }).minify(read(CSS_FILES));
  if (css.errors.length) throw new Error(`CSS could not be minified: ${css.errors.join('; ')}`);

  const js = await minify(read(JS_FILES));

  return {
    css: { body: css.styles, path: `/assets/site.${hash(css.styles)}.css`, type: 'text/css; charset=utf-8' },
    js: { body: js.code, path: `/assets/site.${hash(js.code)}.js`, type: 'text/javascript; charset=utf-8' },
  };
}

module.exports = { buildAssets };
