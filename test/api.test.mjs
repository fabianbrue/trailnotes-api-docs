import { before, after, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer, DEMO_KEY } from '../src/server.mjs';
import { listAll } from '../examples/list-all.mjs';

let server, base;
before(async () => {
  server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve())); });
async function get(path, { key = DEMO_KEY, method = 'GET' } = {}) {
  const response = await fetch(base + path, { method, headers: key === null ? {} : { 'X-Demo-Key': key } });
  assert.match(response.headers.get('content-type'), /^application\/json/);
  return { response, body: await response.json() };
}
test('health is public and declares synthetic data', async () => {
  const { response, body } = await get('/health', { key: null });
  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: 'ok', api: 'TrailNotes', version: '0.1.0', synthetic: true });
});
test('the documented first-page response matches the actual API', async () => {
  const expected = JSON.parse(await readFile(new URL('../examples/responses/first-page.json', import.meta.url)));
  const { response, body } = await get('/v1/trails?limit=2');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(body, expected);
});
test('filtering happens before pagination', async () => {
  const expected = JSON.parse(await readFile(new URL('../examples/responses/easy-trails.json', import.meta.url)));
  const { response, body } = await get('/v1/trails?difficulty=easy&limit=2');
  assert.equal(response.status, 200);
  assert.deepEqual(body, expected);
});
test('the second page keeps the total and ends pagination', async () => {
  const { body } = await get('/v1/trails?limit=2&offset=2');
  assert.equal(body.total, 3);
  assert.deepEqual(body.items.map(item => item.id), ['summit-track']);
  assert.equal(body.next_offset, null);
});
test('an offset beyond the data returns an empty successful page', async () => {
  const { response, body } = await get('/v1/trails?offset=999');
  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.deepEqual(body.items, []);
  assert.equal(body.next_offset, null);
});
test('a trail detail matches the OpenAPI example', async () => {
  const spec = JSON.parse(await readFile(new URL('../api/openapi.json', import.meta.url)));
  const { response, body } = await get('/v1/trails/pine-loop');
  assert.equal(response.status, 200);
  assert.deepEqual(body, spec.paths['/v1/trails/{trailId}'].get.responses['200'].content['application/json'].example);
});
test('missing and incorrect demo keys are rejected', async () => {
  for (const key of [null, '', 'incorrect-public-demo-value']) {
    const { response, body } = await get('/v1/trails', { key });
    assert.equal(response.status, 401);
    assert.equal(body.error.code, 'UNAUTHORIZED');
  }
});
test('invalid, empty, unknown and repeated query parameters are rejected', async () => {
  for (const query of ['limit=0', 'limit=4', 'limit=1.5', 'limit=', 'limit=-1', 'offset=-1', 'offset=1001', 'offset=1.5', 'difficulty=EASY', 'difficulty=', 'other=yes', 'limit=1&limit=2']) {
    const { response, body } = await get('/v1/trails?' + query);
    assert.equal(response.status, 400, query);
    assert.equal(body.error.code, 'INVALID_QUERY', query);
  }
});
test('unknown IDs and unsupported detail queries have distinct failures', async () => {
  const missing = await get('/v1/trails/unknown-trail');
  assert.equal(missing.response.status, 404);
  assert.equal(missing.body.error.code, 'TRAIL_NOT_FOUND');
  const query = await get('/v1/trails/pine-loop?limit=2');
  assert.equal(query.response.status, 400);
  const precedence = await get('/v1/trails/unknown-trail?limit=2');
  assert.equal(precedence.response.status, 404);
});
test('unsupported methods return 405 and advertise GET', async () => {
  const { response, body } = await get('/v1/trails', { method: 'POST' });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.equal(body.error.code, 'METHOD_NOT_ALLOWED');
});
test('unknown API paths return JSON 404', async () => {
  const { response, body } = await get('/v1/unknown');
  assert.equal(response.status, 404);
  assert.equal(body.error.code, 'NOT_FOUND');
});
test('the runnable pagination tutorial retrieves every trail once', async () => {
  const items = await listAll(base);
  assert.deepEqual(items.map(item => item.id), ['pine-loop', 'ridge-path', 'summit-track']);
});
