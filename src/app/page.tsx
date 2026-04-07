// app/page.tsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedWorks from "../components/FeaturedWorks";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import ContactMe from "../components/ContactMe";
import Footer from "../components/Footer";
import PortfolioChat from "../components/PortfolioChat";
import GlobalAuthToast from "../components/GlobalAuthToast";
import WelcomeModal from "../components/WelcomeModal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden max-w-[100vw]">
      
      {/* Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <Hero />
      <FeaturedWorks />
      <About />
      <Testimonials />
      <ContactMe />

      {/* Footer */}
      <Footer />

      {/* Floating & Global Components */}
      <PortfolioChat />
      <GlobalAuthToast />
      <WelcomeModal />
      
    </main>
  );
}