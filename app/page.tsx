import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import HowItWorks from '@/components/HowItWorks';
import FinancingCTA from '@/components/FinancingCTA';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustBar />
      <FeaturedVehicles />
      <HowItWorks />
      <FinancingCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}