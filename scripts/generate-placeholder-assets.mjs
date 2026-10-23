import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SCREENSHOTS_DIR = path.join(PUBLIC_DIR, "screenshots");

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none">
  <defs>
    <linearGradient id="tileBg" x1="512" y1="0" x2="512" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1E1E26"/>
      <stop offset="100%" stop-color="#0E0E12"/>
    </linearGradient>
    <radialGradient id="coneGlow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#FF8800" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="coneBody" x1="512" y1="180" x2="512" y2="780" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFA033"/>
      <stop offset="55%" stop-color="#FF8800"/>
      <stop offset="100%" stop-color="#D96B00"/>
    </linearGradient>
    <linearGradient id="basePlate" x1="212" y1="730" x2="812" y2="830" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF961F"/>
      <stop offset="100%" stop-color="#CC6200"/>
    </linearGradient>
  </defs>

  <!-- Dark rounded charcoal tile -->
  <rect x="24" y="24" width="976" height="976" rx="224" fill="url(#tileBg)"/>
  <rect x="26" y="26" width="972" height="972" rx="222" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="4"/>

  <!-- Ambient orange glow -->
  <circle cx="512" cy="500" r="380" fill="url(#coneGlow)"/>

  <!-- Traffic cone base shadow -->
  <ellipse cx="512" cy="825" rx="290" ry="34" fill="#000000" fill-opacity="0.55"/>

  <!-- Cone body -->
  <path d="M466 210C473 190 491 178 512 178C533 178 551 190 558 210L730 740H294L466 210Z" fill="url(#coneBody)"/>

  <!-- Reflective white stripes (clipped to cone silhouette) -->
  <path d="M423 342L601 342L632 438L392 438L423 342Z" fill="#F5F5F7" fill-opacity="0.94"/>
  <path d="M366 518L658 518L689 614L335 614L366 518Z" fill="#F5F5F7" fill-opacity="0.94"/>

  <!-- Base flange -->
  <rect x="224" y="726" width="576" height="84" rx="42" fill="url(#basePlate)"/>
  <rect x="226" y="728" width="572" height="80" rx="40" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="2"/>
</svg>`;

function buildOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
    <defs>
      <radialGradient id="ogGlow" cx="78%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#FF8800" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#16161C"/>
        <stop offset="100%" stop-color="#0E0E12"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#0E0E12"/>
    <rect x="32" y="32" width="1136" height="566" rx="28" fill="url(#cardGrad)" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="920" cy="315" r="420" fill="url(#ogGlow)"/>

    <!-- Mini cone badge -->
    <g transform="translate(88, 96) scale(0.11)">
      <rect x="24" y="24" width="976" height="976" rx="224" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="16"/>
      <path d="M466 210C473 190 491 178 512 178C533 178 551 190 558 210L730 740H294L466 210Z" fill="#FF8800"/>
      <path d="M423 342L601 342L632 438L392 438L423 342Z" fill="#F5F5F7"/>
      <path d="M366 518L658 518L689 614L335 614L366 518Z" fill="#F5F5F7"/>
      <rect x="224" y="726" width="576" height="84" rx="42" fill="#E07000"/>
    </g>

    <text x="224" y="162" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="30" font-weight="600" letter-spacing="-0.5">VLC Reimagined</text>
    <text x="88" y="305" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="60" font-weight="700" letter-spacing="-2">The player you know.</text>
    <text x="88" y="380" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="60" font-weight="700" letter-spacing="-2">The interface you wanted.</text>
    <text x="88" y="452" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="24" font-weight="400">Every format VLC 4 plays, rebuilt with a quiet, dark desktop UI for Windows.</text>

    <rect x="88" y="496" width="186" height="44" rx="12" fill="#FF8800"/>
    <text x="181" y="524" text-anchor="middle" fill="#0E0E12" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="700">Windows 10 / 11</text>
    <text x="300" y="524" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">64-bit · GPLv2+ · v4.0.0</text>
  </svg>`;
}

function buildPlayerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2560" height="1440" viewBox="0 0 2560 1440" fill="none">
    <defs>
      <radialGradient id="sceneGlow" cx="50%" cy="44%" r="52%">
        <stop offset="0%" stop-color="#FF8800" stop-opacity="0.16"/>
        <stop offset="55%" stop-color="#1E1E26" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#0E0E12" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="hudBg" x1="0" y1="1180" x2="0" y2="1380" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#1E1E26" stop-opacity="0.92"/>
        <stop offset="100%" stop-color="#16161C" stop-opacity="0.96"/>
      </linearGradient>
    </defs>

    <!-- Video canvas -->
    <rect width="2560" height="1440" fill="#0E0E12"/>
    <rect width="2560" height="1440" fill="url(#sceneGlow)"/>

    <!-- Subtle cinematic letterbox & grid lines -->
    <rect x="0" y="0" width="2560" height="110" fill="#09090C"/>
    <rect x="0" y="1330" width="2560" height="110" fill="#09090C"/>
    <line x1="0" y1="110" x2="2560" y2="110" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="2"/>
    <line x1="0" y1="1330" x2="2560" y2="1330" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="2"/>

    <!-- Top overlay bar -->
    <rect x="48" y="36" width="2464" height="64" rx="16" fill="#16161C" fill-opacity="0.85" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="88" cy="68" r="10" fill="#FF8800"/>
    <text x="116" y="75" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="600">Dune_Part_Two_2024_2160p_AV1_10bit.mkv</text>
    <rect x="615" y="50" width="84" height="36" rx="8" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="657" y="74" text-anchor="middle" fill="#FF8800" font-family="Consolas, monospace" font-size="17" font-weight="600">4K AV1</text>
    <rect x="712" y="50" width="112" height="36" rx="8" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="768" y="74" text-anchor="middle" fill="#A1A1AA" font-family="Consolas, monospace" font-size="17">TrueHD 7.1</text>
    <text x="2470" y="74" text-anchor="end" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">Direct3D11 · 23.976 fps</text>

    <!-- Center subtle visual focal motif -->
    <circle cx="1280" cy="660" r="240" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="2"/>
    <circle cx="1280" cy="660" r="150" stroke="#FF8800" stroke-opacity="0.18" stroke-width="2"/>
    <circle cx="1280" cy="660" r="64" fill="#16161C" stroke="#FF8800" stroke-opacity="0.5" stroke-width="2"/>
    <polygon points="1266,634 1266,686 1308,660" fill="#FF8800"/>

    <!-- Subtitle preview line -->
    <rect x="820" y="1060" width="920" height="58" rx="12" fill="#0E0E12" fill-opacity="0.78" stroke="#FFFFFF" stroke-opacity="0.06"/>
    <text x="1280" y="1097" text-anchor="middle" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="500">“Dreams make good stories, but everything important happens when we’re awake.”</text>

    <!-- Floating Bottom Transport HUD -->
    <rect x="360" y="1176" width="1840" height="196" rx="28" fill="url(#hudBg)" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="2"/>

    <!-- Scrubber timeline -->
    <text x="416" y="1234" fill="#F5F5F7" font-family="Consolas, monospace" font-size="20">01:14:28</text>
    <rect x="536" y="1220" width="1488" height="12" rx="6" fill="#0E0E12"/>
    <rect x="536" y="1220" width="840" height="12" rx="6" fill="#FF8800"/>
    <!-- Chapter ticks -->
    <rect x="760" y="1220" width="3" height="12" fill="#0E0E12"/>
    <rect x="1080" y="1220" width="3" height="12" fill="#0E0E12"/>
    <rect x="1520" y="1220" width="3" height="12" fill="#FFFFFF" fill-opacity="0.25"/>
    <rect x="1810" y="1220" width="3" height="12" fill="#FFFFFF" fill-opacity="0.25"/>
    <circle cx="1376" cy="1226" r="13" fill="#F5F5F7" stroke="#FF8800" stroke-width="5"/>
    <text x="2048" y="1234" fill="#A1A1AA" font-family="Consolas, monospace" font-size="20">02:45:52</text>

    <!-- Transport buttons & controls -->
    <rect x="416" y="1276" width="160" height="52" rx="12" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="496" y="1309" text-anchor="middle" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="500">Ch. 08 · Arrakis</text>

    <!-- Play/Pause center group -->
    <circle cx="1188" cy="1302" r="26" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <circle cx="1280" cy="1302" r="34" fill="#FF8800"/>
    <rect x="1269" y="1288" width="7" height="28" rx="2" fill="#0E0E12"/>
    <rect x="1284" y="1288" width="7" height="28" rx="2" fill="#0E0E12"/>
    <circle cx="1372" cy="1302" r="26" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>

    <!-- Right side pills (Audio, Subtitles, Equalizer, Volume) -->
    <rect x="1690" y="1276" width="110" height="52" rx="12" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="1745" y="1309" text-anchor="middle" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="500">Audio</text>
    <rect x="1814" y="1276" width="120" height="52" rx="12" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="1874" y="1309" text-anchor="middle" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="500">Subtitles</text>
    <rect x="1958" y="1296" width="140" height="10" rx="5" fill="#0E0E12"/>
    <rect x="1958" y="1296" width="104" height="10" rx="5" fill="#F5F5F7"/>
    <text x="2116" y="1308" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">85%</text>
  </svg>`;
}

function buildLibrarySvg() {
  const cards = [
    { x: 460, y: 240, title: "Blade Runner 2049", meta: "2h 44m · 4K HEVC · HDR10", progress: 0.72 },
    { x: 1120, y: 240, title: "Oppenheimer (2023)", meta: "3h 00m · 4K AV1 · IMAX", progress: 0.45 },
    { x: 1780, y: 240, title: "Interstellar Remux", meta: "2h 49m · 1080p MKV · DTS-HD", progress: 0.9 },
    { x: 460, y: 740, title: "Severance — S02E01", meta: "58m · 2160p WEB-DL · EAC3", progress: 0.25 },
    { x: 1120, y: 740, title: "Andor — S01E10", meta: "46m · 2160p HEVC · Atmos", progress: 1.0 },
    { x: 1780, y: 740, title: "Spider-Verse Mastering", meta: "2h 20m · 4K ProRes · FLAC", progress: 0.12 },
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="2560" height="1440" viewBox="0 0 2560 1440" fill="none">
    <rect width="2560" height="1440" fill="#0E0E12"/>

    <!-- Left Navigation Sidebar -->
    <rect x="0" y="0" width="380" height="1440" fill="#16161C"/>
    <line x1="380" y1="0" x2="380" y2="1440" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="64" cy="72" r="14" fill="#FF8800"/>
    <text x="96" y="80" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="700">VLC Reimagined</text>

    <text x="48" y="170" fill="#A1A1AA" font-family="Consolas, monospace" font-size="16" letter-spacing="2">LIBRARY</text>
    <rect x="32" y="196" width="316" height="58" rx="14" fill="#1E1E26" stroke="#FF8800" stroke-opacity="0.4" stroke-width="2"/>
    <circle cx="68" cy="225" r="7" fill="#FF8800"/>
    <text x="94" y="232" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="21" font-weight="600">Videos</text>
    <text x="316" y="232" text-anchor="end" fill="#FF8800" font-family="Consolas, monospace" font-size="18">142</text>

    <text x="94" y="308" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="21" font-weight="500">Music</text>
    <text x="316" y="308" text-anchor="end" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">1,284</text>

    <text x="94" y="378" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="21" font-weight="500">Playlists</text>
    <text x="316" y="378" text-anchor="end" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">18</text>

    <text x="94" y="448" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="21" font-weight="500">Folders</text>
    <text x="316" y="448" text-anchor="end" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">6</text>

    <!-- Header bar -->
    <text x="460" y="110" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="42" font-weight="700" letter-spacing="-1">Videos</text>
    <rect x="1840" y="64" width="560" height="60" rx="16" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="1876" y="101" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="20">Filter by title, codec, or resolution...</text>

    <!-- Media Cards Grid -->
    ${cards
      .map(
        (c) => `
      <g>
        <rect x="${c.x}" y="${c.y}" width="620" height="440" rx="22" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
        <rect x="${c.x + 16}" y="${c.y + 16}" width="588" height="310" rx="14" fill="#1E1E26"/>
        <circle cx="${c.x + 310}" cy="${c.y + 171}" r="34" fill="#0E0E12" fill-opacity="0.75" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="2"/>
        <polygon points="${c.x + 302},${c.y + 156} ${c.x + 302},${c.y + 186} ${c.x + 326},${c.y + 171}" fill="#FF8800"/>
        <rect x="${c.x + 16}" y="${c.y + 318}" width="588" height="8" rx="4" fill="#0E0E12"/>
        <rect x="${c.x + 16}" y="${c.y + 318}" width="${Math.round(588 * c.progress)}" height="8" rx="4" fill="#FF8800"/>
        <text x="${c.x + 28}" y="${c.y + 372}" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="24" font-weight="600">${c.title}</text>
        <text x="${c.x + 28}" y="${c.y + 408}" fill="#A1A1AA" font-family="Consolas, monospace" font-size="18">${c.meta}</text>
      </g>
    `
      )
      .join("")}
  </svg>`;
}

function buildQueueTracksSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2560" height="1440" viewBox="0 0 2560 1440" fill="none">
    <rect width="2560" height="1440" fill="#0E0E12"/>

    <!-- Left active video canvas -->
    <rect x="48" y="48" width="1640" height="1344" rx="24" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="108" y="120" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="28" font-weight="600">Now Playing · Akira_1988_Remastered_2160p.mkv</text>
    <text x="108" y="160" fill="#A1A1AA" font-family="Consolas, monospace" font-size="19">HEVC 10-bit · Japanese FLAC 5.1 (24-bit / 96 kHz)</text>

    <!-- Audio & Subtitle Track Selector floating card -->
    <rect x="108" y="760" width="720" height="560" rx="20" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="2"/>
    <text x="152" y="824" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="24" font-weight="700">Audio &amp; Subtitle Tracks</text>

    <text x="152" y="880" fill="#FF8800" font-family="Consolas, monospace" font-size="16">AUDIO STREAMS</text>
    <rect x="152" y="900" width="632" height="58" rx="12" fill="#16161C" stroke="#FF8800" stroke-opacity="0.6" stroke-width="2"/>
    <text x="180" y="936" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="20" font-weight="600">Track 1 — Japanese (FLAC 5.1 · 4,608 kbps)</text>
    <rect x="152" y="970" width="632" height="58" rx="12" fill="#16161C"/>
    <text x="180" y="1006" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="20">Track 2 — English Dub (TrueHD 5.1)</text>

    <text x="152" y="1084" fill="#FF8800" font-family="Consolas, monospace" font-size="16">SUBTITLES</text>
    <rect x="152" y="1104" width="632" height="58" rx="12" fill="#16161C" stroke="#FF8800" stroke-opacity="0.6" stroke-width="2"/>
    <text x="180" y="1140" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="20" font-weight="600">English — Full Dialogue (ASS Styled)</text>
    <rect x="152" y="1174" width="632" height="58" rx="12" fill="#16161C"/>
    <text x="180" y="1210" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="20">Disabled</text>

    <!-- Right-hand Playback Queue Drawer -->
    <rect x="1728" y="48" width="784" height="1344" rx="24" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="1784" y="124" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="30" font-weight="700">Playback Queue</text>
    <text x="1784" y="164" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="19">4 items · Drag-free up/down ordering</text>

    <!-- Queue items with Up/Down reorder buttons -->
    ${[
      { y: 220, active: true, title: "01. Akira (1988) Remastered", dur: "02:04:32" },
      { y: 360, active: false, title: "02. Ghost in the Shell (1995) 4K", dur: "01:22:50" },
      { y: 500, active: false, title: "03. Paprika (2006) Blu-ray Remux", dur: "01:30:18" },
      { y: 640, active: false, title: "04. Memories (1995) Anthology", dur: "01:53:40" },
    ]
      .map(
        (q) => `
      <g>
        <rect x="1776" y="${q.y}" width="688" height="116" rx="16" fill="#1E1E26" stroke="${
          q.active ? "#FF8800" : "#FFFFFF"
        }" stroke-opacity="${q.active ? "0.65" : "0.08"}" stroke-width="2"/>
        <text x="1812" y="${q.y + 52}" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="600">${q.title}</text>
        <text x="1812" y="${q.y + 88}" fill="${
          q.active ? "#FF8800" : "#A1A1AA"
        }" font-family="Consolas, monospace" font-size="17">${
          q.active ? "NOW PLAYING · " : ""
        }${q.dur}</text>
        <rect x="2332" y="${q.y + 34}" width="48" height="48" rx="10" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
        <text x="2356" y="${q.y + 66}" text-anchor="middle" fill="#F5F5F7" font-family="Consolas, monospace" font-size="22">↑</text>
        <rect x="2392" y="${q.y + 34}" width="48" height="48" rx="10" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08"/>
        <text x="2416" y="${q.y + 66}" text-anchor="middle" fill="#F5F5F7" font-family="Consolas, monospace" font-size="22">↓</text>
      </g>
    `
      )
      .join("")}
  </svg>`;
}

function buildSettingsSvg() {
  const bands = [
    { freq: "31Hz", val: 0.35 },
    { freq: "63Hz", val: 0.28 },
    { freq: "125Hz", val: 0.42 },
    { freq: "250Hz", val: 0.5 },
    { freq: "500Hz", val: 0.54 },
    { freq: "1kHz", val: 0.48 },
    { freq: "2kHz", val: 0.38 },
    { freq: "4kHz", val: 0.3 },
    { freq: "8kHz", val: 0.25 },
    { freq: "16kHz", val: 0.22 },
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="2560" height="1440" viewBox="0 0 2560 1440" fill="none">
    <rect width="2560" height="1440" fill="#0E0E12"/>

    <rect x="140" y="96" width="2280" height="1248" rx="28" fill="#16161C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="220" y="190" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="38" font-weight="700" letter-spacing="-1">Audio, Video &amp; Synchronization</text>
    <text x="220" y="236" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="21">Real-time 10-band equalizer, subtitle offset timeline, and updater settings.</text>

    <!-- 10-Band Parametric Equalizer Card -->
    <rect x="220" y="288" width="1280" height="580" rx="22" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="276" y="356" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="600">10-Band Equalizer</text>
    <rect x="1260" y="322" width="184" height="46" rx="10" fill="#16161C" stroke="#FF8800" stroke-opacity="0.4"/>
    <text x="1352" y="352" text-anchor="middle" fill="#FF8800" font-family="Consolas, monospace" font-size="18">Preset: Cinema</text>

    ${bands
      .map((b, i) => {
        const bx = 310 + i * 114;
        const knobY = 410 + Math.round(b.val * 320);
        return `
        <g>
          <rect x="${bx - 4}" y="410" width="8" height="320" rx="4" fill="#0E0E12"/>
          <rect x="${bx - 4}" y="${knobY}" width="8" height="${730 - knobY}" rx="4" fill="#FF8800"/>
          <circle cx="${bx}" cy="${knobY}" r="14" fill="#F5F5F7" stroke="#FF8800" stroke-width="5"/>
          <text x="${bx}" y="780" text-anchor="middle" fill="#A1A1AA" font-family="Consolas, monospace" font-size="16">${b.freq}</text>
        </g>
      `;
      })
      .join("")}

    <!-- Subtitle Sync Timeline Card -->
    <rect x="220" y="908" width="1280" height="360" rx="22" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="276" y="976" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="600">Subtitle Sync Timeline</text>
    <text x="1444" y="976" text-anchor="end" fill="#FF8800" font-family="Consolas, monospace" font-size="24" font-weight="600">+150 ms</text>
    <rect x="276" y="1030" width="1168" height="96" rx="14" fill="#0E0E12" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <line x1="860" y1="1030" x2="860" y2="1126" stroke="#FF8800" stroke-width="4"/>
    <rect x="890" y="1054" width="280" height="48" rx="8" fill="#FF8800" fill-opacity="0.2" stroke="#FF8800"/>
    <text x="1030" y="1085" text-anchor="middle" fill="#F5F5F7" font-family="Consolas, monospace" font-size="17">Dialogue Block #42</text>
    <text x="276" y="1196" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="20">Nudge subtitles in 50 ms increments or drag waveform markers directly.</text>

    <!-- Application & Updater Preferences Card -->
    <rect x="1548" y="288" width="792" height="980" rx="22" fill="#1E1E26" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="1604" y="356" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="600">Application Preferences</text>

    <rect x="1604" y="408" width="680" height="120" rx="16" fill="#16161C"/>
    <text x="1640" y="460" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="600">Automatic Daily Update Check</text>
    <text x="1640" y="496" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="18">Checks win64.txt once a day over HTTPS</text>
    <rect x="2188" y="448" width="64" height="36" rx="18" fill="#FF8800"/>
    <circle cx="2234" cy="466" r="13" fill="#0E0E12"/>

    <rect x="1604" y="556" width="680" height="120" rx="16" fill="#16161C"/>
    <text x="1640" y="608" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="600">Hardware Decoding (Direct3D 11)</text>
    <text x="1640" y="644" fill="#A1A1AA" font-family="Inter, Segoe UI, sans-serif" font-size="18">Zero-copy GPU surface rendering for HEVC &amp; AV1</text>
    <rect x="2188" y="596" width="64" height="36" rx="18" fill="#FF8800"/>
    <circle cx="2234" cy="614" r="13" fill="#0E0E12"/>

    <rect x="1604" y="704" width="680" height="120" rx="16" fill="#16161C"/>
    <text x="1640" y="756" fill="#F5F5F7" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="600">Isolated Profile Directory</text>
    <text x="1640" y="792" fill="#A1A1AA" font-family="Consolas, monospace" font-size="17">%AppData%\\VLC Reimagined</text>
  </svg>`;
}

async function main() {
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  // 1. Write public/logo.svg and public/logo.png (1024x1024)
  await fs.writeFile(path.join(PUBLIC_DIR, "logo.svg"), logoSvg, "utf8");
  await sharp(Buffer.from(logoSvg))
    .resize(1024, 1024)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, "logo.png"));

  // 2. Write public/og.png (1200x630)
  await sharp(Buffer.from(buildOgSvg()))
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, "og.png"));

  // 3. Write 4 16:9 (2560x1440) WebP screenshots
  const shots = [
    { name: "player.webp", svg: buildPlayerSvg() },
    { name: "library.webp", svg: buildLibrarySvg() },
    { name: "queue-tracks.webp", svg: buildQueueTracksSvg() },
    { name: "settings.webp", svg: buildSettingsSvg() },
  ];

  for (const shot of shots) {
    await sharp(Buffer.from(shot.svg))
      .resize(2560, 1440)
      .webp({ quality: 92 })
      .toFile(path.join(SCREENSHOTS_DIR, shot.name));
  }

  console.log("Generated logo.svg, logo.png, og.png, and 4 2560x1440 .webp screenshots.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
