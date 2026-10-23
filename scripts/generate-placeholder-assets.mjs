import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve(process.cwd(), "..", "Assets");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SCREENSHOTS_DIR = path.join(PUBLIC_DIR, "screenshots");

/**
 * Shared SVG fragment for cleaning up the top bar text of `main ui.png`
 */
function topBarCleanTextSvg() {
  return `
    <rect x="168" y="6" width="160" height="38" fill="#1A1A1A"/>
    <text x="170" y="29" fill="#9E9EA4" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="400">Dune Part Two (2024)</text>

    <rect x="680" y="6" width="560" height="38" fill="#1A1A1A"/>
    <text x="960" y="29" text-anchor="middle" fill="#9E9EA4" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="400">Dune.Part.Two.2024.2160p.UHD.AV1.10bit.mkv</text>
  `;
}

/**
 * Shared SVG fragment for the cinematic video viewport scene
 */
function videoSceneSvg(centerX = 960, centerY = 490, showSubtitle = true) {
  const vpX = 9;
  const vpY = 51;
  const vpW = 1902;
  const vpH = 964;

  return `
    <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" fill="#050507"/>
    <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" fill="url(#heroSceneGlow)"/>

    <!-- Center focal graphic motif -->
    <circle cx="${centerX}" cy="${centerY}" r="230" fill="url(#coreRingGlow)"/>
    <circle cx="${centerX}" cy="${centerY}" r="185" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1.5"/>
    <circle cx="${centerX}" cy="${centerY}" r="116" stroke="#FF8800" stroke-opacity="0.22" stroke-width="1.5"/>
    <circle cx="${centerX}" cy="${centerY}" r="50" fill="#141418" fill-opacity="0.92" stroke="#FF8800" stroke-opacity="0.55" stroke-width="1.5"/>
    <polygon points="${centerX - 10},${centerY - 19} ${centerX - 10},${centerY + 19} ${centerX + 21},${centerY}" fill="#FF8800"/>

    ${
      showSubtitle
        ? `<rect x="${centerX - 440}" y="846" width="880" height="46" rx="10" fill="#0B0B0E" fill-opacity="0.82" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1"/>
           <text x="${centerX}" y="875" text-anchor="middle" fill="#F5F5F7" font-family="Segoe UI, Inter, sans-serif" font-size="19" font-weight="500">“Dreams make good stories, but everything important happens when we’re awake.”</text>`
        : ""
    }
  `;
}

/**
 * 1. Hero / Main Player View (`player.webp`)
 */
