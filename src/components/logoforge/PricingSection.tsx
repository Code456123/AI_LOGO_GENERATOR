'use client';

import { useRef, useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for trying out LogoForge',
    features: [
      '5 logo generations per month',
      'PNG downloads',
      'Basic styles',
      'Community gallery access',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, annual: 15 },
    description: 'For creators and small businesses',
    features: [
      'Unlimited logo generations',
      'SVG, PNG, PDF downloads',
      'All styles & customization',
      'Brand kit export',
      'Priority queue',
      'Commercial license',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: { monthly: 99, annual: 79 },
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'API access',
      'Team collaboration',
      'White-label option',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export function PricingSection({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = async (plan: any) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    if (plan.name === 'Free') {
       toast.success('You are already on the Free plan!');
       return;
    }
    
    const toastId = toast.loading('Redirecting to secure checkout...');
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           planName: plan.name,
           isAnnual: isAnnual,
        }),
      });

      const session = await response.json();
      
      if (session.error) {
        throw new Error(session.error);
      }

      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL returned from Stripe');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized' && onOpenAuth) {
        toast.dismiss(toastId);
        onOpenAuth();
      } else {
        toast.error('Checkout failed. ' + err.message, { id: toastId });
      }
    }
  };

  return (
    <section id="pricing" ref={ref} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="gradient-text">Transparent</span>{' '}
            Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={cn('text-sm', !isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              'relative w-14 h-7 rounded-full transition-colors duration-300',
              isAnnual ? 'bg-gradient-to-r from-violet-600 to-blue-600' : 'bg-white/10'
            )}
          >
            <motion.div
              animate={{ x: isAnnual ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={cn('text-sm', isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
            Annual
            <span className="ml-2 text-xs text-emerald-400 font-medium">Save 20%</span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {plan.highlighted && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 rounded-2xl opacity-50 blur-sm" />
              )}
              <div
                className={cn(
                  'relative rounded-2xl h-full transition-all duration-300',
                  plan.highlighted ? 'glass' : 'glass'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-xs text-emerald-400 mt-1">
                        Billed ${plan.price.annual * 12} annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePayment(plan)}
                    className={cn(
                      'w-full py-3 rounded-xl font-semibold transition-all duration-300',
                      plan.highlighted
                        ? 'bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white hover:scale-[1.02] active:scale-[0.98] glow-purple'
                        : 'glass glass-hover hover:bg-white/10 text-foreground'
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
