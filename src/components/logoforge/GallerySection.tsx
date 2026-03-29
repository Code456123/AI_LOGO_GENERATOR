'use client';

import { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | 'tech' | 'luxury' | 'minimalist' | 'retro' | 'abstract';

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Tech', value: 'tech' },
  { label: 'Luxury', value: 'luxury' },
  { label: 'Minimalist', value: 'minimalist' },
  { label: 'Retro', value: 'retro' },
  { label: 'Abstract', value: 'abstract' },
];

const galleryItems = [
  { id: 1, name: 'TechFlow', category: 'tech', url: '/logo1.jpg' },
  { id: 2, name: 'Luxe', category: 'luxury', url: '/logo2.jpg' },
  { id: 3, name: 'Zen', category: 'minimalist', url: '/logo3.jpg' },
  { id: 4, name: 'RetroWave', category: 'retro', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Neural', category: 'abstract', url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'CloudBase', category: 'tech', url: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Aurelia', category: 'luxury', url: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Pure', category: 'minimalist', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400' },
  { id: 9, name: 'Neon', category: 'retro', url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400' },
  { id: 10, name: 'Prism', category: 'abstract', url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Byte', category: 'tech', url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=400' },
  { id: 12, name: 'Royal', category: 'luxury', url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=400' },
];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" ref={ref} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Logo{' '}
            <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore stunning logos created by our community
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white glow-purple'
                  : 'glass hover:bg-white/10 text-muted-foreground hover:text-foreground'
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView && mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute inset-0 rounded-2xl glass p-4 flex items-center justify-center overflow-hidden">
                {/* Logo Preview */}
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.name}
                    className={cn(
                      'w-full h-full object-cover transition-transform duration-500',
                      hoveredId === item.id && 'scale-110'
                    )}
                  />
                </div>

                {/* Hover Overlay */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl flex flex-col justify-end p-4 transition-opacity duration-300',
                    hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                  <span className="text-white/60 text-xs capitalize mb-3">{item.category}</span>
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Regenerate Similar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
