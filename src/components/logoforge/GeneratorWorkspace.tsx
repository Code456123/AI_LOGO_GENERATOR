'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Share2, Heart, Image as ImageIcon, Sparkles, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { BrandPresentation } from './BrandPresentation';

interface GeneratorWorkspaceProps {
  externalPrompt?: string;
  onOpenAuth?: () => void;
}

export function GeneratorWorkspace({ externalPrompt, onOpenAuth }: GeneratorWorkspaceProps) {
  const [tab, setTab] = useState<'text2img' | 'img2img'>('text2img');
  const [prompt, setPrompt] = useState(externalPrompt || '');
  const [aspectRatio, setAspectRatio] = useState('Square (1:1)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from('profiles').select('credits').eq('id', data.user.id).single()
          .then(({ data: profileData }) => {
            if (profileData) setCredits(profileData.credits);
          });
      }
    });

    if (externalPrompt) {
      setPrompt(externalPrompt);
    }
  }, [supabase, externalPrompt]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferenceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    if (!user) {
      toast('Welcome! Please sign in to start generating your logos.', {
        icon: '👋',
        style: {
          borderRadius: '12px',
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        },
      });
      if (onOpenAuth) {
        setTimeout(onOpenAuth, 500); // Small delay to let user read the toast
      }
      return;
    }

    setIsGenerating(true);
    
    try {
      // Map frontend aspect ratio string to backend expected format
      let formattedRatio = "1:1";
      if (aspectRatio.includes('16:9')) formattedRatio = "16:9";
      else if (aspectRatio.includes('9:16')) formattedRatio = "9:16";

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          aspectRatio: formattedRatio,
          negative_prompt: "blurry, low quality, bad anatomy, text, watermark",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402) {
           throw new Error('Not enough credits. Please check the Pricing section to get more!');
        } else if (response.status === 401) {
           throw new Error('Please sign in to start generating!');
        }
        throw new Error(data.error || 'Failed to generate image. Ensure API Key is correct.');
      }

      // Nvidia API typically returns base64 in `image` field
      if (data.image) {
        setGeneratedImage(`data:image/jpeg;base64,${data.image}`);
      } else if (data.artifacts && data.artifacts[0]?.base64) {
        setGeneratedImage(`data:image/jpeg;base64,${data.artifacts[0].base64}`);
      } else {
        throw new Error('Received unrecognizable image format from AI server');
      }

      setIsSaved(false);
      setCredits(prev => prev !== null ? prev - 1 : null);
      toast.success('Logo Generated Successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Generation failed');
      if (error.message?.includes('Not enough credits') || error.message?.includes('Insufficient Credits')) {
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `logoforge-logo-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed', error);
      // Fallback if fetch fails due to CORS on sample image:
      const a = document.createElement('a');
      a.href = generatedImage;
      a.download = `logoforge-logo-${Date.now()}.png`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Generated Logo',
          text: 'Check out this awesome logo I generated with LogoForge AI!',
          url: window.location.href, // sharing the current url, or the image if supported
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(generatedImage);
      toast.success('Image link copied to clipboard!');
    }
  };

  const handleSave = async () => {
    if (!generatedImage) return;
    if (!user) {
      toast.error('Please log in to save logos!');
      return;
    }

    if (isSaved) {
      toast.success('Logo is already saved in your gallery!');
      return;
    }

    const toastId = toast.loading('Saving to your personal gallery...');

    try {
      // 1. Fetch image blob (to handle both local URLs and future API images)
      let blob: Blob;
      try {
        const response = await fetch(generatedImage);
        blob = await response.blob();
      } catch (err) {
        throw new Error('Could not fetch image for saving. (CORS or network error)');
      }

      // 2. Upload to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-logo.jpg`;
      const { error: storageError } = await supabase
        .storage
        .from('logos')
        .upload(fileName, blob, {
          contentType: blob.type || 'image/jpeg',
          upsert: false
        });

      if (storageError) throw storageError;

      // 3. Get the permanent public URL
      const { data: publicUrlData } = supabase
        .storage
        .from('logos')
        .getPublicUrl(fileName);

      const uploadedUrl = publicUrlData.publicUrl;

      // 4. Save to Database
      const { error: dbError } = await supabase.from('saved_logos').insert({
        user_id: user.id,
        image_url: uploadedUrl,
        prompt: prompt || 'Image-to-Image Variation',
      });

      if (dbError) throw dbError;

      setIsSaved(true);
      toast.success('Saved securely to your private gallery!', { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to save logo securely.', { id: toastId });
    }
  };

  return (
    <section id="generator" className="py-24 relative z-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Logo Generator Workspace</h2>
          <p className="text-muted-foreground text-lg">Your blank canvas for infinite creativity.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
          
          {/* Left Panel - Controls */}
          <div className="glass rounded-[2rem] p-6 md:p-8 space-y-8 relative overflow-hidden backdrop-blur-xl border border-white/5 shadow-2xl bg-black/40">
            {/* Tabs */}
            <div className="flex bg-black/40 rounded-2xl p-1.5 relative z-10 shadow-inner">
              <button
                onClick={() => setTab('text2img')}
                className={cn(
                  "flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                  tab === 'text2img' ? "bg-white/10 text-white shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                Text to Image
              </button>
              <button
                onClick={() => setTab('img2img')}
                className={cn(
                  "flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                  tab === 'img2img' ? "bg-white/10 text-white shadow-lg" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                Image to Image
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-6 relative z-10">
              {tab === 'img2img' && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground/90 block px-1">Reference Image</label>
                  {!referenceImage ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 bg-black/40 border-2 border-dashed border-white/20 hover:border-violet-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors group"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-violet-400 transition-colors mb-4" />
                      <p className="text-sm font-medium text-foreground/80">Click to upload reference image</p>
                      <p className="text-xs text-muted-foreground mt-2">Max 5MB (JPG, PNG, WEBP)</p>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
                      <img 
                        src={referenceImage} 
                        alt="Reference" 
                        className="w-full h-full object-contain"
                      />
                      <button 
                        onClick={() => setReferenceImage(null)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-500/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/90 block px-1">
                  {tab === 'img2img' ? 'Additional Instructions (Optional)' : 'Logo Description'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={tab === 'img2img' ? "Describe any changes or specific styles... (e.g., 'Make it futuristic with neon glow')" : "Describe your dream logo... (e.g., 'Playful logo for a burger restaurant called Big Bite...')" }
                  className="w-full h-36 bg-black/40 border border-white/10 rounded-2xl p-5 text-sm md:text-base text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-violet-500/50 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/90 block px-1">Aspect Ratio</label>
                <div className="relative">
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm md:text-base text-foreground focus:outline-none focus:border-violet-500/50 appearance-none transition-colors shadow-inner"
                  >
                    <option className="bg-zinc-900">Square (1:1)</option>
                    <option className="bg-zinc-900">Landscape (16:9)</option>
                    <option className="bg-zinc-900">Portrait (9:16)</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (tab === 'text2img' && !prompt) || (tab === 'img2img' && !referenceImage)}
                className="w-full min-h-[72px] rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-bold text-lg transition-all hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group py-2"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-3 animate-pulse">
                    <Sparkles className="w-5 h-5 animate-spin" /> Generating...
                  </span>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-3 pt-1">
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Generate Logo
                    </span>
                    {credits !== null && (
                      <span className="text-xs font-normal text-white/80 mt-1">
                        {credits} credits remaining
                      </span>
                    )}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="glass rounded-[2rem] p-6 md:p-8 h-[600px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl border border-white/5 shadow-2xl bg-black/40 group">
            {!generatedImage ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-muted-foreground/60 space-y-6"
              >
                <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <p className="text-base font-medium">Your generated logo will appear here</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col items-center justify-between gap-6"
              >
                <div className="flex-1 w-full flex items-center justify-center relative rounded-2xl overflow-hidden bg-black/20 group-hover:shadow-[0_0_50px_-12px_rgba(124,58,237,0.2)] transition-shadow duration-500">
                  <img
                    src={generatedImage}
                    alt="Generated Logo"
                    className="max-w-full max-h-[440px] object-contain"
                  />
                </div>
                
                <div className="w-full flex-shrink-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 py-4 px-4 glass bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:text-white group/btn"
                    >
                      <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" /> Download
                    </button>
                    <button 
                      onClick={handleSave}
                      className="p-4 glass bg-white/5 hover:bg-white/10 hover:text-rose-400 rounded-2xl text-muted-foreground transition-all group/save"
                    >
                      <Heart className={cn("w-5 h-5 transition-transform duration-300 group-hover/save:scale-110", isSaved && "fill-rose-500 text-rose-500")} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-4 glass bg-white/5 hover:bg-white/10 hover:text-blue-400 rounded-2xl text-muted-foreground transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleGenerate}
                    className="w-full py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl text-sm font-semibold transition-all"
                  >
                    Generate Another
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Brand Presentation Section */}
        {generatedImage && (
          <BrandPresentation logoUrl={generatedImage} />
        )}
      </div>
    </section>
  );
}
