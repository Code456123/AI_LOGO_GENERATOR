'use client';

import { useRef, useEffect, useState } from 'react';
import { Zap, Palette, Download, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Zap,
    title: 'Instant Logo Generation',
    description: 'Create professional logos in seconds with our advanced AI. No design skills required.',
    gradient: 'from-violet-600 to-violet-400',
    glow: 'rgba(124, 58, 237, 0.3)',
  },
  {
    icon: Palette,
    title: 'Fully Customizable Styles',
    description: 'Adjust colors, fonts, layouts, and icon styles to match your brand identity perfectly.',
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: Download,
    title: 'Brand Kit Export',
    description: 'Download your logos in SVG, PNG, and PDF formats. Perfect for any use case.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  {
    icon: Sparkles,
    title: 'AI Color & Font Matching',
    description: 'Smart palette and typography suggestions that make your brand look cohesive and professional.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="features" ref={ref} className="relative py-24 lg:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Powerful{' '}
            <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create stunning logos that define your brand
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-violet-600/50 via-blue-600/50 to-cyan-600/50 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-2xl glass p-8 h-full">
                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${feature.glow}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl bg-gradient-to-br mb-6 flex items-center justify-center',
                        feature.gradient
                      )}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Corner Glow */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
