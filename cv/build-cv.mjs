// Regenera public/assets/Luis_Carlos_Arteaga_Espitia_CV.pdf desde cv/cv.html.
//   node cv/build-cv.mjs
// El PDF original venía de Typst con XCharter; aquí se reproduce con Chrome,
// que además deja texto real seleccionable (mejor para ATS que una imagen).
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'cv', 'cv.html');
const OUT = join(ROOT, 'public', 'assets', 'Luis_Carlos_Arteaga_Espitia_CV.pdf');

const CHROME =
  process.env.CHROME_PATH ??
  '/root/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell';
const PORT = 9396;

const chrome = spawn(
  CHROME,
  [
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--headless',
    `--remote-debugging-port=${PORT}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const bye = () => {
  try {
    chrome.kill('SIGKILL');
  } catch {}
};
process.on('exit', bye);

let list = null;
for (let i = 0; i < 40; i++) {
  try {
    list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    break;
  } catch {
    await sleep(300);
  }
}

const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
await new Promise((r) => ws.addEventListener('open', r));
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send('Page.enable');
await send('Page.navigate', { url: `file://${SRC}` });
await sleep(1200);

const res = await send('Page.printToPDF', {
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: false,
});

if (!res.result?.data) {
  console.error('printToPDF devolvió vacío:', JSON.stringify(res).slice(0, 400));
  process.exit(1);
}

writeFileSync(OUT, Buffer.from(res.result.data, 'base64'));
console.log(`PDF escrito en ${OUT} (${readFileSync(OUT).length} bytes)`);

ws.close();
bye();
