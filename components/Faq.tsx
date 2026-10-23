"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqSection } = SITE_CONTENT;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF8800] uppercase">
            {faqSection.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-4xl"
          >
            {faqSection.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            {faqSection.subline}
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/[0.08] overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#16161C]">
          {faqSection.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div key={item.question} className="transition-colors">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="flex min-h-[60px] w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-medium text-[#F5F5F7] transition-colors hover:bg-[#1E1E26]/60 sm:px-7 sm:py-5"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#A1A1AA] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#FF8800]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? "block px-6 pb-6 sm:px-7" : "hidden"}
                >
                  <p className="max-w-3xl text-sm leading-relaxed text-[#A1A1AA]">
                    {item.answer}
                  </p>
                  {item.linkHref && item.linkText && (
                    <a
                      href={item.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#FF8800] transition-colors hover:text-[#FFA033]"
                    >
                      <span>{item.linkText}</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