async function generateHeroPlayerWebp() {
  const mainUiPath = path.join(ASSETS_DIR, "main ui.png");
  const width = 1919;
  const height = 1079;
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

    ${topBarCleanTextSvg()}

    <g clip-path="url(#viewportClip)">
      ${videoSceneSvg(960, 490, true)}
    </g>

    <rect x="${vpX + 0.5}" y="${vpY + 0.5}" width="${vpW - 1}" height="${vpH - 1}" rx="10" ry="10" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
  </svg>`;

  const buf = await sharp(mainUiPath)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 96 })
    .toBuffer();

  await fs.writeFile(path.join(SCREENSHOTS_DIR, "player.webp"), buf);
}

/**
 * 2. Media Library & Folders Drawer (`library.webp`)
 * Matches the exact VLC Reimagined left sidebar rail + Folders grid layout.
 */
async function generateLibraryWebp() {
  const mainUiPath = path.join(ASSETS_DIR, "main ui.png");
  const width = 1919;
  const height = 1079;
  const vpX = 9;
  const vpY = 51;
  const vpW = 1902;
  const vpH = 964;

  const cards = [
    { col: 0, row: 0, title: "Dune.Part.Two.2024.Ch01.Arrakis.UHD...", size: "412 MB", active: true, time: "18:24", hue: "#FF8800" },
    { col: 1, row: 0, title: "Dune.Part.Two.2024.Ch02.Sietch.Tabr...", size: "389 MB", active: false, time: "16:50", hue: "#D97706" },
    { col: 0, row: 1, title: "Dune.Part.Two.2024.Ch03.Desert.Walk...", size: "448 MB", active: false, time: "21:10", hue: "#EA580C" },
    { col: 1, row: 1, title: "Dune.Part.Two.2024.Ch04.Harvester...", size: "510 MB", active: false, time: "24:05", hue: "#F59E0B" },
    { col: 0, row: 2, title: "Dune.Part.Two.2024.Ch05.Giedi.Prime...", size: "476 MB", active: false, time: "19:42", hue: "#A1A1AA" },
    { col: 1, row: 2, title: "Dune.Part.Two.2024.Ch06.Water.Life...", size: "395 MB", active: false, time: "17:18", hue: "#FF8800" },
    { col: 0, row: 3, title: "Dune.Part.Two.2024.Ch07.Southern...", size: "430 MB", active: false, time: "20:11", hue: "#D97706" },
    { col: 1, row: 3, title: "Dune.Part.Two.2024.Ch08.Final.Duel...", size: "524 MB", active: false, time: "25:40", hue: "#EA580C" },
  ];

  const cardsSvg = cards
    .map((c, idx) => {
      const x = c.col === 0 ? 78 : 390;
      const y = 178 + c.row * 240;
      const w = 294;
      const h = 165;
      return `
        <g>
          <!-- 16:9 Thumbnail Box -->
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#08080B" stroke="#FFFFFF" stroke-opacity="${c.active ? "0.18" : "0.07"}" stroke-width="1"/>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#thumbGlow${idx % 2})"/>
          <!-- Cinema letterbox bars -->
          <rect x="${x}" y="${y}" width="${w}" height="18" fill="#040405"/>
          <rect x="${x}" y="${y + h - 18}" width="${w}" height="18" fill="#040405"/>
          <!-- Subtle scene horizon & focal ring inside thumbnail -->
          <line x1="${x + 24}" y1="${y + h / 2 + 18}" x2="${x + w - 24}" y2="${y + h / 2 + 18}" stroke="${c.hue}" stroke-opacity="0.22" stroke-width="1"/>
          <circle cx="${x + w / 2}" cy="${y + h / 2 - 4}" r="28" stroke="${c.hue}" stroke-opacity="0.35" stroke-width="1.2" fill="#121216" fill-opacity="0.7"/>
          <polygon points="${x + w / 2 - 5},${y + h / 2 - 12} ${x + w / 2 - 5},${y + h / 2 + 4} ${x + w / 2 + 9},${y + h / 2 - 4}" fill="${c.active ? "#FF8800" : "#C7C7CC"}" fill-opacity="0.85"/>
          <!-- Duration badge bottom-right of thumbnail -->
          <rect x="${x + w - 54}" y="${y + h - 38}" width="44" height="18" rx="3" fill="#000000" fill-opacity="0.75"/>
          <text x="${x + w - 32}" y="${y + h - 25}" text-anchor="middle" fill="#D1D1D6" font-family="Consolas, monospace" font-size="10.5">${c.time}</text>

          <!-- Filename & Size -->
          <text x="${x}" y="${y + h + 24}" fill="${c.active ? "#E58515" : "#9E9EA4"}" font-family="Segoe UI, Inter, sans-serif" font-size="13.5" font-weight="${c.active ? "500" : "400"}">${c.title}</text>
          <text x="${x}" y="${y + h + 44}" fill="#6E6E73" font-family="Segoe UI, Inter, sans-serif" font-size="12">${c.size}</text>
        </g>
      `;
    })
    .join("");

  const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <defs>
      <clipPath id="viewportClip">
        <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" rx="10" ry="10"/>
      </clipPath>
      <clipPath id="libraryDrawerClip">
        <rect x="63" y="168" width="644" height="846"/>
      </clipPath>
      <radialGradient id="heroSceneGlow" cx="68.5%" cy="47%" r="48%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.16"/>
        <stop offset="45%" stop-color="#1A1512" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#050507" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="coreRingGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="thumbGlow0" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#09090C" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="thumbGlow1" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#09090C" stop-opacity="1"/>
      </radialGradient>
    </defs>

    ${topBarCleanTextSvg()}

    <g clip-path="url(#viewportClip)">
      <!-- Right side active video viewport (centered in visible area x=708..1910 -> cx=1310) -->
      ${videoSceneSvg(1310, 490, false)}

      <!-- Left Vertical Icon Rail (x=9..62, y=51..1014) -->
      <rect x="9" y="51" width="53" height="964" fill="#181818"/>
      <line x1="62" y1="51" x2="62" y2="1014" stroke="#242424" stroke-width="1"/>

      <!-- Icon 1: Home (y=80) -->
      <path d="M28 83L35.5 76L43 83V91H38V86H33V91H28V83Z" stroke="#9E9EA4" stroke-width="1.4" stroke-linejoin="round"/>
      <!-- Icon 2: Videos folder (y=132) -->
      <rect x="27" y="125" width="17" height="13" rx="2" stroke="#9E9EA4" stroke-width="1.4"/>
      <polygon points="34,129 34,134 38,131.5" fill="#9E9EA4"/>
      <!-- Icon 3: Music folder (y=184) -->
      <rect x="27" y="177" width="17" height="13" rx="2" stroke="#9E9EA4" stroke-width="1.4"/>
      <circle cx="34.5" cy="185.5" r="1.5" fill="#9E9EA4"/>
      <path d="M36 185.5V180.5L39 181.5" stroke="#9E9EA4" stroke-width="1.2"/>
      <!-- Icon 4: Network stream (y=236) -->
      <circle cx="35.5" cy="236" r="2" fill="#9E9EA4"/>
      <path d="M31 232C29 234 29 238 31 240M40 232C42 234 42 238 40 240M28 229C24.5 233 24.5 239 28 243M43 229C46.5 233 46.5 239 43 243" stroke="#9E9EA4" stroke-width="1.3" stroke-linecap="round"/>
      <!-- Icon 5: Playlists (y=288) -->
      <line x1="28" y1="283" x2="43" y2="283" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="28" y1="288" x2="38" y2="288" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="28" y1="293" x2="38" y2="293" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>
      <polygon points="40,287 40,294 45,290.5" fill="#9E9EA4"/>
      <!-- Icon 6: History clock (y=340) -->
      <circle cx="35.5" cy="340" r="7.5" stroke="#9E9EA4" stroke-width="1.4"/>
      <path d="M35.5 336V340.5L38.5 342.5" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>
      <!-- Icon 7: Active Folders Tab (y=392) -->
      <rect x="18" y="374" width="35" height="35" rx="7" fill="#252528"/>
      <path d="M27 386C27 384.895 27.8954 384 29 384H33.2L35.2 386.2H42C43.1046 386.2 44 387.095 44 388.2V397C44 398.105 43.1046 399 42 399H29C27.8954 399 27 398.105 27 397V386Z" fill="#E58515"/>
      <!-- Icon 8: Plus (y=444) -->
      <path d="M35.5 437V451M28.5 444H42.5" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>

      <!-- Main Library Panel (x=62..708, y=51..1014) -->
      <rect x="62" y="51" width="646" height="964" fill="#121212"/>
      <line x1="708" y1="51" x2="708" y2="1014" stroke="#262626" stroke-width="1"/>

      <!-- Panel Top Header (y=51..104) -->
      <line x1="62" y1="104" x2="708" y2="104" stroke="#202022" stroke-width="1"/>
      <path d="M92 78H80M80 78L85 73M80 78L85 83" stroke="#6E6E73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M114 78H126M126 78L121 73M126 78L121 83" stroke="#6E6E73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="150" y="83" fill="#F5F5F7" font-family="Segoe UI, Inter, sans-serif" font-size="15.5" font-weight="600">Folders</text>

      <!-- Grid toggle, Expand, More icons in header right -->
      <rect x="592" y="63" width="30" height="30" rx="6" fill="#232326"/>
      <rect x="600" y="71" width="5.5" height="5.5" stroke="#D1D1D6" stroke-width="1.3"/>
      <rect x="608.5" y="71" width="5.5" height="5.5" stroke="#D1D1D6" stroke-width="1.3"/>
      <rect x="600" y="79.5" width="5.5" height="5.5" stroke="#D1D1D6" stroke-width="1.3"/>
      <rect x="608.5" y="79.5" width="5.5" height="5.5" stroke="#D1D1D6" stroke-width="1.3"/>

      <path d="M636 72H641V77M647 84H642V79M641 72L635 78M642 84L648 78" stroke="#9E9EA4" stroke-width="1.3" stroke-linecap="round"/>
      <circle cx="672" cy="78" r="1.3" fill="#9E9EA4"/>
      <circle cx="677" cy="78" r="1.3" fill="#9E9EA4"/>
      <circle cx="682" cy="78" r="1.3" fill="#9E9EA4"/>

      <!-- Breadcrumb & Play All Row (y=105..168) -->
      <path d="M88 144V131M88 131L83.5 135.5M88 131L92.5 135.5" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="114" y="142" fill="#8E8E93" font-family="Segoe UI, Inter, sans-serif" font-size="13" xml:space="preserve">This PC  →  F:  →  Movies  →  Sci-Fi  →  <tspan fill="#F5F5F7" font-weight="600">Dune Part Two</tspan></text>

      <!-- Play all, Refresh, Open folder -->
      <polygon points="554,133 554,142 561,137.5" fill="#C7C7CC"/>
      <text x="568" y="142" fill="#C7C7CC" font-family="Segoe UI, Inter, sans-serif" font-size="13">Play all</text>
      <circle cx="645" cy="137.5" r="6.5" stroke="#9E9EA4" stroke-width="1.3" stroke-dasharray="32 8"/>
      <rect x="668" y="131.5" width="15" height="12" rx="2" stroke="#9E9EA4" stroke-width="1.3"/>

      <!-- Thumbnail Cards Grid -->
      <g clip-path="url(#libraryDrawerClip)">
        ${cardsSvg}
      </g>

      <!-- Scrollbar thumb -->
      <rect x="696" y="178" width="5" height="510" rx="2.5" fill="#2C2C2E"/>
    </g>

    <rect x="${vpX + 0.5}" y="${vpY + 0.5}" width="${vpW - 1}" height="${vpH - 1}" rx="10" ry="10" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
  </svg>`;

  const buf = await sharp(mainUiPath)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 96 })
    .toBuffer();

  await fs.writeFile(path.join(SCREENSHOTS_DIR, "library.webp"), buf);
}

