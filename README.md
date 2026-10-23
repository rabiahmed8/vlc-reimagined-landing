# VLC Reimagined — Official Landing & Download Website

Static-ready Next.js (App Router + TypeScript + Tailwind CSS) marketing and distribution website for **VLC Reimagined** (Windows 10/11 64-bit).

## Quick Start

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site locally.

To build the static production bundle (`out/` directory):

```bash
npm run build
```

---

## Updating Version Numbers, File Sizes, Checksums & Download URLs

All release metadata is centralized so you never have to hunt through components:

1. **[`site.config.ts`](./site.config.ts)** — Single source of truth for:
   - `version` (e.g. `"4.0.0"`)
   - `releaseDate` & `releaseDateIso`
   - `domain` (used for canonical SEO metadata, `sitemap.xml`, `robots.txt`, and OpenGraph URLs)
   - `downloads.installer` (`.exe` filename, size, download URL, SHA-256 checksum)
   - `downloads.portable` (`.zip` filename, size, download URL, SHA-256 checksum)
   - `links` (GitHub repository, releases, bug tracker, contact email)
2. **[`content/site.ts`](./content/site.ts)** — Exports `INSTALLER_DOWNLOAD_URL`, `PORTABLE_DOWNLOAD_URL`, and structured section copy (hero, features, screenshot gallery captions, changelog bullets, and FAQ items).
3. **[`public/update/win64.txt`](./public/update/win64.txt)** — Plain-text manifest read over HTTPS by the in-app daily updater. Keep its three lines updated on every release:
   ```text
   4.0.0
   https://vlcreimagined.org/downloads/VLC-Reimagined-4.0.0-win64-setup.exe
   Initial public release of VLC Reimagined.
   ```

---

## Replacing Brand & Screenshot Assets

Drop your final assets into `public/` using these exact filenames:

| Path | Dimensions | Description |
| :--- | :--- | :--- |
| `public/logo.png` | `1024×1024` | Traffic-cone mark on dark rounded tile (PNG) |
| `public/logo.svg` | Vector `1:1` | Vector version of the logo mark |
| `public/og.png` | `1200×630` | Social share / OpenGraph preview card |
| `public/screenshots/player.webp` | `2560×1440` (16:9) | Main player window (used in Hero + Gallery #1) |
| `public/screenshots/library.webp` | `2560×1440` (16:9) | Media library view (Videos, Music, Playlists, Folders) |
| `public/screenshots/queue-tracks.webp` | `2560×1440` (16:9) | Playback queue & audio/subtitle track panel |
| `public/screenshots/settings.webp` | `2560×1440` (16:9) | Settings, 10-band equalizer, and subtitle sync timeline |

---

## Deployment (Vercel / Cloudflare Pages / GitHub Pages)

The project is configured with `output: 'export'` in [`next.config.mjs`](./next.config.mjs) and generates a 100% static bundle in `out/` with zero server runtime dependencies.

- **Vercel:** Import the repository with framework preset **Next.js**. Build command: `npm run build`.
- **Cloudflare Pages:** Set build command to `npm run build` and build output directory to `out`.
- **Binary Hosting:** Either place `.exe` and `.zip` binaries in `public/downloads/` (if within host file-size limits) or point `downloads.installer.url` and `downloads.portable.url` in `site.config.ts` directly to your GitHub Releases asset URLs.
