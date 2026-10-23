import Image from "next/image";
import { SITE_CONFIG, SITE_CONTENT } from "@/content/site";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-[#0E0E12] py-14 text-sm text-[#A1A1AA]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#16161C]">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-[-0.02em] text-[#F5F5F7]">
                  {SITE_CONFIG.name}
                </span>
                <span className="rounded border border-white/[0.08] bg-[#16161C] px-1.5 py-0.5 font-mono text-[11px] text-[#A1A1AA]">
                  v{SITE_CONFIG.version}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#A1A1AA]">
                {SITE_CONFIG.osRequirement} · {SITE_CONFIG.architecture} ·{" "}
                {SITE_CONFIG.license}
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer links"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            <a
              href={SITE_CONFIG.links.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#FFA033]"
            >
              Source code ({SITE_CONFIG.license})
            </a>
            <a
              href={SITE_CONFIG.links.changelog}
              className="transition-colors hover:text-[#FFA033]"
            >
              Changelog
            </a>
            <a
              href={SITE_CONFIG.links.privacy}
              className="transition-colors hover:text-[#FFA033]"
            >
              Privacy
            </a>
            <a
              href={SITE_CONFIG.links.contact}
              className="transition-colors hover:text-[#FFA033]"
            >
              Contact
            </a>
            <a
              href={SITE_CONFIG.links.reportBug}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#FFA033]"
            >
              Report a bug
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-xs leading-relaxed text-[#A1A1AA]/80 sm:flex-row sm:items-center">
          <p>{SITE_CONTENT.footer.disclaimer}</p>
          <p className="shrink-0 font-mono text-[11px]">
            Current release: v{SITE_CONFIG.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
