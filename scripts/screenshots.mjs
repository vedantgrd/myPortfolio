import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "https://garudvedantportfolio.vercel.app";
const pages = {
  cover: "/", work: "/work", writing: "/writing", taste: "/taste",
  about: "/about", archive: "/archive", now: "/now", lab: "/lab", contact: "/contact",
};

const OUT = process.env.OUT_DIR || "docs/screenshots";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, path] of Object.entries(pages)) {
  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500); // let Framer Motion animations settle
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("saved", name);
}
await browser.close();
