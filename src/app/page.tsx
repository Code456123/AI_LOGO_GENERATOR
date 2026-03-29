'use client';

import { useState } from 'react';
import {
  Header,
  HeroSection,
  FeaturesSection,
  GallerySection,
  PricingSection,
  CommunitySection,
  Footer,
  AuthModal,
  GeneratorWorkspace,
} from '@/components/logoforge';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [promptValue, setPromptValue] = useState('');

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handlePromptChange = (prompt: string) => {
    setPromptValue(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenAuth={handleOpenAuth} />
      <main>
        <HeroSection onPromptChange={handlePromptChange} />
        <GeneratorWorkspace externalPrompt={promptValue} />
        <FeaturesSection />
        <GallerySection />
        <PricingSection />
        <CommunitySection />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
