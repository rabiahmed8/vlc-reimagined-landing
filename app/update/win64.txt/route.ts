import { getLatestRelease } from "@/lib/github-release";

export const revalidate = 60;

export async function GET() {
  const release = await getLatestRelease();
  const body = release.manifestText;
  const byteLength = Buffer.byteLength(body, "utf8");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Length": String(byteLength),
    },
  });
}

export async function HEAD() {
  const release = await getLatestRelease();
  const body = release.manifestText;
  const byteLength = Buffer.byteLength(body, "utf8");

  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Length": String(byteLength),
    },
  });
}
