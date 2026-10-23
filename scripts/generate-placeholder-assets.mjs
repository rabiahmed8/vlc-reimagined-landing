import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve(process.cwd(), "..", "Assets");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SCREENSHOTS_DIR = path.join(PUBLIC_DIR, "screenshots");

/**
 * Builds the regenerated Hero / Player image using the exact layout & chrome
 * of `main ui.png` (1919x1079), replacing the inner video viewport and
 * cleaning up the top-bar media title.
 */
async function generateHeroPlayerWebp() {
  const mainUiPath = path.join(ASSETS_DIR, "main ui.png");
  const width = 1919;
  const height = 1079;

  // Inner video viewport in `main ui.png` is x: 9..1910 (1902px), y: 51..1014 (964px) with rounded corners (rx=10)
  const vpX = 9;
  const vpY = 51;
  const vpW = 1902;
  const vpH = 964;

  const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <defs>
      <clipPath id="viewportClip">
        <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" rx="10" ry="10"/>
      </clipPath>
      <radialGradient id="heroSceneGlow" cx="50%" cy="47%" r="50%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.16"/>
        <stop offset="45%" stop-color="#1A1512" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#050507" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="coreRingGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- 1. Clean up top bar folder text & centered file name while keeping all real VLC Reimagined icons intact -->
    <rect x="168" y="6" width="160" height="38" fill="#1A1A1A"/>
    <text x="170" y="29" fill="#9E9EA4" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="400">Dune Part Two (2024)</text>

    <rect x="680" y="6" width="560" height="38" fill="#1A1A1A"/>
    <text x="960" y="29" text-anchor="middle" fill="#9E9EA4" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="400">Dune.Part.Two.2024.2160p.UHD.AV1.10bit.mkv</text>

    <!-- 2. Regenerated cinematic hero viewport inside the exact rounded video area of main ui.png -->
    <g clip-path="url(#viewportClip)">
      <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" fill="#050507"/>
      <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" fill="url(#heroSceneGlow)"/>

      <!-- Center focal graphic motif -->
      <circle cx="960" cy="490" r="230" fill="url(#coreRingGlow)"/>
      <circle cx="960" cy="490" r="185" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1.5"/>
      <circle cx="960" cy="490" r="116" stroke="#FF8800" stroke-opacity="0.22" stroke-width="1.5"/>
      <circle cx="960" cy="490" r="50" fill="#141418" fill-opacity="0.92" stroke="#FF8800" stroke-opacity="0.55" stroke-width="1.5"/>
      <polygon points="950,471 950,509 981,490" fill="#FF8800"/>

      <!-- Crisp subtitle cue near bottom of viewport -->
      <rect x="520" y="846" width="880" height="46" rx="10" fill="#0B0B0E" fill-opacity="0.82" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1"/>
      <text x="960" y="875" text-anchor="middle" fill="#F5F5F7" font-family="Segoe UI, Inter, sans-serif" font-size="19" font-weight="500">“Dreams make good stories, but everything important happens when we’re awake.”</text>
    </g>

    <!-- Subtle inner border on the rounded video viewport matching VLC Reimagined -->
    <rect x="${vpX + 0.5}" y="${vpY + 0.5}" width="${vpW - 1}" height="${vpH - 1}" rx="10" ry="10" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
  </svg>`;

  const buf = await sharp(mainUiPath)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 96 })
    .toBuffer();

  await fs.writeFile(path.join(SCREENSHOTS_DIR, "player.webp"), buf);
}

/**
 * Wraps an uncropped modal/dialog screenshot onto a uniform 1920x1080 (16:9)
 * dark canvas with a subtle border and shadow so all gallery cards share the
 * exact same 16:9 aspect ratio without cropping or distorting the screenshot.
 */
async function frameDialogScreenshot(inputFilename, outputFilename) {
  const inputPath = path.join(ASSETS_DIR, inputFilename);
  const canvasW = 1920;
  const canvasH = 1080;

  const meta = await sharp(inputPath).metadata();
  // Scale consistently so every dialog fills ~900px height in the 1920x1080 stage
  const scale = Math.min(1640 / meta.width, 900 / meta.height);
  const targetW = Math.round(meta.width * scale);
  const targetH = Math.round(meta.height * scale);
  const left = Math.round((canvasW - targetW) / 2);
  const top = Math.round((canvasH - targetH) / 2);

  const resizedShot = await sharp(inputPath)
    .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6 })
    .toBuffer();

  const roundedMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${targetW}" height="${targetH}">
      <rect x="0" y="0" width="${targetW}" height="${targetH}" rx="14" ry="14" fill="#fff"/>
    </svg>`
  );

  const maskedShot = await sharp(resizedShot)
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const backdropSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}" viewBox="0 0 ${canvasW} ${canvasH}" fill="none">
    <defs>
      <filter id="dropShadow" x="-12%" y="-12%" width="124%" height="128%">
        <feDropShadow dx="0" dy="24" stdDeviation="36" flood-color="#000000" flood-opacity="0.82"/>
      </filter>
    </defs>
    <rect width="${canvasW}" height="${canvasH}" fill="#0E0E12"/>
    <rect x="${left}" y="${top}" width="${targetW}" height="${targetH}" rx="14" ry="14" fill="#141414" filter="url(#dropShadow)"/>
  </svg>`;

  const borderOverlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}" viewBox="0 0 ${canvasW} ${canvasH}" fill="none">
    <rect x="${left - 0.5}" y="${top - 0.5}" width="${targetW + 1}" height="${targetH + 1}" rx="14" ry="14" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  </svg>`;

  const buf = await sharp(Buffer.from(backdropSvg))
    .composite([
      { input: maskedShot, left, top },
      { input: Buffer.from(borderOverlaySvg), left: 0, top: 0 },
    ])
    .webp({ quality: 96 })
    .toBuffer();

  await fs.writeFile(path.join(SCREENSHOTS_DIR, outputFilename), buf);
}

