import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const messagesDir = path.join(rootDir, 'messages');
const sourceLocale = 'sr';

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function listLocaleDirs() {
  if (!fs.existsSync(messagesDir)) {
    throw new Error(`Messages directory not found: ${messagesDir}`);
  }

  return fs
    .readdirSync(messagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listJsonFiles(locale) {
  const localeDir = path.join(messagesDir, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
    .sort();
}

function readJson(locale, fileName) {
  const filePath = path.join(messagesDir, locale, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function compareShape(source, target, trace, errors) {
  const sourceType = Array.isArray(source)
    ? 'array'
    : isPlainObject(source)
      ? 'object'
      : typeof source;
  const targetType = Array.isArray(target)
    ? 'array'
    : isPlainObject(target)
      ? 'object'
      : typeof target;

  if (sourceType !== targetType) {
    errors.push(`${trace}: type mismatch (${sourceType} vs ${targetType})`);
    return;
  }

  if (sourceType === 'object') {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);

    for (const key of sourceKeys) {
      if (!(key in target)) {
        errors.push(`${trace}.${key}: missing key`);
      } else {
        compareShape(source[key], target[key], `${trace}.${key}`, errors);
      }
    }

    for (const key of targetKeys) {
      if (!(key in source)) {
        errors.push(`${trace}.${key}: extra key`);
      }
    }
    return;
  }

  if (sourceType === 'array') {
    if (source.length === 0 || target.length === 0) {
      return;
    }

    const maxLength = Math.max(source.length, target.length);
    for (let i = 0; i < maxLength; i += 1) {
      const s = source[i];
      const t = target[i];
      if (typeof s === 'undefined') {
        errors.push(`${trace}[${i}]: extra item`);
      } else if (typeof t === 'undefined') {
        errors.push(`${trace}[${i}]: missing item`);
      } else {
        compareShape(s, t, `${trace}[${i}]`, errors);
      }
    }
  }
}

function run() {
  const locales = listLocaleDirs();

  if (!locales.includes(sourceLocale)) {
    throw new Error(
      `Source locale "${sourceLocale}" does not exist in messages/. Found: ${locales.join(', ')}`,
    );
  }

  const sourceFiles = listJsonFiles(sourceLocale);
  const allErrors = [];

  for (const locale of locales) {
    if (locale === sourceLocale) continue;

    const localeFiles = listJsonFiles(locale);

    for (const sourceFile of sourceFiles) {
      if (!localeFiles.includes(sourceFile)) {
        allErrors.push(`${locale}/${sourceFile}: missing file`);
      }
    }

    for (const localeFile of localeFiles) {
      if (!sourceFiles.includes(localeFile)) {
        allErrors.push(`${locale}/${localeFile}: extra file`);
      }
    }

    for (const fileName of sourceFiles) {
      if (!localeFiles.includes(fileName)) continue;

      const sourceJson = readJson(sourceLocale, fileName);
      const localeJson = readJson(locale, fileName);
      compareShape(
        sourceJson,
        localeJson,
        `${locale}/${fileName.replace('.json', '')}`,
        allErrors,
      );
    }
  }

  if (allErrors.length > 0) {
    console.error('\nI18n consistency check failed:\n');
    for (const error of allErrors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `I18n consistency check passed for locales: ${locales.join(', ')}`,
  );
}

run();
