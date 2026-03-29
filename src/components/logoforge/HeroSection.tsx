'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onPromptChange: (prompt: string) => void;
}

const exampleTags = [
  { label: 'Modern Tech Logo', icon: Zap },
  { label: 'Luxury Brand', icon: Sparkles },
  { label: 'Minimalist Icon', icon: ArrowRight },
];

const sampleLogos = [
  { name: 'Custom User Upload 1', url: '/logo1.jpg' },
  { name: 'Custom User Upload 2', url: '/logo2.jpg' },
  { name: 'Custom User Upload 3', url: '/logo3.jpg' },
  { name: 'Cosmic glowing space sphere 3D render', url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=400' },
  { name: 'Playful vibrant burger restaurant badge', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400' },
  { name: 'Luxury golden crest negative space', url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=400' },
  { name: 'Modern tech startup aura waves', url: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Fierce wolf sports team emblem', url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400' },
];

export function HeroSection({ onPromptChange }: HeroSectionProps) {
  const [promptValue, setPromptValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 30);
        mouseY.set(y * 30);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleTagClick = (label: string) => {
    setPromptValue(label);
    onPromptChange(label);
  };

  const handleGenerate = () => {
    if (promptValue.trim()) {
      onPromptChange(promptValue);
      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-[72px] overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/20 to-transparent blur-[120px]"
        />
        <motion.div
          style={{ x: useTransform(orbX, (v) => -v * 0.5), y: useTransform(orbY, (v) => -v * 0.5) }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-[100px]"
        />
        <motion.div
          style={{ x: useTransform(orbX, (v) => v * 0.3), y: useTransform(orbY, (v) => v * 0.3) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-[80px]"
        />

        {/* Floating Particles */}
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/50 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Powered by Advanced AI</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Create{' '}
          <span className="gradient-text animate-gradient bg-[length:200%_auto]">Stunning</span>
          <br />
          Logos with AI
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Turn your ideas into professional logo designs in seconds. No design skills required.
        </motion.p>

        {/* Prompt Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            'relative max-w-3xl mx-auto mb-6 transition-all duration-300',
            isFocused && 'scale-[1.02]'
          )}
        >
          <div
            className={cn(
              'relative rounded-2xl p-1 transition-all duration-300',
              isFocused ? 'gradient-border' : 'glass'
            )}
          >
            <div className="relative rounded-[14px] glass p-1">
              <div className="flex items-center gap-3 p-2">
                <div className="pl-3 pr-2 py-3 flex-1">
                  <input
                    type="text"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="Describe your dream logo..."
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] glow-purple"
                >
                  Generate
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Example Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <span className="text-sm text-muted-foreground">Try:</span>
          {exampleTags.map((tag, index) => (
            <motion.button
              key={tag.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              onClick={() => handleTagClick(tag.label)}
              className="glass glass-hover px-4 py-2 rounded-full text-sm text-foreground/80 hover:text-foreground transition-all flex items-center gap-2"
            >
              <tag.icon className="w-3.5 h-3.5" />
              {tag.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative w-full overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-scroll">
            {[...sampleLogos, ...sampleLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 mx-3"
              >
                <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-2xl bg-[#09090b] border border-white/5 p-2 flex items-center justify-center cursor-pointer hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 shadow-xl group relative overflow-hidden">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-white/90 text-center leading-snug drop-shadow-md">
                        "{logo.name}"
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
