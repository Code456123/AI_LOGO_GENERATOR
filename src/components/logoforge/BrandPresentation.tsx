'use client';

import { motion } from 'framer-motion';
import { Download, Monitor, Smartphone, Briefcase, Box, Shirt } from 'lucide-react';
import toast from 'react-hot-toast';

interface BrandPresentationProps {
  logoUrl: string;
}

const mockups = [
  {
    id: 'business-card',
    title: 'Business Card',
    icon: <Briefcase className="w-4 h-4" />,
    bgUrl: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800',
    logoStyle: {
      position: 'absolute' as const,
      top: '55%',
      left: '42%',
      width: '35%',
      transform: 'translate(-50%, -50%) rotate(0deg)',
      mixBlendMode: 'multiply' as const,
    }
  },
  {
    id: 't-shirt',
    title: 'Apparel',
    icon: <Shirt className="w-4 h-4" />,
    bgUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    logoStyle: {
      position: 'absolute' as const,
      top: '38%',
      left: '50%',
      width: '25%',
      transform: 'translate(-50%, -50%)',
      mixBlendMode: 'multiply' as const,
    }
  },
  {
    id: 'packaging',
    title: 'Product Packaging',
    icon: <Box className="w-4 h-4" />,
    bgUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', // Notebook
    logoStyle: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      width: '45%',
      transform: 'translate(-50%, -50%)',
      mixBlendMode: 'multiply' as const,
    }
  }
];

export function BrandPresentation({ logoUrl }: BrandPresentationProps) {
  
  const handleDownloadKit = () => {
    toast.success('Compiling Brand Kit... (This will download a ZIP with your logo in all formats)');
    setTimeout(() => {
      // Simulate download
      const a = document.createElement('a');
      a.href = logoUrl;
      a.download = `brand-logo-pack-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  return (
    <div className="w-full space-y-12 mt-16 pt-16 border-t border-white/5 relative z-20">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20"
        >
          <Monitor className="w-3.5 h-3.5" /> Client Presentation
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight"
        >
          Your Brand in the Real World
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          See how your new logo looks applied across professional contexts with proper lighting, shadows, and perspective.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Abstract Web Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-2 lg:col-span-2 rounded-[2rem] bg-zinc-950 border border-white/10 overflow-hidden relative group aspect-[16/10] md:aspect-auto h-[400px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent z-0" />
          
          {/* Browser Top Bar */}
          <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-black/40 relative z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="mx-auto w-1/2 h-5 rounded-md bg-white/5 border border-white/5" />
          </div>

          <div className="p-8 h-full flex flex-col relative z-10">
            <header className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain drop-shadow-lg mix-blend-screen" />
                <div className="w-24 h-4 bg-white/10 rounded-full" />
              </div>
              <div className="hidden sm:flex gap-4">
                <div className="w-16 h-2 bg-white/10 rounded-full" />
                <div className="w-16 h-2 bg-white/5 rounded-full" />
                <div className="w-16 h-2 bg-white/5 rounded-full" />
              </div>
            </header>

            <div className="flex-1 flex flex-col justify-center max-w-sm gap-4">
              <div className="w-3/4 h-8 bg-white/20 rounded-lg" />
              <div className="w-full h-16 bg-white/5 rounded-lg" />
              <div className="w-32 h-10 bg-violet-500/80 rounded-lg mt-4" />
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-white/5 border-t border-l border-white/10 rounded-tl-3xl translate-y-8 translate-x-8 -rotate-2 transform-gpu group-hover:rotate-0 group-hover:translate-y-4 group-hover:translate-x-4 transition-all duration-700 ease-out flex items-center justify-center overflow-hidden">
            <img src={logoUrl} alt="Hero Logo Display" className="w-2/3 h-2/3 object-contain mix-blend-screen opacity-10 blur-[2px] scale-150 absolute" />
            <img src={logoUrl} alt="Hero Logo Display" className="w-1/2 h-1/2 object-contain mix-blend-screen drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700" />
          </div>

          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 z-20">
            <Monitor className="w-3 h-3" /> Website Header
          </div>
        </motion.div>

        {/* Mobile App Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 rounded-[2rem] bg-zinc-950 border border-white/10 overflow-hidden relative group h-[400px] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 z-20 shadow-lg">
            <Smartphone className="w-3 h-3" /> Mobile App
          </div>

          {/* Simple iPhone frame */}
          <div className="w-[220px] h-[450px] bg-black border-[6px] border-zinc-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col group-hover:scale-105 transition-transform duration-500 group-hover:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
               <div className="w-24 h-5 bg-zinc-800 rounded-b-2xl" />
            </div>
            
            <div className="w-full h-1/2 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] pt-12 pb-8 px-6 flex flex-col items-center justify-center relative">
               <img src={logoUrl} alt="App Logo" className="w-20 h-20 object-contain mix-blend-screen drop-shadow-lg mb-4" />
               <div className="w-24 h-2 bg-white/20 rounded-full" />
            </div>
            
            <div className="w-full flex-1 bg-zinc-900 border-t border-white/5 p-4 space-y-4">
              <div className="w-full h-12 bg-white/5 rounded-xl border border-white/5" />
              <div className="flex gap-3">
                <div className="w-1/2 h-24 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-3">
                  <img src={logoUrl} alt="App Icon 1" className="w-full h-full object-contain mix-blend-screen opacity-50" />
                </div>
                <div className="w-1/2 h-24 bg-white/5 rounded-xl border border-white/5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Image Mockups */}
        {mockups.map((mockup, index) => (
          <motion.div
            key={mockup.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + Math.random() * 0.2 }}
            className="col-span-1 rounded-[2rem] relative group h-[300px] md:h-[350px] overflow-hidden bg-zinc-900 isolation-auto border border-white/5"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10 pointer-events-none duration-500" />
            <img 
              src={mockup.bgUrl} 
              alt={mockup.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            
            <img 
              src={logoUrl} 
              alt={`${mockup.title} Logo`} 
              className="drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              style={mockup.logoStyle}
            />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 z-20 shadow-lg">
              {mockup.icon} {mockup.title}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleDownloadKit}
          className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
        >
          <Download className="w-5 h-5" />
          Download Brand Kit
        </button>
      </div>

    </div>
  );
}
