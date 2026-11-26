import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { trails } from './data.mjs';

export const DEMO_KEY = 'trailnotes-demo'; // Public sample value, never a real credential.
const siteRoot = fileURLToPath(new URL('../_site/', import.meta.url));
const mediaTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.yaml': 'text/yaml; charset=utf-8' };

function json(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(body, null, 2));
}
function error(res, status, code, message, headers) {
  json(res, status, { error: { code, message } }, headers);
}
function integer(value, fallback, min, max) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= min && parsed <= max ? parsed : null;
}

export function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname;
    const apiPath = path === '/health' || path === '/v1/trails' || path.startsWith('/v1/');
    if (apiPath && req.method !== 'GET') {
      return error(res, 405, 'METHOD_NOT_ALLOWED', 'This demo accepts GET requests only.', { Allow: 'GET' });
    }
    if (path === '/health') return json(res, 200, { status: 'ok', api: 'TrailNotes', version: '0.1.0', synthetic: true });
    if (path === '/v1/trails' || /^\/v1\/trails\/[^/]+$/.test(path)) {
      if (req.headers['x-demo-key'] !== DEMO_KEY) {
        return error(res, 401, 'UNAUTHORIZED', 'Provide the public X-Demo-Key value: trailnotes-demo.');
      }
      if (path === '/v1/trails') {
        const allowed = new Set(['difficulty', 'limit', 'offset']);
        if ([...url.searchParams.keys()].some(key => !allowed.has(key) || url.searchParams.getAll(key).length !== 1)) {
          return error(res, 400, 'INVALID_QUERY', 'Use each supported query parameter at most once.');
        }
        const difficulty = url.searchParams.get('difficulty');
        const limit = integer(url.searchParams.get('limit'), 2, 1, 3);
        const offset = integer(url.searchParams.get('offset'), 0, 0, 1000);
        if ((difficulty !== null && !['easy', 'moderate', 'hard'].includes(difficulty)) || limit === null || offset === null) {
          return error(res, 400, 'INVALID_QUERY', 'Check difficulty, limit (1-3) and offset (0-1000).');
        }
        const matches = trails.filter(trail => difficulty === null || trail.difficulty === difficulty);
        const items = matches.slice(offset, offset + limit);
        return json(res, 200, { items, total: matches.length, limit, offset, next_offset: offset + limit < matches.length ? offset + limit : null });
      }
      const id = path.slice('/v1/trails/'.length);
      const trail = trails.find(item => item.id === id);
      if (!trail) return error(res, 404, 'TRAIL_NOT_FOUND', 'No trail matches this id.');
      if (url.search) return error(res, 400, 'INVALID_QUERY', 'Trail detail requests do not accept query parameters.');
      return json(res, 200, trail);
    }
    if (path.startsWith('/v1/')) return error(res, 404, 'NOT_FOUND', 'No endpoint matches this path.');
    if (req.method !== 'GET') return error(res, 405, 'METHOD_NOT_ALLOWED', 'Use GET for documentation pages.', { Allow: 'GET' });
    try {
      const decoded = decodeURIComponent(path === '/' ? '/index.html' : path);
      const target = resolve(siteRoot, `.${decoded}`);
      if (!target.startsWith(resolve(siteRoot) + sep)) return error(res, 404, 'NOT_FOUND', 'Page not found.');
      const bytes = await readFile(target);
      res.writeHead(200, { 'Content-Type': mediaTypes[extname(target)] ?? 'application/octet-stream' });
      res.end(bytes);
    } catch {
      error(res, 404, 'NOT_FOUND', 'Page not found. Build the documentation with scripts/build-docs.ps1 first.');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4010);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535.');
  const server = createServer();
  server.on('error', err => { console.error(`Cannot start TrailNotes: ${err.message}`); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`TrailNotes: http://127.0.0.1:${port}/ — fictional data; Ctrl+C to stop.`));
}
