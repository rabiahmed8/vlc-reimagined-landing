"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Menu, X } from "lucide-react";
import { SITE_CONFIG, SITE_CONTENT } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled || mobileOpen
          ? "border-b border-white/[0.08] bg-[#0E0E12]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          : "border-b border-transparent bg-[#0E0E12]/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex items-center gap-3 rounded-xl py-1 pr-2 focus-visible:outline-2 focus-visible:outline-[#FF8800]"
          aria-label={`${SITE_CONFIG.name} home`}
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/[0.1] bg-gradient-to-b from-[#1E1E26] to-[#121217] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#F5F5F7]">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden rounded-md border border-white/[0.08] bg-[#16161C] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[#A1A1AA] sm:inline-block">
              v{SITE_CONFIG.version}
            </span>
          </div>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex md:items-center md:gap-1">
          {SITE_CONTENT.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#A1A1AA] transition-colors duration-150 hover:bg-white/[0.04] hover:text-[#F5F5F7]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#downloads"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#FF8800] px-4 py-2 text-xs font-semibold tracking-[-0.01em] text-[#0E0E12] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_14px_rgba(255,136,0,0.22)] transition-all duration-150 hover:bg-[#FFA033]"
          >
            <Download className="h-3.5 w-3.5 stroke-[2.25]" aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#16161C] text-[#A1A1AA] transition-colors hover:text-[#F5F5F7] md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="border-t border-white/[0.08] bg-[#0E0E12]/95 px-4 pt-3 pb-5 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {SITE_CONTENT.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-sm font-medium text-[#A1A1AA] transition-colors hover:bg-[#16161C] hover:text-[#F5F5F7]"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-white/[0.08]">
              <a
                href="#downloads"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF8800] px-4 py-2.5 text-sm font-semibold text-[#0E0E12] transition-colors hover:bg-[#FFA033]"
              >
                <Download className="h-4 w-4 stroke-[2.25]" aria-hidden="true" />
                <span>
                  Download ({SITE_CONFIG.downloads.installer.extension},{" "}
                  {SITE_CONFIG.downloads.installer.size})
                </span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
