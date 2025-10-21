import MainNavigation from "./components/ui/MainNavigation";
import Hero from "./components/ui/Hero";
import PortalSelection from "./components/ui/PortalSelection";
import Features from "./components/ui/Features";
import Stats from "./components/ui/Stats";
import Testimonials from "./components/ui/Testimonials";
import CTA from "./components/ui/CTA";
import Footer from "./components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainNavigation />
      <Hero />
      <PortalSelection />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
