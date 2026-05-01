import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const url = "http://127.0.0.1:5173";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const artifactDir = resolve("artifacts");

mkdirSync(artifactDir, { recursive: true });

async function canvasStats(page) {
  return page.evaluate(async () => {
    await new Promise((resolveFrame) => {
      requestAnimationFrame(() => requestAnimationFrame(resolveFrame));
    });

    const canvas = document.querySelector("[data-testid='three-scene'] canvas");
    if (!canvas) {
      return { present: false };
    }

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      return { present: true, webgl: false };
    }

    const pixel = new Uint8Array(4);
    let litPixels = 0;
    let maxBrightness = 0;
    let checksum = 0;
    let checked = 0;

    const xSteps = 34;
    const ySteps = 22;
    for (let yIndex = 0; yIndex < ySteps; yIndex += 1) {
      for (let xIndex = 0; xIndex < xSteps; xIndex += 1) {
        const x = Math.floor(((xIndex + 0.5) / xSteps) * canvas.width);
        const y = Math.floor(((yIndex + 0.5) / ySteps) * canvas.height);
        gl.readPixels(x, canvas.height - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        const brightness = pixel[0] + pixel[1] + pixel[2] + pixel[3];
        checksum = (checksum + brightness * (checked + 1)) % 1000000007;
        maxBrightness = Math.max(maxBrightness, brightness);
        if (brightness > 35) {
          litPixels += 1;
        }
        checked += 1;
      }
    }

    return {
      present: true,
      webgl: true,
      width: canvas.width,
      height: canvas.height,
      checked,
      litPixels,
      maxBrightness,
      checksum
    };
  });
}

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const browserMessages = [];
  page.on("console", (message) => {
    browserMessages.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => {
    browserMessages.push(`pageerror: ${error.message}`);
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-testid='three-scene'] canvas", {
    state: "attached",
    timeout: 30000
  });
  await page.waitForTimeout(900);

  const firstStats = await canvasStats(page);
  await page.waitForTimeout(900);
  const secondStats = await canvasStats(page);

  await page.screenshot({
    path: resolve(artifactDir, `portfolio-${name}.png`),
    fullPage: true
  });

  await page.close();

  const hasVisibleCanvas =
    firstStats.present &&
    firstStats.webgl &&
    firstStats.width > 0 &&
    firstStats.height > 0 &&
    firstStats.litPixels > 8 &&
    firstStats.maxBrightness > 80;

  const hasMotion = firstStats.checksum !== secondStats.checksum;

  return {
    name,
    viewport,
    firstStats,
    secondStats,
    browserMessages,
    hasVisibleCanvas,
    hasMotion
  };
}

const browser = await chromium.launch({
  headless: true,
  executablePath: edgePath
});

try {
  const results = [];
  results.push(await verifyViewport(browser, "desktop", { width: 1440, height: 1000 }));
  results.push(await verifyViewport(browser, "mobile", { width: 390, height: 844 }));

  const failures = results.filter((result) => !result.hasVisibleCanvas || !result.hasMotion);
  console.log(JSON.stringify({ url, artifactDir, results }, null, 2));

  if (failures.length > 0) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
