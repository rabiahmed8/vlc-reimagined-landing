"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { SITE_CONTENT, type ScreenshotItem } from "@/content/site";

export function ScreenshotGallery() {
  const shouldReduceMotion = useReducedMotion();
  const items = SITE_CONTENT.screenshotsSection.items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem: ScreenshotItem | null =
    activeIndex !== null ? items[activeIndex] ?? null : null;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length
    );
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="border-b border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF8800] uppercase">
            {SITE_CONTENT.screenshotsSection.eyebrow}
          </p>
          <h2
            id="screenshots-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-4xl"
          >
            {SITE_CONTENT.screenshotsSection.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            {SITE_CONTENT.screenshotsSection.subline}
          </p>
        </div>

        {/* Horizontal scroll on mobile (<640px), 2-column grid on tablet/desktop */}
        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {items.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={
                shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="surface-card group w-[86vw] shrink-0 snap-center overflow-hidden rounded-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.15] sm:w-auto"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                className=" block w-full text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#FF8800]"
                aria-label={`Open ${item.title} screenshot in fullscreen lightbox`}
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-[#0E0E12]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <div className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#0E0E12]/80 px-2.5 py-1.5 text-xs font-medium text-[#F5F5F7] opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5 text-[#FF8800]" aria-hidden="true" />
                    <span>Inspect</span>
                  </div>
                </div>

                <figcaption className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold tracking-[-0.015em] text-[#F5F5F7]">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs text-[#A1A1AA]">
                      0{idx + 1} / 0{items.length}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">
                    {item.caption}
                  </p>
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.title} full resolution preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0E0E12]/92 p-4 backdrop-blur-xl sm:p-6 lg:p-10"
            onClick={closeLightbox}
          >
            <div
              className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#16161C] shadow-[0_32px_96px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#FF8800]">
                    0{activeIndex + 1} / 0{items.length}
                  </span>
                  <h3 className="text-sm font-semibold text-[#F5F5F7] sm:text-base">
                    {activeItem.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1E1E26] text-[#A1A1AA] transition-colors hover:text-[#F5F5F7]"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1E1E26] text-[#A1A1AA] transition-colors hover:text-[#F5F5F7]"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1E1E26] text-[#A1A1AA] transition-colors hover:border-[#FF8800]/50 hover:text-[#F5F5F7]"
                    aria-label="Close lightbox"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image stage */}
              <div className="relative aspect-video w-full bg-[#0E0E12]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={activeItem.width}
                  height={activeItem.height}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Caption footer */}
              <div className="border-t border-white/[0.08] bg-[#16161C] px-4 py-3.5 sm:px-6">
                <p className="text-sm text-[#A1A1AA]">{activeItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
