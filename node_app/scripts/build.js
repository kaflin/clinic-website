'use strict';

// Builds a smaller copy of the project in dist/ that can be uploaded to the
// server. Same folder layout as the source, so nothing else has to change.
//   npm run build
// On the server, in the uploaded folder:
//   npm ci --omit=dev
//   create node_app/.env, then npm start

const fs = require('node:fs');
const path = require('node:path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

const root = path.join(__dirname, '..', '..');
const dist = path.join(root, 'dist');

const SKIP = new Set(['node_modules', 'dist', '.git', '.claude', '.vscode', '.idea']);
const isSecret = (name) => name === '.env' || name.startsWith('.env.') || name.endsWith('.env');

// Folders and files that make up the site. Anything else (docs, .env, the
// build script itself) stays out of dist/.
const INCLUDE = ['node_app', 'css', 'js', 'images', 'views', 'documentation/theme.css', 'package.json', 'package-lock.json'];
const EXCLUDE = new Set(['node_app/scripts/build.js']);

function* walk(relative) {
  const full = path.join(root, relative);
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    yield relative;
    return;
  }
  for (const name of fs.readdirSync(full)) {
    if (SKIP.has(name) || isSecret(name)) continue;
    yield* walk(path.join(relative, name));
  }
}

const sizes = { before: 0, after: 0 };

async function build() {
  fs.rmSync(dist, { recursive: true, force: true });

  for (const entry of INCLUDE) {
    for (const file of walk(entry)) {
      if (EXCLUDE.has(file.split(path.sep).join('/'))) continue;
      const from = path.join(root, file);
      const to = path.join(dist, file);
      fs.mkdirSync(path.dirname(to), { recursive: true });

      const source = fs.readFileSync(from);
      let output = source;

      if (file.endsWith('.js')) {
        const result = await minify(source.toString('utf8'), { compress: true, mangle: true });
        output = result.code;
      } else if (file.endsWith('.css')) {
        const result = new CleanCSS({ level: 2 }).minify(source.toString('utf8'));
        if (result.errors.length) throw new Error(`${file}: ${result.errors.join('; ')}`);
        output = result.styles;
      } else if (file.endsWith('.json')) {
        output = JSON.stringify(JSON.parse(source.toString('utf8')));
      }

      fs.writeFileSync(to, output);
      sizes.before += source.length;
      sizes.after += Buffer.byteLength(output);
    }
  }
}

build()
  .then(() => {
    const kb = (bytes) => (bytes / 1024).toFixed(1);
    process.stdout.write(`dist/ ready: ${kb(sizes.before)} kB -> ${kb(sizes.after)} kB (${kb(sizes.before - sizes.after)} kB saved)\n`);
  })
  .catch((error) => {
    process.stderr.write(`Build failed: ${error.message}\n`);
    process.exit(1);
  });
