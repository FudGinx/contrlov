'use strict';
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { spawnSync } = require('node:child_process');

const root = __dirname;
const payload = fs.readFileSync(path.join(root, 'bundle.b64'), 'utf8').trim();
const archive = zlib.brotliDecompressSync(Buffer.from(payload, 'base64'));
const extract = spawnSync('tar', ['-xf', '-', '-C', root], {
  input: archive, maxBuffer: 2 * 1024 * 1024
});
if (extract.status !== 0 || extract.error) {
  throw new Error('Cannot unpack game bundle: ' + (extract.stderr || extract.error));
}
if (process.argv.includes('--extract-only')) {
  console.log('Nightcode Party bundle extracted successfully');
} else {
  require('./server.js');
}
