"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Tag } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import type { LiveReleaseData } from "@/lib/github-release";

export function ChangelogCard({ release }: { release: LiveReleaseData }) {
  const shouldReduceMotion = useReducedMotion();
  const { changelogSection } = SITE_CONTENT;

  return (
    <section
      id="changelog"
      aria-labelledby="changelog-heading"
      className="border-b border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF8800] uppercase">
            {changelogSection.eyebrow}
          </p>
          <h2
            id="changelog-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-4xl"
          >
            What&apos;s new in v{release.version}
          </h2>

          <div className="surface-card mt-8 overflow-hidden rounded-[20px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#1E1E26]/60 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF8800]/30 bg-[#FF8800]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#FF8800]">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                  v{release.version}
                </span>
                <span className="text-sm font-medium text-[#F5F5F7]">
                  Stable Release
                </span>
              </div>
              <time
                dateTime={release.releaseDateIso}
                className="font-mono text-xs text-[#A1A1AA]"
              >
                {release.releaseDate}
              </time>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-medium text-[#F5F5F7] sm:text-base">
                {release.changelog.summary}
              </p>

              <ul className="mt-5 space-y-3">
                {release.changelog.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#A1A1AA]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF8800]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-[#0E0E12]/70 p-4">
                <RefreshCw
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8800]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-[#A1A1AA] sm:text-sm">
                  {changelogSection.updaterNote}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
