"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Layout,
  Library,
  ListVideo,
  Maximize2,
  Sliders,
} from "lucide-react";
import { SITE_CONTENT, type FeatureItem } from "@/content/site";

function FeatureIcon({ name }: { name: FeatureItem["icon"] }) {
  const props = {
    className: "h-5 w-5 text-[#FF8800]",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "layout":
      return <Layout {...props} />;
    case "library":
      return <Library {...props} />;
    case "list-video":
      return <ListVideo {...props} />;
    case "sliders":
      return <Sliders {...props} />;
    case "maximize":
      return <Maximize2 {...props} />;
    case "layers":
      return <Layers {...props} />;
  }
}

export function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-b border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF8800] uppercase">
            {SITE_CONTENT.featuresSection.eyebrow}
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-4xl"
          >
            {SITE_CONTENT.featuresSection.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            {SITE_CONTENT.featuresSection.subline}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_CONTENT.featuresSection.items.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={
                shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="surface-card group relative flex flex-col justify-between rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-[#1E1E26]"
            >
              <div>
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1E1E26] transition-colors group-hover:border-[#FF8800]/30 group-hover:bg-[#FF8800]/10">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="text-base font-semibold tracking-[-0.015em] text-[#F5F5F7]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
