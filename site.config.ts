export const SITE_CONFIG = {
  name: "VLC Reimagined",
  tagline: "The player you know. The interface you wanted.",
  description:
    "An independent fork of VLC media player 4 for Windows. Every format VLC plays, rebuilt with a quiet, modern dark interface.",
  domain: "https://vlcreimagined.org",
  version: "4.0.0",
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
      filename: "VLC-Reimagined-4.0.0-win64-setup.exe",
      url: "https://vlcreimagined.org/downloads/VLC-Reimagined-4.0.0-win64-setup.exe",
      sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      description:
        "Signed-name NSIS setup for Windows 10 and 11 (64-bit). Installs for all users, registers file associations, and coexists alongside official VLC.",
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
      filename: "VLC-Reimagined-4.0.0-win64-portable.zip",
      url: "https://vlcreimagined.org/downloads/VLC-Reimagined-4.0.0-win64-portable.zip",
      sha256: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      description:
        "Self-contained archive for USB drives or restricted environments. Runs without administrator privileges and writes no registry keys.",
      specs: [
        "Zero registry modifications or background services",
        "Preferences, library index, and cache stay inside the folder",
        "Unpack anywhere and launch vlc-reimagined.exe directly",
      ],
    },
    previousReleasesUrl: "https://github.com/rabiahmed8/vlc-reimagined/releases",
  },
  links: {
    sourceCode: "https://github.com/rabiahmed8/vlc-reimagined",
    releases: "https://github.com/rabiahmed8/vlc-reimagined/releases",
    changelog: "#changelog",
    privacy: "#faq",
    contact: "mailto:contact@vlcreimagined.org",
    reportBug: "https://github.com/rabiahmed8/vlc-reimagined/issues/new",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
