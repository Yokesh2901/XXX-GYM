import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutLegacy } from './components/AboutLegacy';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Programs } from './components/Programs';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';
import { MembershipCTA } from './components/MembershipCTA';
import { GoogleReviewsCTA } from './components/GoogleReviewsCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { JoinModal } from './components/JoinModal';
import { ThreeBackground } from './components/ThreeBackground';

export function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('Strength Training');

  const handleOpenJoinModal = (programName?: string) => {
    if (programName) {
      setSelectedProgram(programName);
    }
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-rose-600 selection:text-white relative">
      {/* Global 3D Kinetic Background Particle Wave Grid */}
      <ThreeBackground />

      {/* Sticky Navigation */}
      <Navbar onOpenJoinModal={() => handleOpenJoinModal()} />

      {/* Main Page Landmark */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section with 3D Parallax Scroll */}
        <Hero onOpenJoinModal={() => handleOpenJoinModal()} />

        {/* 2. Legacy / About Section with 3D Scroll Reveal */}
        <AboutLegacy />

        {/* 3. Why Choose Us (6 3D TiltCards) */}
        <WhyChooseUs onOpenJoinModal={() => handleOpenJoinModal()} />

        {/* 4. Programs Section with 3D Cards */}
        <Programs onSelectProgram={(progName) => handleOpenJoinModal(progName)} />

        {/* 5. Gallery (Inside & Outside Views with 3D Tilt & Lightbox) */}
        <Gallery />

        {/* 6. 20+ Year Timeline with Scroll-Linked 3D Progress Line */}
        <Timeline />

        {/* 7. Membership / Conversion CTA */}
        <MembershipCTA onOpenJoinModal={() => handleOpenJoinModal()} />

        {/* 8. Google Reviews / Community Trust Section */}
        <GoogleReviewsCTA />

        {/* 9. Contact Section with Exterior Photo & WhatsApp Inquiry */}
        <Contact />
      </main>

      {/* 10. Footer with links, hours, and brand copyright */}
      <Footer />

      {/* 12. Sticky Bottom Mobile Action Bar (Call, WhatsApp, Join Now) */}
      <MobileStickyBar onOpenJoinModal={() => handleOpenJoinModal()} />

      {/* 13. Interactive Membership Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={handleCloseJoinModal}
        defaultProgram={selectedProgram}
      />
    </div>
  );
}

export default App;
