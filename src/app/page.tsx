// app/page.tsx

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import FeaturedWorks from "../components/FeaturedWorks";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import PortfolioChat from "../components/PortfolioChat";
import Testimonials from "../components/Testimonials";
export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedWorks/>
      <About/>
      <Testimonials/>
      <ContactMe/>
      <PortfolioChat/>
      
    </main>
  );
}