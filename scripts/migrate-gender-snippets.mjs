/**
 * Collapse `{ male, female }` copy nests into `{g:male|female}` snippets
 * when token-aligned. Dry-run by default; pass --write to update files.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'messages/sr');
const write = process.argv.includes('--write');
const skipFiles = new Set(['gender.json', 'align-behaviour.json']);

function isGenderNest(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === 2 &&
    'male' in value &&
    'female' in value
  );
}

function mergeStrings(male, female, trace) {
  if (male === female) return male;
  const mParts = male.split(/(\s+)/);
  const fParts = female.split(/(\s+)/);
  if (mParts.length !== fParts.length) {
    throw new Error(
      `${trace}: token count mismatch (${mParts.length} vs ${fParts.length})\nM: ${male}\nF: ${female}`,
    );
  }
  return mParts
    .map((m, i) => {
      const f = fParts[i];
      if (m === f) return m;
      if (/^\s+$/.test(m)) {
        if (m !== f) {
          throw new Error(`${trace}: whitespace mismatch`);
        }
        return m;
      }
      if (m.includes('{g:') || f.includes('{g:')) {
        throw new Error(`${trace}: already contains snippet`);
      }
      if (
        m.includes('|') ||
        f.includes('|') ||
        m.includes('{') ||
        f.includes('{')
      ) {
        throw new Error(`${trace}: unsafe token for snippet: ${m} / ${f}`);
      }
      let shared = 0;
      while (
        shared < m.length &&
        shared < f.length &&
        m[m.length - 1 - shared] === f[f.length - 1 - shared] &&
        /[.,!?;:]/.test(m[m.length - 1 - shared])
      ) {
        shared += 1;
      }
      if (shared === 0) return `{g:${m}|${f}}`;
      return `{g:${m.slice(0, -shared)}|${f.slice(0, -shared)}}${m.slice(-shared)}`;
    })
    .join('');
}

function mergeValues(male, female, trace) {
  if (typeof male === 'string' && typeof female === 'string') {
    return mergeStrings(male, female, trace);
  }
  if (
    (typeof male === 'boolean' || typeof male === 'number' || male === null) &&
    male === female
  ) {
    return male;
  }
  if (Array.isArray(male) && Array.isArray(female)) {
    if (male.length !== female.length) {
      throw new Error(`${trace}: array length mismatch`);
    }
    return male.map((item, i) =>
      mergeValues(item, female[i], `${trace}[${i}]`),
    );
  }
  if (
    male !== null &&
    female !== null &&
    typeof male === 'object' &&
    typeof female === 'object' &&
    !Array.isArray(male) &&
    !Array.isArray(female)
  ) {
    const mKeys = Object.keys(male).sort();
    const fKeys = Object.keys(female).sort();
    if (mKeys.join('\0') !== fKeys.join('\0')) {
      throw new Error(`${trace}: object key mismatch (${mKeys} vs ${fKeys})`);
    }
    const out = {};
    for (const key of Object.keys(male)) {
      out[key] = mergeValues(male[key], female[key], `${trace}.${key}`);
    }
    return out;
  }
  throw new Error(
    `${trace}: unsupported value kinds (${typeof male} vs ${typeof female})`,
  );
}

function transform(value, trace) {
  if (isGenderNest(value)) {
    return mergeValues(value.male, value.female, trace);
  }
  if (Array.isArray(value)) {
    return value.map((item, i) => transform(item, `${trace}[${i}]`));
  }
  if (value !== null && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = transform(child, `${trace}.${key}`);
    }
    return out;
  }
  return value;
}

const files = fs
  .readdirSync(root)
  .filter((name) => name.endsWith('.json') && !skipFiles.has(name))
  .sort();

let changed = 0;
for (const file of files) {
  const filePath = path.join(root, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const before = JSON.stringify(data);
  let next;
  try {
    next = transform(data, file);
  } catch (err) {
    console.error(`FAIL ${file}: ${err.message}`);
    process.exitCode = 1;
    continue;
  }
  const after = JSON.stringify(next);
  if (before === after) continue;
  changed += 1;
  console.log(`${write ? 'WRITE' : 'DRY'} ${file}`);
  if (write) {
    fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  }
}

console.log(`Done. ${changed} file(s) ${write ? 'updated' : 'would change'}.`);