function buildOgSvg(conePaths) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
    <defs>
      <radialGradient id="ogGlow" cx="78%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#16161C"/>
        <stop offset="100%" stop-color="#0E0E12"/>
      </linearGradient>
      <linearGradient id="tileBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#101014"/>
        <stop offset="1" stop-color="#1E1E26"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#0E0E12"/>
    <rect x="32" y="32" width="1136" height="566" rx="28" fill="url(#cardGrad)" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="920" cy="315" r="420" fill="url(#ogGlow)"/>

    <!-- Official vlc-reimagined.svg mark scaled to 96x96 -->
    <g transform="translate(88, 102) scale(0.09375)">
      <rect width="1024" height="1024" rx="230.4" fill="url(#tileBg)"/>
      <g transform="translate(184.50 184.50) scale(27.291667)">
        ${conePaths}
      </g>
    </g>

    <text x="204" y="160" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="30" font-weight="600" letter-spacing="-0.5">VLC Reimagined</text>
    <text x="88" y="305" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="60" font-weight="700" letter-spacing="-2">The player you know.</text>
    <text x="88" y="380" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="60" font-weight="700" letter-spacing="-2">The interface you wanted.</text>
    <text x="88" y="452" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="24" font-weight="400">Every format VLC 4 plays, rebuilt with a quiet, dark desktop UI for Windows.</text>

    <rect x="88" y="496" width="186" height="44" rx="12" fill="#FF8800"/>
    <text x="181" y="524" text-anchor="middle" fill="#0E0E12" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="700">Windows 10 / 11</text>
    <text x="300" y="524" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">64-bit · GPLv2+ · v4.0.0</text>
  </svg>`;
}

async function main() {
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  const vlcReimaginedSvg = await fs.readFile(
    path.join(ASSETS_DIR, "vlc-reimagined.svg"),
    "utf8"
  );
  const coneOnlySvg = await fs.readFile(
    path.join(ASSETS_DIR, "logo.svg"),
    "utf8"
  );

  await fs.writeFile(path.join(PUBLIC_DIR, "logo.svg"), vlcReimaginedSvg, "utf8");
  await fs.writeFile(path.join(PUBLIC_DIR, "cone.svg"), coneOnlySvg, "utf8");

  const logoPngBuf = await sharp(Buffer.from(vlcReimaginedSvg))
    .resize(1024, 1024)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(PUBLIC_DIR, "logo.png"), logoPngBuf);

  const conePaths = `
    <path d="M16.7912 14.4111L17.1798 15.5778C16.014 16.4334 14.2264 17.2111 12.0502 17.2111C9.7963 17.2111 8.08643 16.4334 6.92061 15.5778L7.30921 14.4111H5.52162C5.13302 14.4111 4.89985 14.6445 4.74441 14.9556L3.03454 21.4889C2.8791 21.9556 3.2677 22.5 3.81175 22.5H20.211C20.755 22.5 21.0659 22.0334 20.9882 21.4889L19.2006 14.9556C19.1229 14.6445 18.812 14.4111 18.4234 14.4111H16.7912Z" fill="#FF8800"/>
    <path d="M7.85327 12.1555C8.78593 12.8555 10.1849 13.4777 11.9725 13.4777C13.7601 13.4777 15.1591 12.7777 16.0917 12.1555L15.0036 8.42212C14.3041 8.88879 13.2938 9.1999 11.9725 9.1999C10.6512 9.1999 9.64086 8.81101 8.94137 8.42212L7.85327 12.1555Z" fill="#FF8800"/>
    <path d="M9.95166 4.84444L10.6512 2.43333C11.0398 1.18889 12.8274 1.18889 13.216 2.43333L13.9155 4.84444C13.3714 5 12.7496 5.15555 11.9724 5.15555C11.1952 5.15555 10.5734 5 9.95166 4.84444Z" fill="#FF8800"/>
  `;
  const ogBuf = await sharp(Buffer.from(buildOgSvg(conePaths)))
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(PUBLIC_DIR, "og.png"), ogBuf);

  await generateHeroPlayerWebp();
  await frameDialogScreenshot("settings.png", "settings.webp");
  await frameDialogScreenshot("Audio effects.png", "audio-effects.webp");
  await frameDialogScreenshot("Subtitle slider.png", "subtitle-timeline.webp");

  // Clean up old placeholder screenshot filenames if present
  for (const oldFile of ["library.webp", "queue-tracks.webp"]) {
    try {
      await fs.unlink(path.join(SCREENSHOTS_DIR, oldFile));
    } catch {
      // ignore if already removed
    }
  }

  console.log("Successfully updated logo assets and generated all 4 screenshots.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
