import { cpSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = resolve(projectRoot, 'dist');
const staticPages = [
  'about.html',
  'budget-tracker.html',
  'contact.html',
  'graphic-design.html',
  'mobile-development.html',
  'services.html',
  'skills.html',
  'web-development.html',
];
const staticScripts = [
  'budget-tracker.js',
  'script.js',
  'service.js',
  'theme.js',
  'style.css',
];

cpSync(resolve(projectRoot, 'assets'), resolve(outputDirectory, 'assets'), {
  recursive: true,
});

for (const file of [...staticPages, ...staticScripts]) {
  copyFileSync(resolve(projectRoot, file), resolve(outputDirectory, file));
}
