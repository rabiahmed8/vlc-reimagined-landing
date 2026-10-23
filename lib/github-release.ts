import { SITE_CONFIG } from "@/site.config";
import { SITE_CONTENT } from "@/content/site";

const GITHUB_LATEST_RELEASE_API =
  "https://api.github.com/repos/rabiahmed8/vlc-reimagined/releases/latest";

interface GitHubAsset {
  name: string;
  size: number;
  digest?: string | null;
  browser_download_url: string;
}

interface GitHubReleaseResponse {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  assets: GitHubAsset[];
}

export interface LiveReleaseData {
  version: string;
  releaseDate: string;
  releaseDateIso: string;
  installer: {
    filename: string;
    url: string;
    size: string;
    sha256: string;
  };
  portable: {
    filename: string;
    url: string;
    size: string;
    sha256: string;
  };
  changelog: {
    summary: string;
    highlights: string[];
  };
  manifestText: string;
}

function formatBytesToMB(bytes: number, fallback: string): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return fallback;
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

function sanitizePlainText(line: string): string {
  return line
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/->/g, "to")
    .replace(/[<>&]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseReleaseNotes(
  rawBody: string | null | undefined,
  version: string
): {
  summary: string;
  highlights: string[];
  manifestLines: string[];
} {
  const defaultSummary = `Public release v${version} of VLC Reimagined for 64-bit Windows 10 and Windows 11.`;
  const defaultHighlights = [...SITE_CONTENT.changelogSection.highlights];
  const defaultManifestLines = [
    `VLC Reimagined ${version}`,
    "- Redesigned player, library and settings.",
    "- Queue reordering, track panels and subtitle sync.",
    "- Portable mode, side-by-side installation with VLC, in-app updates.",
  ];

  if (!rawBody || !rawBody.trim()) {
    return {
      summary: defaultSummary,
      highlights: defaultHighlights,
      manifestLines: defaultManifestLines,
    };
  }

  const lines = rawBody
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Extract bullet / highlight lines between "Highlights" (or start) and "Requirements" / "Notes" / "Full Changelog"
  const highlightLines: string[] = [];
  let inHighlights = false;
  let summaryLine = "";

  for (const line of lines) {
    if (/^(requirements|notes|full changelog|\*\*full changelog)/i.test(line)) {
      break;
    }
    if (/^#*\s*highlights$/i.test(line)) {
      inHighlights = true;
      continue;
    }
    if (!inHighlights && !summaryLine && !line.toLowerCase().startsWith("vlc reimagined")) {
      summaryLine = sanitizePlainText(line);
      continue;
    }
    if (inHighlights || line.startsWith("- ") || line.startsWith("* ")) {
      const cleaned = sanitizePlainText(line.replace(/^[-*•]\s*/, ""));
      if (cleaned.length > 10) {
        highlightLines.push(cleaned);
      }
    }
  }

  const finalHighlights =
    highlightLines.length >= 3
      ? highlightLines.slice(0, 6)
      : defaultHighlights;

  // For v1.0.0 keep the exact canonical 4-line summary if version === "1.0.0", otherwise build from parsed highlights
  const manifestLines =
    version === "1.0.0"
      ? defaultManifestLines
      : [
          `VLC Reimagined ${version}`,
          ...finalHighlights.slice(0, 5).map((h) => `- ${h}`),
        ];

  return {
    summary: summaryLine || defaultSummary,
    highlights: finalHighlights,
    manifestLines,
  };
}

export async function getLatestRelease(): Promise<LiveReleaseData> {
  const fallbackManifest = [
    SITE_CONFIG.version,
    SITE_CONFIG.downloads.installer.url,
    `VLC Reimagined ${SITE_CONFIG.version}`,
    "- Redesigned player, library and settings.",
    "- Queue reordering, track panels and subtitle sync.",
    "- Portable mode, side-by-side installation with VLC, in-app updates.",
    "",
  ].join("\n");

  const fallback: LiveReleaseData = {
    version: SITE_CONFIG.version,
    releaseDate: SITE_CONFIG.releaseDate,
    releaseDateIso: SITE_CONFIG.releaseDateIso,
    installer: {
      filename: SITE_CONFIG.downloads.installer.filename,
      url: SITE_CONFIG.downloads.installer.url,
      size: SITE_CONFIG.downloads.installer.size,
      sha256: SITE_CONFIG.downloads.installer.sha256,
    },
    portable: {
      filename: SITE_CONFIG.downloads.portable.filename,
      url: SITE_CONFIG.downloads.portable.url,
      size: SITE_CONFIG.downloads.portable.size,
      sha256: SITE_CONFIG.downloads.portable.sha256,
    },
    changelog: {
      summary: SITE_CONTENT.changelogSection.summary,
      highlights: [...SITE_CONTENT.changelogSection.highlights],
    },
    manifestText: fallbackManifest,
  };

  try {
    const res = await fetch(GITHUB_LATEST_RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "vlc-reimagined-landing",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return fallback;
    }

    const data = (await res.json()) as GitHubReleaseResponse;
    if (!data || !data.tag_name) {
      return fallback;
    }

    // Bare numeric version (strip leading 'v')
    const version = data.tag_name.replace(/^v/i, "").trim() || fallback.version;

    // Parse published date
    let releaseDate: string = fallback.releaseDate;
    let releaseDateIso: string = fallback.releaseDateIso;
    if (data.published_at) {
      const parsedDate = new Date(data.published_at);
      if (!Number.isNaN(parsedDate.getTime())) {
        releaseDateIso = parsedDate.toISOString().split("T")[0] ?? fallback.releaseDateIso;
        releaseDate = parsedDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        });
      }
    }

    const exeAsset = data.assets?.find((a) =>
      a.name.toLowerCase().endsWith(".exe")
    );
    const zipAsset = data.assets?.find((a) =>
      a.name.toLowerCase().endsWith(".zip")
    );

    const installerUrl = exeAsset?.browser_download_url || fallback.installer.url;
    const installerFilename = exeAsset?.name || fallback.installer.filename;
    const installerSize = exeAsset
      ? formatBytesToMB(exeAsset.size, fallback.installer.size)
      : fallback.installer.size;
    const installerSha256 = exeAsset?.digest
      ? exeAsset.digest.replace(/^sha256:/i, "")
      : fallback.installer.sha256;

    const portableUrl = zipAsset?.browser_download_url || fallback.portable.url;
    const portableFilename = zipAsset?.name || fallback.portable.filename;
    const portableSize = zipAsset
      ? formatBytesToMB(zipAsset.size, fallback.portable.size)
      : fallback.portable.size;
    const portableSha256 = zipAsset?.digest
      ? zipAsset.digest.replace(/^sha256:/i, "")
      : fallback.portable.sha256;

    const { summary, highlights, manifestLines } = parseReleaseNotes(
      data.body,
      version
    );

    const manifestText = [version, installerUrl, ...manifestLines, ""].join(
      "\n"
    );

    return {
      version,
      releaseDate,
      releaseDateIso,
      installer: {
        filename: installerFilename,
        url: installerUrl,
        size: installerSize,
        sha256: installerSha256,
      },
      portable: {
        filename: portableFilename,
        url: portableUrl,
        size: portableSize,
        sha256: portableSha256,
      },
      changelog: {
        summary,
        highlights,
      },
      manifestText,
    };
  } catch {
    return fallback;
  }
}
