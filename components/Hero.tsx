"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Download, FolderArchive, ShieldCheck } from "lucide-react";
import {
  INSTALLER_DOWNLOAD_URL,
  PORTABLE_DOWNLOAD_URL,
  SITE_CONFIG,
  SITE_CONTENT,
} from "@/content/site";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-white/[0.08] pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32"
    >
      {/* Subtle grain texture & restrained cone-orange ambient glow */}
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[540px] w-[880px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FF8800]/[0.07] blur-[130px] lg:left-[68%]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Copy + CTAs */}
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start lg:col-span-5"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#16161C] px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span
                className="h-2 w-2 rounded-full bg-[#FF8800]"
                aria-hidden="true"
              />
              <span className="text-xs font-medium tracking-[-0.01em] text-[#A1A1AA]">
                {SITE_CONTENT.hero.badge}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-5xl lg:text-[52px] lg:leading-[1.08]"
            >
              {SITE_CONTENT.hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-[17px] sm:leading-[1.6]">
              {SITE_CONTENT.hero.subline}
            </p>

            {/* Primary & Secondary Download CTAs */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href={INSTALLER_DOWNLOAD_URL}
                download
                className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl bg-[#FF8800] px-5 py-3 text-sm font-semibold text-[#0E0E12] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_28px_-6px_rgba(255,136,0,0.38)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFA033]"
              >
                <Download className="h-4 w-4 stroke-[2.25]" aria-hidden="true" />
                <span>{SITE_CONFIG.downloads.installer.label}</span>
                <span className="rounded-md bg-[#0E0E12]/15 px-2 py-0.5 font-mono text-xs font-medium text-[#0E0E12]/90">
                  {SITE_CONFIG.downloads.installer.extension} ·{" "}
                  {SITE_CONFIG.downloads.installer.size}
                </span>
              </a>

              <a
                href={PORTABLE_DOWNLOAD_URL}
                download
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#16161C] px-5 py-3 text-sm font-medium text-[#F5F5F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-[#1E1E26]"
              >
                <FolderArchive
                  className="h-4 w-4 text-[#A1A1AA]"
                  aria-hidden="true"
                />
                <span>{SITE_CONFIG.downloads.portable.label}</span>
                <span className="rounded-md border border-white/[0.08] bg-[#0E0E12]/60 px-2 py-0.5 font-mono text-xs text-[#A1A1AA]">
                  {SITE_CONFIG.downloads.portable.extension} ·{" "}
                  {SITE_CONFIG.downloads.portable.size}
                </span>
              </a>
            </div>

            {/* Meta specification line */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#A1A1AA]">
              <ShieldCheck
                className="h-3.5 w-3.5 text-[#FF8800]"
                aria-hidden="true"
              />
              <span>{SITE_CONTENT.hero.metaLine}</span>
            </div>
          </motion.div>

          {/* Right column: Product Screenshot inside subtle window frame with soft orange glow */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-7"
          >
            {/* Soft cone-orange glow behind the window */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-tr from-[#FF8800]/15 via-[#FF8800]/10 to-transparent opacity-90 blur-2xl"
              aria-hidden="true"
            />

            <div className="overflow-hidden rounded-[16px] border border-white/[0.1] bg-[#1A1A1A] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_32px_80px_-20px_rgba(0,0,0,0.85)]">
              {/* Main 16:9 Screenshot with native VLC Reimagined top & bottom bars */}
              <div className="relative aspect-video w-full bg-[#1A1A1A]">
                <Image
                  src={SITE_CONTENT.hero.heroScreenshot.src}
                  alt={SITE_CONTENT.hero.heroScreenshot.alt}
                  width={SITE_CONTENT.hero.heroScreenshot.width}
                  height={SITE_CONTENT.hero.heroScreenshot.height}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
