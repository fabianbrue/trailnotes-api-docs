const form = document.querySelector('[data-demo-console]');
if (form) {
  const status = form.querySelector('[data-console-status]');
  const output = form.querySelector('[data-console-output]');
  const button = form.querySelector('button');
  const local = ['127.0.0.1', 'localhost'].includes(location.hostname) && location.protocol === 'http:';
  if (!local) {
    status.textContent = 'This view hosts documentation only. Run the repository locally to use the request console.';
    button.disabled = true;
  }
  const cases = {
    list: ['/v1/trails?limit=2', true], easy: ['/v1/trails?difficulty=easy', true],
    detail: ['/v1/trails/pine-loop', true], unauthorized: ['/v1/trails', false], missing: ['/v1/trails/unknown-trail', true]
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!local) return;
    const [path, authorized] = cases[form.elements.request.value];
    button.disabled = true;
    status.textContent = `Sending GET ${path}…`;
    try {
      const response = await fetch(path, { headers: authorized ? { 'X-Demo-Key': 'trailnotes-demo' } : {}, signal: AbortSignal.timeout(10000) });
      const body = await response.json();
      status.textContent = `GET ${path} → HTTP ${response.status}`;
      output.textContent = JSON.stringify(body, null, 2);
    } catch (err) { status.textContent = 'Request failed. Confirm the local demo is running.'; output.textContent = err.message; }
    finally { button.disabled = false; }
  });
}
