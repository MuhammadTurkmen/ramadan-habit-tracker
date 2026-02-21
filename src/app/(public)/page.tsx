import { LandingPageCTA } from "@/components/LandingPage/cta";
import { LandingPageFeatures } from "@/components/LandingPage/features";
import { LandingPageFooter } from "@/components/LandingPage/footer";
import { LandingPageHero } from "@/components/LandingPage/hero";
import { LandingPageNavbar } from "@/components/LandingPage/navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navbar */}
      <LandingPageNavbar />
      {/* Hero Section */}
      <LandingPageHero />

      {/* Features Section */}
      <LandingPageFeatures />

      {/* CTA Section */}
      <LandingPageCTA />

      {/* Footer */}
      <LandingPageFooter />
    </main>
  );
}
