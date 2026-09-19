#!/usr/bin/env node
/**
 * Local/CI checks for public build output. Prints labels and paths only — never secret values.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const headersFile = join(root, 'public', '_headers');

const SECRET_PATTERNS = [
  { id: 'aws_access_key_id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'github_pat', re: /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b/ },
  { id: 'github_fine_grained', re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { id: 'stripe_live_sk', re: /\bsk_live_[A-Za-z0-9]{20,}\b/ },
  { id: 'private_key_block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { id: 'cloudflare_api_token_assign', re: /\b(CF_API_TOKEN|CLOUDFLARE_API_TOKEN)\s*[:=]\s*['"]?[^'"\s]+/ },
];

const REQUIRED_HEADER_NAMES = [
  'Content-Security-Policy',
  'X-Frame-Options',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
  'Strict-Transport-Security',
];

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

function fail(msg) {
  console.error(`FAIL ${msg}`);
  process.exitCode = 1;
}

let issues = 0;
const origFail = fail;
fail = (msg) => {
  issues += 1;
  origFail(msg);
};

if (!existsSync(headersFile)) {
  fail('missing public/_headers');
} else {
  const headers = readFileSync(headersFile, 'utf8');
  for (const name of REQUIRED_HEADER_NAMES) {
    if (!headers.includes(name)) fail(`public/_headers missing ${name}`);
  }
  if (headers.includes('sk_live_') || headers.includes('BEGIN ') && headers.includes('PRIVATE KEY')) {
    fail('public/_headers looks like it contains a credential block (label only)');
  }
}

const wranglerPath = join(root, 'wrangler.jsonc');
if (existsSync(wranglerPath)) {
  const wrangler = readFileSync(wranglerPath, 'utf8');
  if (/"vars"\s*:/.test(wrangler)) fail('wrangler.jsonc defines vars; keep secrets out of committed vars');
}

if (!existsSync(dist)) {
  fail('dist/ missing — run npm run build first');
} else {
  const files = walk(dist);
  const maps = files.filter((f) => f.endsWith('.map'));
  if (maps.length) {
    fail(`source maps in dist (${maps.length} files)`);
  }

  const forbiddenNames = files.filter((f) => {
    const rel = relative(dist, f).replaceAll('\\', '/');
    return (
      rel === '.env' ||
      rel.endsWith('.pem') ||
      rel.endsWith('.key') ||
      rel.endsWith('.dev.vars') ||
      rel.includes('.git/')
    );
  });
  for (const f of forbiddenNames) {
    fail(`forbidden public artifact ${relative(dist, f)}`);
  }

  const textExt = new Set(['.js', '.css', '.html', '.json', '.txt', '.map', '.svg']);
  for (const f of files) {
    const ext = f.slice(f.lastIndexOf('.')).toLowerCase();
    if (!textExt.has(ext)) continue;
    let text;
    try {
      text = readFileSync(f, 'utf8');
    } catch {
      continue;
    }
    if (text.includes('sourceMappingURL')) {
      fail(`sourceMappingURL in ${relative(dist, f)}`);
    }
    for (const { id, re } of SECRET_PATTERNS) {
      if (re.test(text)) fail(`pattern ${id} in ${relative(dist, f)}`);
    }
  }
}

if (issues === 0) {
  console.log('PASS public artifact and header checks (labels only; no secret values printed)');
} else {
  console.error(`FAIL ${issues} check(s)`);
}
