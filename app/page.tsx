import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { ChangelogCard } from "@/components/ChangelogCard";
import { DownloadCards } from "@/components/DownloadCards";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0E0E12] text-[#F5F5F7]">
      <Nav />
      <main id="main-content">
        <Hero />
        <FeatureGrid />
        <ScreenshotGallery />
        <ChangelogCard />
        <DownloadCards />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
