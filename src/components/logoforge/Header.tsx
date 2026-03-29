'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  onOpenAuth: () => void;
}

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Community', href: '#community' },
];

export function Header({ onOpenAuth }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[72px]">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-lg opacity-50" />
                </div>
                <span className="text-xl font-bold gradient-text">LogoForge AI</span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm font-medium text-white/90">
                      Hi, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onOpenAuth}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={onOpenAuth}
                      className="relative px-5 py-2.5 text-sm font-semibold rounded-xl text-white overflow-hidden btn-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="relative z-10">Sign Up</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white transition-all hover:scale-[1.02] active:scale-[0.98] glow-purple"
                >
                  Generate Logo
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-b border-white/10"
            >
              <nav className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-white/10" />
                {user ? (
                  <>
                    <div className="text-sm font-medium text-white/90 py-2">
                      Hi, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="relative px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-violet-600 to-blue-600 text-center"
                    >
                      Sign Up
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white"
                >
                  Generate Logo
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
