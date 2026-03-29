import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { prompt, aspectRatio, negative_prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. Authenticate user natively via cookies securely
    const supabaseSession = await createClient();
    const { data: { user } } = await supabaseSession.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Please log in to generate logos.' }, { status: 401 });
    }

    // 2. Retrieve user's credit balance
    const { data: profile } = await supabaseSession
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (!profile || profile.credits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient Credits: You have run out of logo generations. Please upgrade your plan!' 
      }, { status: 402 });
    }

    const invoke_url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium";
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA API key not configured on server' }, { status: 500 });
    }

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    };

    const payload = {
      prompt,
      cfg_scale: 5,
      aspect_ratio: aspectRatio || "1:1",
      seed: 0,
      steps: 50,
      negative_prompt: negative_prompt || "",
    };

    const response = await fetch(invoke_url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error("Nvidia API Error:", errorData);
        return NextResponse.json({ error: 'Failed to generate image from AI (Nvidia limit reached or server busy)' }, { status: response.status });
    }

    const response_body = await response.json();

    // 3. Deduct 1 credit upon strict success. 
    // Uses the authenticated session (cookies) to call a SECURITY DEFINER RPC, bypassing RLS fully.
    const { error: updateError } = await supabaseSession
      .rpc('decrement_credits', { user_id: user.id });

    if (updateError) {
      console.error("Failed to deduct credits:", updateError);
    }

    return NextResponse.json(response_body);
  } catch (error: any) {
    console.error('Generation Endpoint Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
