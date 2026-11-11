/**
 * Capturas de cada sección, en escritorio y en teléfono, y una verificación
 * rápida: errores y avisos de consola y desborde horizontal en 1440, 1280 y
 * 375 px.
 *
 * Uso, con el sitio corriendo en http://localhost:8080 (npm run dev):
 *   npm i --no-save puppeteer-core
 *   node scripts/capturas.mjs
 *
 * Usa el Chrome instalado en la máquina. Para otro navegador, definir CHROME
 * con la ruta del ejecutable. Escribe en docs/capturas/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let puppeteer;
try {
  puppeteer = (await import("puppeteer-core")).default;
} catch {
  console.error("Falta puppeteer-core. Correr: npm i --no-save puppeteer-core");
  process.exit(1);
}

const BASE = process.env.BASE_URL || "http://localhost:8080";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "docs", "capturas");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--hide-scrollbars"] });
const problems = [];

async function open(route, { width, height, dsf = 1, reduced = false }) {
  const page = await browser.newPage();
  page.on("console", (m) => ["error", "warn", "warning"].includes(m.type()) && problems.push(`${route} ${width}px: ${m.text()}`));
  page.on("pageerror", (e) => problems.push(`${route} ${width}px: ${e.message}`));
  await page.setViewport({ width, height, deviceScaleFactor: dsf });
  if (reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(BASE + route, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) problems.push(`${route} ${width}px: la página desborda ${overflow}px a lo ancho`);
  return page;
}

/** Captura un elemento entero. `settle` es el tiempo que se deja correr la animación con el elemento a la vista. */
async function shot(page, selector, file, { settle = 400, focus, nav = false } = {}) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const element = await page.$(selector);
  if (!element) return problems.push(`no se encontró ${selector} para ${path.basename(file)}`);
  await page.evaluate(
    (sel, focusSel, showNav) => {
      // La barra queda fija arriba: fuera del inicio se oculta para que no tape la sección.
      document.querySelector("header").style.visibility = showNav ? "" : "hidden";
      (focusSel ? document.querySelector(sel).querySelector(focusSel) : document.querySelector(sel)).scrollIntoView({
        block: focusSel ? "center" : "start",
        behavior: "instant",
      });
    },
    selector,
    focus ?? null,
    nav,
  );
  await wait(settle);
  await element.screenshot({ path: file });
  console.log("  " + path.relative(path.join(OUT, ".."), file));
}

const LANDING = [
  ["01-inicio", "main > section:nth-of-type(1)", { settle: 5200, nav: true }],
  ["01b-lo-que-dijo-y-lo-que-va-al-formulario", "main > section:nth-of-type(2)", { settle: 5200 }],
  ["02-problema", "main > section:nth-of-type(3)", {}],
  ["03-caso-de-muestra-documents", "#demo > div:nth-child(1)", { settle: 2500, focus: ".rounded-stage" }],
  ["04-caso-de-muestra-interview", "#demo > div:nth-child(2)", { settle: 7600, focus: ".rounded-stage" }],
  ["05-caso-de-muestra-filing-package", "#demo > div:nth-child(3)", { settle: 2200, focus: ".rounded-stage" }],
  ["06-como-usamos-la-ia", "main > section:nth-of-type(5)", {}],
  ["07-para-quien-es", "#who", {}],
  ["08-quienes-somos", "#who-we-are", { settle: 900 }],
  ["09-preguntas", "#questions", {}],
  ["10-cierre", "main > section:last-of-type", {}],
  ["11-pie", "footer", {}],
];

const SIZES = [
  ["escritorio", { width: 1440, height: 900 }],
  ["telefono", { width: 375, height: 812, dsf: 2 }],
];

for (const [folder, size] of SIZES) {
  console.log(`${folder} (${size.width} px)`);
  let page = await open("/for-firms", size);
  for (const [name, selector, options] of LANDING) {
    await shot(page, selector, path.join(OUT, folder, `${name}.png`), options);
  }
  await page.close();

  page = await open("/for-organizations", size);
  await shot(page, "main > section:nth-of-type(1)", path.join(OUT, folder, "12-organizaciones-inicio.png"), { settle: 5200, nav: true });
  await shot(page, "main > section:nth-of-type(3)", path.join(OUT, folder, "13-organizaciones-problema.png"));
  await page.close();

  page = await open("/trust", size);
  await shot(page, "main", path.join(OUT, folder, "14-trust.png"), { nav: false });
  await page.close();
  page = await open("/trust/how-we-use-ai", size);
  await shot(page, "main", path.join(OUT, folder, "15-trust-articulo.png"));
  await page.close();
  page = await open("/privacy", size);
  await shot(page, "main", path.join(OUT, folder, "16-privacy-con-marcador.png"));
  await page.close();
}

