'use client';

import { useRef, useEffect, useState } from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const communityLogos = [
  { id: 1, name: 'Nebula', creator: '@design_guru', likes: 342, url: '/logo1.jpg' },
  { id: 2, name: 'Pulse', creator: '@creative_mind', likes: 289, url: '/logo2.jpg' },
  { id: 3, name: 'Quantum', creator: '@tech_vibes', likes: 456, url: '/logo3.jpg' },
  { id: 4, name: 'Ethereal', creator: '@artisan_ai', likes: 378, url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Apex', creator: '@brand_master', likes: 523, url: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Nova', creator: '@logo_wizard', likes: 412, url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Vertex', creator: '@design_hub', likes: 298, url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Flux', creator: '@creative_studio', likes: 367, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
];

const stats = [
  { icon: Sparkles, value: '50,000+', label: 'Logos Created' },
  { icon: Users, value: '10,000+', label: 'Active Creators' },
  { icon: Heart, value: '4.9/5', label: 'User Rating' },
];

export function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="community" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0">
        {mounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, Math.random() > 0.5 ? '-20%' : '20%'],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Made by Our{' '}
            <span className="gradient-text">Creator Community</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of designers and brands creating amazing logos with AI
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 lg:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView && mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 mb-3">
                <stat.icon className="w-6 h-6 text-violet-400" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-16"
        >
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[...communityLogos, ...communityLogos].map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-64 group"
              >
                <div className="relative rounded-2xl glass p-6 hover:bg-white/10 transition-all duration-300">
                  {/* Logo Preview */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative bg-black/50">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between z-10 relative">
                    <div>
                      <h3 className="font-semibold">{logo.name}</h3>
                      <p className="text-sm text-muted-foreground">{logo.creator}</p>
                    </div>
                    <div className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-4 h-4 fill-rose-500/20" />
                      <span className="text-sm">{logo.likes}</span>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] glow-purple">
            Join Our Creator Community
            <Sparkles className="inline-block ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
