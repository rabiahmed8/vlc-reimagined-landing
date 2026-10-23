"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FolderArchive,
  HardDriveDownload,
} from "lucide-react";
import { SITE_CONFIG } from "@/content/site";

function ChecksumRow({ sha256, label }: { sha256: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API fallback ignored
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#0E0E12]/80 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-medium tracking-wider text-[#A1A1AA] uppercase">
          SHA-256 Checksum
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-[28px] items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#16161C] px-2 py-1 font-mono text-[11px] text-[#A1A1AA] transition-colors hover:border-white/[0.16] hover:text-[#F5F5F7]"
          aria-label={`Copy SHA-256 checksum for ${label}`}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[#FF8800]" aria-hidden="true" />
              <span className="text-[#F5F5F7]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <code className="mt-1.5 block truncate font-mono text-xs text-[#F5F5F7]/85 select-all">
        {sha256}
      </code>
    </div>
  );
}

export function DownloadCards() {
  const shouldReduceMotion = useReducedMotion();
  const { installer, portable, previousReleasesUrl } = SITE_CONFIG.downloads;

  return (
    <section
      id="downloads"
      aria-labelledby="downloads-heading"
      className="border-b border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF8800] uppercase">
            Direct binaries
          </p>
          <h2
            id="downloads-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-4xl"
          >
            Download {SITE_CONFIG.name} v{SITE_CONFIG.version}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            Built for {SITE_CONFIG.osRequirement} ({SITE_CONFIG.architecture}).
            Choose the standard installer for desktop integration or the
            self-contained portable archive.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Windows Installer (.exe) */}
          <motion.article
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card relative flex flex-col justify-between rounded-[20px] border-[#FF8800]/30 p-6 sm:p-8"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF8800]/30 bg-[#FF8800]/10">
                    <HardDriveDownload
                      className="h-5 w-5 text-[#FF8800]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#F5F5F7]">
                      {installer.title}
                    </h3>
                    <p className="font-mono text-xs text-[#A1A1AA]">
                      {SITE_CONFIG.osRequirement} · {SITE_CONFIG.architecture} ·{" "}
                      {installer.size}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-[#FF8800]/35 bg-[#FF8800]/12 px-3 py-1 font-mono text-xs font-medium text-[#FF8800]">
                  {installer.badge}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#A1A1AA]">
                {installer.description}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                {installer.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2.5 text-sm text-[#F5F5F7]/90"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-[#FF8800]"
                      aria-hidden="true"
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={installer.url}
                download
                className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF8800] px-5 py-3 text-sm font-semibold text-[#0E0E12] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_28px_-6px_rgba(255,136,0,0.35)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFA033]"
              >
                <Download className="h-4 w-4 stroke-[2.25]" aria-hidden="true" />
                <span>Download Installer ({installer.extension})</span>
                <span className="font-mono text-xs font-normal text-[#0E0E12]/80">
                  · {installer.size}
                </span>
              </a>

              <ChecksumRow sha256={installer.sha256} label={installer.title} />
            </div>
          </motion.article>

          {/* Card 2: Portable ZIP (.zip) */}
          <motion.article
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="surface-card relative flex flex-col justify-between rounded-[20px] p-6 sm:p-8"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1E1E26]">
                    <FolderArchive
                      className="h-5 w-5 text-[#F5F5F7]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#F5F5F7]">
                      {portable.title}
                    </h3>
                    <p className="font-mono text-xs text-[#A1A1AA]">
                      {SITE_CONFIG.osRequirement} · {SITE_CONFIG.architecture} ·{" "}
                      {portable.size}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/[0.08] bg-[#1E1E26] px-3 py-1 font-mono text-xs font-medium text-[#A1A1AA]">
                  {portable.badge}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#A1A1AA]">
                {portable.description}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                {portable.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2.5 text-sm text-[#F5F5F7]/90"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-[#A1A1AA]"
                      aria-hidden="true"
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={portable.url}
                download
                className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border border-white/[0.1] bg-[#1E1E26] px-5 py-3 text-sm font-semibold text-[#F5F5F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-150 hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-white/[0.08]"
              >
                <FolderArchive className="h-4 w-4" aria-hidden="true" />
                <span>Download Portable ({portable.extension})</span>
                <span className="font-mono text-xs font-normal text-[#A1A1AA]">
                  · {portable.size}
                </span>
              </a>

              <ChecksumRow sha256={portable.sha256} label={portable.title} />
            </div>
          </motion.article>
        </div>

        {/* Footer note with previous versions link */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#16161C]/60 px-6 py-4 text-sm text-[#A1A1AA]">
          <span>
            Looking for older builds, debug symbols, or source tarballs?
          </span>
          <a
            href={previousReleasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[36px] items-center gap-1.5 font-medium text-[#F5F5F7] transition-colors hover:text-[#FFA033]"
          >
            <span>Browse previous versions on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