/**
 * 3. Playback Queue, Bookmarks & Chapters Drawer (`queue-tracks.webp`)
 * Matches the exact VLC Reimagined right-hand Queue drawer layout.
 */
async function generateQueueWebp() {
  const mainUiPath = path.join(ASSETS_DIR, "main ui.png");
  const width = 1919;
  const height = 1079;
  const vpX = 9;
  const vpY = 51;
  const vpW = 1902;
  const vpH = 964;

  const queueItems = [
    { title: "Dune.Part.Two.2024.Ch01.Prologue.UHD.AV1...", dur: "03:42", active: false },
    { title: "Dune.Part.Two.2024.Ch02.Arrakis.Orbit.UHD...", dur: "04:19", active: true },
    { title: "Dune.Part.Two.2024.Ch03.Spice.Fields.UHD...", dur: "04:05", active: false },
    { title: "Dune.Part.Two.2024.Ch04.Sietch.Tabr.UHD...", dur: "03:58", active: false },
    { title: "Dune.Part.Two.2024.Ch05.Desert.Walk.UHD...", dur: "04:52", active: false },
    { title: "Dune.Part.Two.2024.Ch06.Fremen.Council...", dur: "03:40", active: false },
    { title: "Dune.Part.Two.2024.Ch07.Paul.MuadDib.UHD...", dur: "04:44", active: false },
    { title: "Dune.Part.Two.2024.Ch08.Giedi.Arena.UHD...", dur: "04:33", active: false },
    { title: "Dune.Part.Two.2024.Ch09.Southern.Temple...", dur: "04:41", active: false },
    { title: "Dune.Part.Two.2024.Ch10.Final.Duel.UHD...", dur: "03:44", active: false },
  ];

  const queueRowsSvg = queueItems
    .map((item, i) => {
      const y = 160 + i * 38;
      return `
        <g>
          ${
            item.active
              ? `<polygon points="1523,${y - 10} 1523,${y} 1532,${y - 5}" fill="#E58515"/>`
              : `<rect x="1520" y="${y - 12}" width="13" height="13" rx="2.5" stroke="#6E6E73" stroke-width="1.2"/>
                 <polygon points="1525,${y - 8} 1525,${y - 3} 1529,${y - 5.5}" fill="#6E6E73"/>`
          }
          <text x="1544" y="${y}" fill="${item.active ? "#E58515" : "#C7C7CC"}" font-family="Segoe UI, Inter, sans-serif" font-size="13" font-weight="${item.active ? "500" : "400"}">${item.title}</text>
          <text x="1888" y="${y}" text-anchor="end" fill="#7A7A80" font-family="Segoe UI, Inter, sans-serif" font-size="12">${item.dur}</text>
        </g>
      `;
    })
    .join("");

  const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <defs>
      <clipPath id="viewportClip">
        <rect x="${vpX}" y="${vpY}" width="${vpW}" height="${vpH}" rx="10" ry="10"/>
      </clipPath>
      <radialGradient id="heroSceneGlow" cx="40%" cy="47%" r="48%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.16"/>
        <stop offset="45%" stop-color="#1A1512" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#050507" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="coreRingGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
      </radialGradient>
    </defs>

    ${topBarCleanTextSvg()}

    <g clip-path="url(#viewportClip)">
      <!-- Left side active video viewport (centered in visible area x=9..1498 -> cx=754) -->
      ${videoSceneSvg(754, 490, true)}

      <!-- Right Queue Drawer (x=1498..1910, y=51..1014) -->
      <rect x="1498" y="51" width="412" height="964" fill="#121212"/>
      <line x1="1498" y1="51" x2="1498" y2="1014" stroke="#242424" stroke-width="1"/>

      <!-- 3-Tab Header: Queue | Bookmarks | Chapters (y=51..96) -->
      <line x1="1498" y1="96" x2="1910" y2="96" stroke="#222224" stroke-width="1"/>

      <!-- Tab 1: Queue (active with orange bottom bar) -->
      <line x1="1540" y1="70" x2="1552" y2="70" stroke="#F5F5F7" stroke-width="1.3" stroke-linecap="round"/>
      <line x1="1540" y1="74" x2="1552" y2="74" stroke="#F5F5F7" stroke-width="1.3" stroke-linecap="round"/>
      <line x1="1540" y1="78" x2="1548" y2="78" stroke="#F5F5F7" stroke-width="1.3" stroke-linecap="round"/>
      <text x="1559" y="78" fill="#F5F5F7" font-family="Segoe UI, Inter, sans-serif" font-size="12.5" font-weight="500">Queue</text>
      <rect x="1498" y="94" width="137" height="2.5" fill="#E58515"/>

      <!-- Tab 2: Bookmarks -->
      <path d="M1664 67H1673V81L1668.5 77.5L1664 81V67Z" stroke="#8E8E93" stroke-width="1.3" stroke-linejoin="round"/>
      <text x="1680" y="78" fill="#8E8E93" font-family="Segoe UI, Inter, sans-serif" font-size="12.5">Bookmarks</text>

      <!-- Tab 3: Chapters -->
      <line x1="1798" y1="70" x2="1810" y2="70" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round"/>
      <line x1="1798" y1="74" x2="1810" y2="74" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round"/>
      <line x1="1798" y1="78" x2="1810" y2="78" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round"/>
      <text x="1817" y="78" fill="#8E8E93" font-family="Segoe UI, Inter, sans-serif" font-size="12.5">Chapters</text>

      <!-- Sub-header action row (y=97..142) -->
      <text x="1520" y="124" fill="#8E8E93" font-family="Segoe UI, Inter, sans-serif" font-size="12.5">10 items · 42 min 18 s</text>

      <!-- Action icons: Shuffle, Repeat, Trash, Plus -->
      <path d="M1750 116H1755L1763 124H1768M1768 116H1763L1755 124H1750" stroke="#9E9EA4" stroke-width="1.3" stroke-linecap="round"/>
      <rect x="1788" y="115" width="14" height="10" rx="2.5" stroke="#9E9EA4" stroke-width="1.3"/>
      <rect x="1828" y="115" width="11" height="12" rx="1.5" stroke="#9E9EA4" stroke-width="1.3"/>
      <line x1="1826" y1="115" x2="1841" y2="115" stroke="#9E9EA4" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M1869 114V126M1863 120H1875" stroke="#9E9EA4" stroke-width="1.4" stroke-linecap="round"/>

      <!-- Queue Rows -->
      ${queueRowsSvg}
    </g>

    <rect x="${vpX + 0.5}" y="${vpY + 0.5}" width="${vpW - 1}" height="${vpH - 1}" rx="10" ry="10" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>

    <!-- Highlight the bottom-right Queue button in orange just like the screenshot -->
    <rect x="1871" y="1038" width="24" height="24" fill="#1A1A1A"/>
    <circle cx="1876" cy="1044" r="1.3" fill="#E58515"/>
    <circle cx="1876" cy="1049" r="1.3" fill="#E58515"/>
    <circle cx="1876" cy="1054" r="1.3" fill="#E58515"/>
    <line x1="1880" y1="1044" x2="1891" y2="1044" stroke="#E58515" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="1880" y1="1049" x2="1891" y2="1049" stroke="#E58515" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="1880" y1="1054" x2="1891" y2="1054" stroke="#E58515" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  const buf = await sharp(mainUiPath)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 96 })
    .toBuffer();

  await fs.writeFile(path.join(SCREENSHOTS_DIR, "queue-tracks.webp"), buf);
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
  await generateLibraryWebp();
  await generateQueueWebp();
  await frameDialogScreenshot("settings.png", "settings.webp");
  await frameDialogScreenshot("Audio effects.png", "audio-effects.webp");
  await frameDialogScreenshot("Subtitle slider.png", "subtitle-timeline.webp");

  console.log("Successfully generated all 6 screenshots (player, library, queue-tracks, settings, audio-effects, subtitle-timeline).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