// 1280 px: el inicio y los escenarios, que son lo más sensible al ancho.
console.log("1280 px");
{
  const page = await open("/for-firms", { width: 1280, height: 720 });
  for (const [name, selector, options] of LANDING.slice(0, 6)) {
    await shot(page, selector, path.join(OUT, "1280", `${name}.png`), options);
  }
  await page.close();
}

// Detalles: primera pantalla, movimiento reducido, teclado, formulario y menú.
console.log("detalles");
{
  const details = path.join(OUT, "detalles");
  fs.mkdirSync(details, { recursive: true });
  const log = (name) => console.log("  docs/capturas/detalles/" + name);

  for (const [w, h] of [[1440, 900], [1280, 720], [375, 812]]) {
    const page = await open("/for-firms", { width: w, height: h, dsf: w < 500 ? 2 : 1 });
    await wait(1600);
    await page.screenshot({ path: path.join(details, `primera-pantalla-${w}.png`) });
    log(`primera-pantalla-${w}.png`);
    await page.close();
  }

  let page = await open("/for-firms", { width: 1440, height: 900, reduced: true });
  await shot(page, "main > section:nth-of-type(1)", path.join(details, "movimiento-reducido-inicio.png"), { nav: true });
  await shot(page, "#demo > div:nth-child(1) .rounded-stage", path.join(details, "movimiento-reducido-documents.png"));
  await shot(page, "#demo > div:nth-child(2) .rounded-stage", path.join(details, "movimiento-reducido-interview.png"));
  await shot(page, "#demo > div:nth-child(3) .rounded-stage", path.join(details, "movimiento-reducido-filing-package.png"));
  await page.close();

  page = await open("/for-firms", { width: 1440, height: 900 });
  await page.keyboard.press("Tab");
  await wait(250);
  await page.screenshot({ path: path.join(details, "teclado-saltar-al-contenido.png"), clip: { x: 0, y: 0, width: 1440, height: 420 } });
  log("teclado-saltar-al-contenido.png");
  for (let i = 0; i < 8; i += 1) await page.keyboard.press("Tab");
  await wait(250);
  await page.screenshot({ path: path.join(details, "teclado-foco-en-el-inicio.png"), clip: { x: 0, y: 0, width: 1440, height: 640 } });
  log("teclado-foco-en-el-inicio.png");
  await page.close();

  page = await open("/for-firms", { width: 1440, height: 900 });
  await page.evaluate(() => (document.querySelector("header").style.visibility = "hidden"));
  const block = await page.$("#demo-download");
  await page.evaluate(() => document.getElementById("demo-download").scrollIntoView({ block: "center", behavior: "instant" }));
  await page.click("#demo-download button[type=submit]");
  await wait(300);
  await block.screenshot({ path: path.join(details, "formulario-con-errores.png") });
  log("formulario-con-errores.png");
  await page.type("#demo-download input[name=name]", "Ana Ruiz");
  await page.type("#demo-download input[name=email]", "ana@ruizlaw.example");
  await page.click("#demo-download button[type=submit]");
  await wait(800);
  // El formulario abre el PDF en otra pestaña: se cierra y se vuelve a esta.
  for (const other of await browser.pages()) if (other !== page && other.url() !== "about:blank") await other.close();
  await page.bringToFront();
  await wait(300);
  await block.screenshot({ path: path.join(details, "formulario-listo.png") });
  log("formulario-listo.png");
  await page.close();

  page = await open("/trust", { width: 1440, height: 900 });
  await page.evaluate(() => [...document.querySelectorAll("button[aria-pressed]")].find((b) => b.textContent === "Privacy").click());
  await wait(400);
  await page.screenshot({ path: path.join(details, "trust-filtro-privacy.png") });
  log("trust-filtro-privacy.png");
  await page.close();

  page = await open("/for-firms", { width: 375, height: 812, dsf: 2 });
  await page.click("button[aria-controls=menu]");
  await wait(350);
  await page.screenshot({ path: path.join(details, "telefono-menu.png") });
  log("telefono-menu.png");
  await page.close();
}

await browser.close();
console.log(problems.length ? "\nPROBLEMAS:\n" + problems.join("\n") : "\nSin errores ni avisos de consola, y sin desborde horizontal.");
process.exit(problems.length ? 1 : 0);
