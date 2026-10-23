export const SITE_CONFIG = {
  name: "VLC Reimagined",
  tagline: "The player you know. The interface you wanted.",
  description:
    "An independent fork built on the VLC 4 engine for Windows. Every format VLC plays, rebuilt with a quiet, modern dark interface.",
  domain: "https://vlc-reimagined.vercel.app",
  version: "1.0.0",
  releaseDate: "October 23, 2026",
  releaseDateIso: "2026-10-23",
  osRequirement: "Windows 10 / 11",
  architecture: "64-bit",
  license: "GPLv2+",
  installPath: "%ProgramFiles%\\VLC Reimagined",
  downloads: {
    installer: {
      label: "Download for Windows",
      title: "Windows Installer",
      badge: "Recommended",
      extension: ".exe",
      size: "57 MB",
      filename: "VLC-Reimagined-1.0.0-win64-setup.exe",
      url: "https://github.com/rabiahmed8/vlc-reimagined/releases/download/v1.0.0/VLC-Reimagined-1.0.0-win64-setup.exe",
      sha256: "d27ec7e6f34e6001294bf11a9a630a500d9cef0945cb00e319b49474bae0bf97",
      description:
        "Branded NSIS setup for Windows 10 and 11 (64-bit). Installs for all users, registers file associations, and coexists alongside official VLC.",
      specs: [
        "Installs to %ProgramFiles%\\VLC Reimagined",
        "Registers separate file associations and start menu shortcuts",
        "Built-in daily updater with one-click in-app installation",
      ],
    },
    portable: {
      label: "Portable version",
      title: "Portable Archive",
      badge: "No installation",
      extension: ".zip",
      size: "88 MB",
      filename: "VLC-Reimagined-1.0.0-win64-portable.zip",
      url: "https://github.com/rabiahmed8/vlc-reimagined/releases/download/v1.0.0/VLC-Reimagined-1.0.0-win64-portable.zip",
      sha256: "86a4fdaefff9b934bc244cefeaae773029fd128064201c131c41db4dce3d0aac",
      description:
        "Self-contained archive for USB drives or restricted environments. Runs without administrator privileges and writes no registry keys.",
      specs: [
        "Zero registry modifications or background services",
        "Preferences, library index, and cache stay inside the folder",
        "Unpack anywhere and launch vlc.exe directly",
      ],
    },
    previousReleasesUrl: "https://github.com/rabiahmed8/vlc-reimagined/releases",
  },
  links: {
    sourceCode: "https://github.com/rabiahmed8/vlc-reimagined",
    releases: "https://github.com/rabiahmed8/vlc-reimagined/releases",
    changelog: "#changelog",
    privacy: "#faq",
    contact: "https://github.com/rabiahmed8/vlc-reimagined/issues/new",
    reportBug: "https://github.com/rabiahmed8/vlc-reimagined/issues/new",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
