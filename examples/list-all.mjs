import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function listAll(baseUrl = 'http://127.0.0.1:4010') {
  let offset = 0;
  const all = [];
  do {
    const response = await fetch(`${baseUrl}/v1/trails?limit=2&offset=${offset}`, { headers: { 'X-Demo-Key': 'trailnotes-demo' } });
    if (!response.ok) throw new Error(`Request failed: HTTP ${response.status}`);
    const page = await response.json();
    all.push(...page.items);
    offset = page.next_offset;
  } while (offset !== null);
  return all;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  listAll(process.env.TRAILNOTES_BASE_URL).then(items => console.log(items.map(trail => trail.id))).catch(err => { console.error(err.message); process.exitCode = 1; });
}
