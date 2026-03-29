'use client';

import { Sparkles, Github, Twitter, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  about: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Support', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/Prashan45417241', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/code.craze01/', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/Code456123', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/prashant-rai-8a9b2824a/', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-white/10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-lg opacity-50" />
              </div>
              <span className="text-xl font-bold gradient-text">LogoForge AI</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Create stunning, professional logos in seconds with the power of AI. No design skills required.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest news and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 LogoForge AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
