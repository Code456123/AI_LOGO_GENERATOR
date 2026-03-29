import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20' as any
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    if (!signature || !webhookSecret) {
       // Only for local testing if secrets are missing!
       event = JSON.parse(body);
    } else {
       event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.metadata?.userId;
    const planName = session.metadata?.planName;
    
    if (userId) {
       // Initialize heavily-privileged Supabase client to bypass RLS for webhook updates
       const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
       const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
       const supabase = createClient(supabaseUrl, supabaseServiceKey);
       
       let creditsToAdd = 0; 
       if (planName === 'Pro') creditsToAdd = 500;
       if (planName === 'Enterprise') creditsToAdd = 5000;
       
       if (creditsToAdd > 0) {
           const { data: profile } = await supabase.from('profiles').select('credits').eq('id', userId).single();
           
           if (profile) {
               const { error } = await supabase.from('profiles').update({ 
                   credits: profile.credits + creditsToAdd,
                   subscription_tier: planName?.toLowerCase() || 'pro'
               }).eq('id', userId);

               if (error) {
                 console.error('Failed to update user profile upon checkout completion:', error);
               }
           }
       }
    }
  }

  return NextResponse.json({ received: true });
}
