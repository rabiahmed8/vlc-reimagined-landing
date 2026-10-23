import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { ChangelogCard } from "@/components/ChangelogCard";
import { DownloadCards } from "@/components/DownloadCards";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { getLatestRelease } from "@/lib/github-release";

export const revalidate = 60;

export default async function HomePage() {
  const release = await getLatestRelease();

  return (
    <div className="relative min-h-screen bg-[#0E0E12] text-[#F5F5F7]">
      <Nav release={release} />
      <main id="main-content">
        <Hero release={release} />
        <FeatureGrid />
        <ScreenshotGallery />
        <ChangelogCard release={release} />
        <DownloadCards release={release} />
        <Faq />
      </main>
      <Footer release={release} />
    </div>
  );
}
