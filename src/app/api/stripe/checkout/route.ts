import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20' as any // Explicit cast to avoid type issues with newer/older stripe SDK versions
});

export async function POST(req: Request) {
  try {
    const { priceId, isAnnual, planName } = await req.json();
    
    // Get user from supabase to attach to checkout session metadata
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Determine unit amount dynamically based on selection
    let unitAmount = 0;
    if (planName === 'Pro') unitAmount = isAnnual ? 1500 * 12 : 1900;
    if (planName === 'Enterprise') unitAmount = isAnnual ? 7900 * 12 : 9900;

    if (unitAmount === 0) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `LogoForge ${planName} Plan (${isAnnual ? 'Annual' : 'Monthly'})`,
              description: 'AI Logo Generation Subscription & Credits',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // using generic payment mode for demonstration
      success_url: `${req.headers.get('origin')}/?payment=success`,
      cancel_url: `${req.headers.get('origin')}/#pricing`,
      metadata: {
        userId: user.id,
        planName,
        isAnnual: isAnnual ? 'true' : 'false',
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
