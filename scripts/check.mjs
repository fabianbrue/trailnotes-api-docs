import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const json = async file => JSON.parse(await readFile(resolve(root, file), 'utf8'));
const exists = async file => { try { await access(file); return true; } catch { return false; } };
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.filter(entry => !['.git', '_site', 'node_modules'].includes(entry.name)).map(entry => entry.isDirectory() ? files(resolve(dir, entry.name)) : [resolve(dir, entry.name)]))).flat();
}
const spec = await json('api/openapi.json');
const siteConfig = await json('docs/site.json');
check(spec.openapi === '3.0.3', 'Expected OpenAPI 3.0.3.');
check(spec.info?.version === '0.1.0', 'Update version checks when changing the API version.');
const ids = new Set();
for (const [path, methods] of Object.entries(spec.paths ?? {})) {
  for (const [method, operation] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].includes(method)) continue;
    check(operation.operationId && !ids.has(operation.operationId), `Missing or repeated operationId: ${path}`);
    ids.add(operation.operationId);
    check(operation.responses?.['200'], `Missing success response: ${path}`);
    for (const name of [...path.matchAll(/\{([^}]+)\}/g)].map(match => match[1])) {
      check(operation.parameters?.some(parameter => parameter.in === 'path' && parameter.name === name && parameter.required), `Undocumented path parameter ${name}`);
    }
  }
}
function resolveRefs(value) {
  if (!value || typeof value !== 'object') return;
  if (value.$ref) {
    const reference = value.$ref;
    check(reference.startsWith('#/'), 'External OpenAPI references need a separate validation step.');
    const target = reference.slice(2).split('/').map(part => part.replaceAll('~1', '/').replaceAll('~0', '~')).reduce((current, key) => current?.[key], spec);
    check(Boolean(target), `Broken OpenAPI reference: ${reference}`);
  }
  Object.values(value).forEach(resolveRefs);
}
resolveRefs(spec);
const collection = await json('postman/trailnotes.postman_collection.json');
const environment = await json('postman/trailnotes.postman_environment.json');
check(collection.item.length === 8, 'Expected eight starter Postman requests; update this check if deliberately extending the collection.');
const variables = new Set(environment.values.map(value => value.key));
for (const match of JSON.stringify(collection).matchAll(/\{\{([^}]+)\}\}/g)) check(variables.has(match[1]), `Missing Postman variable: ${match[1]}`);
for (const item of collection.item) {
  check(item.request.method === 'GET', `Unexpected starter request method: ${item.name}`);
  for (const event of item.event ?? []) {
    try { new Script(event.script.exec.join('\n')); } catch (err) { failures.push(`Postman script syntax: ${item.name}: ${err.message}`); }
  }
}
const sourceFiles = await files(root);
for (const file of sourceFiles.filter(file => extname(file) === '.md')) {
  const markdown = await readFile(file, 'utf8');
  if (relative(root, file).startsWith('docs')) check(/^---\r?\ntitle: .+\r?\n---/.test(markdown), `Missing managed documentation title: ${relative(root, file)}`);
  for (const [, raw] of markdown.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(raw)) continue;
    const path = decodeURIComponent(raw.split('#')[0]);
    if (path) check(await exists(resolve(dirname(file), path)), `Broken Markdown link in ${relative(root, file)}: ${raw}`);
  }
}
if (process.argv.includes('--site')) {
  const site = resolve(root, '_site');
  const siteFiles = await files(site);
  const htmlFiles = siteFiles.filter(file => extname(file) === '.html');
  check(htmlFiles.length === 8, 'Expected eight generated HTML pages.');
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#)/.test(link)) continue;
      check(!link.startsWith('/'), `Root-relative link breaks repository Pages sites: ${link}`);
      const path = link.split('#')[0];
      if (path) check(await exists(resolve(dirname(file), path)), `Broken generated link: ${link}`);
    }
  }
}
if (process.argv.includes('--publish')) {
  check(['learning-scaffold', 'portfolio-ready'].includes(siteConfig.status), 'Publish: select an explicit learning-scaffold or portfolio-ready status.');
  if (siteConfig.status === 'learning-scaffold') {
    const readme = await readFile(resolve(root, 'README.md'), 'utf8');
    const caseStudy = await readFile(resolve(root, 'docs/case-study.md'), 'utf8');
    check(readme.includes('Status: learning scaffold'), 'Publish: clearly identify the unfinished learning project in the README.');
    check(caseStudy.includes('Codex supplied') && caseStudy.includes('review and final case study are still pending'), 'Publish: retain transparent scaffold attribution and pending learner review.');
  }
}
if (process.argv.includes('--release') || (process.argv.includes('--publish') && siteConfig.status === 'portfolio-ready')) {
  const config = siteConfig;
  const evidence = await json('learning/evidence.json');
  check(config.status === 'portfolio-ready', 'Release: docs/site.json still marks the project as a learning scaffold.');
  for (let n = 1; n <= 8; n++) check(evidence.completed_milestones.includes(`LAB-${String(n).padStart(2, '0')}`), `Release: LAB-${String(n).padStart(2, '0')} has not been recorded.`);
  check(evidence.authored_pages.length >= 3, 'Release: record at least three substantially authored pages.');
  check(evidence.openapi_validated_on && evidence.final_checked_on, 'Release: record your actual OpenAPI and final-check dates.');
  check(evidence.reader_review.reviewer_label && evidence.reader_review.reviewed_on && evidence.reader_review.outcome === 'accepted', 'Release: fresh-reader review is missing or has not been accepted.');
  check(evidence.reader_review.findings.length > 0 && evidence.reader_review.revisions.length > 0, 'Release: record concrete review findings and resulting revisions.');
  check(evidence.contribution_statement.trim().length >= 40, 'Release: add a concrete authorship/contribution statement.');
  const caseStudy = await readFile(resolve(root, 'docs/case-study.md'), 'utf8');
  check(!caseStudy.includes('Not recorded yet') && !caseStudy.includes('learner review pending') && !caseStudy.includes('Current status: prepared learning scaffold'), 'Release: replace the starter case study with your reviewed account.');
  const readme = await readFile(resolve(root, 'README.md'), 'utf8');
  check(!readme.includes('Status: learning scaffold'), 'Release: update the README status to reflect the completed work.');
}
if (failures.length) { console.error(failures.map(message => '- ' + message).join('\n')); process.exitCode = 1; }
else console.log('PASS: artifact consistency' + (process.argv.includes('--site') ? ', generated site links' : '') + (process.argv.includes('--publish') ? ', explicit publication status' : '') + (process.argv.includes('--release') ? ', recorded release criteria' : '') + '. Not a complete OpenAPI standards validation.');
