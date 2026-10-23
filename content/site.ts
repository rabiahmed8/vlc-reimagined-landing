import { SITE_CONFIG } from "@/site.config";

export { SITE_CONFIG };

export const INSTALLER_DOWNLOAD_URL = SITE_CONFIG.downloads.installer.url;
export const PORTABLE_DOWNLOAD_URL = SITE_CONFIG.downloads.portable.url;

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "layout" | "library" | "list-video" | "sliders" | "maximize" | "layers";
}

export interface ScreenshotItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

export const SITE_CONTENT = {
  nav: [
    { label: "Features", href: "#features" },
    { label: "Screenshots", href: "#screenshots" },
    { label: "What's new", href: "#changelog" },
    { label: "Downloads", href: "#downloads" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavItem[],

  hero: {
    badge: `Release v${SITE_CONFIG.version} for Windows`,
    headline: "The player you know. The interface you wanted.",
    subline:
      "Every codec and stream VLC 4 plays, rebuilt with a quiet, dark desktop interface designed for modern Windows workspaces.",
    metaLine: `${SITE_CONFIG.osRequirement} · ${SITE_CONFIG.architecture} · Free & open source · v${SITE_CONFIG.version}`,
    heroScreenshot: {
      src: "/screenshots/player.webp",
      alt: "VLC Reimagined main player window showing the dark top bar, inset rounded video viewport, and bottom transport bar",
      width: 1919,
      height: 1079,
    },
  },

  featuresSection: {
    eyebrow: "Built on libVLC 4",
    heading: "Everything plays. Finally, it looks the part.",
    subline:
      "No codec packs, no configuration wizards, and no legacy chrome. Just fast local playback and clean controls.",
    items: [
      {
        id: "player-ui",
        title: "Rebuilt dark interface",
        description:
          "A calm, low-contrast chrome with translucent transport controls that fade out the moment playback begins.",
        icon: "layout",
      },
      {
        id: "media-library",
        title: "Structured media library",
        description:
          "Browse local collections with dedicated tabs for videos, music, playlists, and direct folder trees.",
        icon: "library",
      },
      {
        id: "queue-tracks",
        title: "Queue and track inspector",
        description:
          "Reorder upcoming items with instant up/down controls and switch audio or subtitle tracks from a unified side panel.",
        icon: "list-video",
      },
      {
        id: "effects-sync",
        title: "Precision audio, video, and sync",
        description:
          "Fine-tune the 10-band equalizer, video adjustments, and a visual subtitle sync timeline without leaving the player.",
        icon: "sliders",
      },
      {
        id: "mini-fullscreen",
        title: "Mini player and distraction-free fullscreen",
        description:
          "Pin a borderless picture-in-picture window to the corner of your screen or enter an edge-to-edge cinema mode.",
        icon: "maximize",
      },
      {
        id: "side-by-side",
        title: "Coexists with official VLC",
        description:
          "Installs into its own directory with isolated preferences and file associations so you can keep both versions installed.",
        icon: "layers",
      },
    ] satisfies FeatureItem[],
  },

  screenshotsSection: {
    eyebrow: "Interface tour",
    heading: "Designed to stay out of the way.",
    subline:
      "Consistent dark surfaces, crisp typography, and keyboard-first panels across every view. Select any frame to inspect at full resolution.",
    items: [
      {
        id: "player",
        title: "Player View",
        caption:
          "Clean top bar with quick folder access, inset rounded video viewport, chapter-marked seekbar, and classic wedge volume control.",
        src: "/screenshots/player.webp",
        alt: "VLC Reimagined main player view with dark top bar, rounded video viewport, and transport controls",
        width: 1919,
        height: 1079,
        aspect: "16 / 9",
      },
      {
        id: "library",
        title: "Media Library & Folders",
        caption:
          "Slide-out sidebar with quick-access tabs for Videos, Music, Network, Playlists, History, and a two-column folder thumbnail browser.",
        src: "/screenshots/library.webp",
        alt: "VLC Reimagined Media Library and Folders drawer open alongside video playback",
        width: 1919,
        height: 1079,
        aspect: "16 / 9",
      },
      {
        id: "queue-tracks",
        title: "Queue, Bookmarks & Chapters",
        caption:
          "Right-hand drawer combining the active playback queue, shuffle and repeat controls, saved bookmarks, and chapter navigation.",
        src: "/screenshots/queue-tracks.webp",
        alt: "VLC Reimagined right-hand Queue, Bookmarks, and Chapters drawer",
        width: 1919,
        height: 1079,
        aspect: "16 / 9",
      },
      {
        id: "settings",
        title: "Global Settings",
        caption:
          "Streamlined preferences for theme selection, custom accent colors, interface scaling, and automatic daily update checks.",
        src: "/screenshots/settings.webp",
        alt: "VLC Reimagined Global Settings window showing Appearance, Startup, Diagnostics, and All settings",
        width: 1920,
        height: 1080,
        aspect: "16 / 9",
      },
      {
        id: "audio-effects",
        title: "Audio Effects & Equalizer",
        caption:
          "10-band parametric equalizer with preamp gain, custom presets, two-pass filtering, spatial audio, and stereo widening.",
        src: "/screenshots/audio-effects.webp",
        alt: "VLC Reimagined Audio Defaults and 10-band Equalizer panel",
        width: 1920,
        height: 1080,
        aspect: "16 / 9",
      },
      {
        id: "subtitle-timeline",
        title: "Subtitle Sync Timeline",
        caption:
          "Interactive visual timeline to drag SRT or WebVTT cues into alignment and fine-tune subtitle delay in milliseconds.",
        src: "/screenshots/subtitle-timeline.webp",
        alt: "VLC Reimagined Subtitle timeline synchronization window",
        width: 1920,
        height: 1080,
        aspect: "16 / 9",
      },
    ] satisfies ScreenshotItem[],
  },

  changelogSection: {
    eyebrow: "Release notes",
    heading: "What's new in v" + SITE_CONFIG.version,
    version: SITE_CONFIG.version,
    date: SITE_CONFIG.releaseDate,
    dateIso: SITE_CONFIG.releaseDateIso,
    summary: "Initial public release of VLC Reimagined for 64-bit Windows 10 and Windows 11.",
    highlights: [
      "Complete desktop UI rewrite built on top of the VLC 4 core engine with Direct3D 11 hardware acceleration.",
      "Dedicated Media Library with instant switching between Videos, Music, Playlists, and local Folders.",
      "Unified right-hand drawer for playback queue ordering, multi-track audio switching, and subtitle styling.",
      "Integrated audio/video effects rack featuring a 10-band equalizer and an interactive subtitle sync timeline.",
      "Side-by-side NSIS installer and self-contained portable build with isolated configuration directories.",
    ],
    updaterNote:
      "VLC Reimagined checks for updates once a day and can install the new version from inside the player. You can turn this off in Settings.",
  },

  faqSection: {
    eyebrow: "Questions & answers",
    heading: "Frequently asked questions",
    subline: "Technical details on licensing, installation, privacy, and platform support.",
    items: [
      {
        question: "Is this the official VLC?",
        answer:
          "No. VLC Reimagined is an independent, open-source fork licensed under GPLv2+. It is not affiliated with or endorsed by VideoLAN.",
      },
      {
        question: "Can I keep the official VLC installed?",
        answer:
          "Yes. VLC Reimagined installs to %ProgramFiles%\\VLC Reimagined, uses a separate AppData configuration folder, and registers independent file associations so both apps coexist cleanly.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. It is completely free and open source under the GNU General Public License v2 or later (GPLv2+), with no ads, paywalls, or bundled software.",
        linkText: "View source repository",
        linkHref: SITE_CONFIG.links.sourceCode,
      },
      {
        question: "Does it collect data?",
        answer:
          "There is no telemetry, analytics, or playback tracking. The only network request the application makes by default is a daily plain-text version check against our update endpoint, which can be disabled in Settings.",
      },
      {
        question: "How do updates work?",
        answer:
          "Once a day, the player fetches a small plain-text manifest over HTTPS. When a newer version is available, a subtle banner lets you download and install the update in place without losing your settings.",
      },
      {
        question: "Why does Windows SmartScreen warn when launching the installer?",
        answer:
          "Because this is an independent open-source release, the binary does not yet carry an Extended Validation (EV) commercial code-signing certificate. Click 'More info' and then 'Run anyway' to proceed. Commercial code signing is planned for an upcoming point release.",
      },
      {
        question: "Which formats are supported?",
        answer:
          "Everything VLC media player 4 supports out of the box: MP4, MKV, AVI, WebM, MOV, HEVC (H.265), AV1, H.264, ProRes, FLAC, ALAC, MP3, Opus, Ogg, DVDs, Blu-ray (unencrypted), RTSP, MMS, and HLS/DASH network streams.",
      },
    ] satisfies FaqItem[],
  },

  footer: {
    disclaimer:
      "VLC Reimagined is an independent project based on VLC media player. VLC is a trademark of VideoLAN. Not affiliated with or endorsed by VideoLAN.",
  },
} as const;
