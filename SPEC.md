# LogoForge AI - Specification Document

## 1. Project Overview

**Project Name:** LogoForge AI
**Type:** Premium AI-powered logo generation platform website
**Core Functionality:** Dark futuristic landing page showcasing AI logo generation capabilities with glassmorphism UI, neon glow accents, and smooth animations
**Target Users:** Designers, startups, entrepreneurs, and businesses seeking AI-generated logos

---

## 2. Visual & Rendering Specification

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Background Dark | `#0A0A0F` | Primary background |
| Background Secondary | `#0F0F1A` | Section backgrounds |
| Surface Glass | `rgba(255,255,255,0.04)` | Glassmorphism cards |
| Border Glass | `rgba(255,255,255,0.08)` | Card borders |
| Primary Purple | `#7C3AED` | Primary accent, buttons |
| Electric Blue | `#3B82F6` | Secondary accent |
| Turquoise | `#06B6D4` | Tertiary accent |
| Text Primary | `#FFFFFF` | Headlines |
| Text Secondary | `#A1A1AA` | Body text |
| Glow Purple | `rgba(124,58,237,0.5)` | Hover glows |

### Typography
- **Headlines:** Space Grotesk, 700-900 weight
  - Hero: 64px (clamp: 40px - 72px)
  - Section headers: 48px (clamp: 32px - 48px)
  - Card titles: 24px
- **Body:** Inter, 400-500 weight, 16px, line-height 1.6
- **Gradient Text:** Purple (#7C3AED) to Turquoise (#06B6D4)

### Glassmorphism Style
```css
background: rgba(255,255,255,0.04);
backdrop-filter: blur(16px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16-20px;
box-shadow: 0 8px 32px rgba(0,0,0,0.3);
```

---

## 3. Page Structure Specification

### 3.1 Header (Fixed)
- **Position:** Fixed top, z-index 50
- **Background:** `rgba(10,10,15,0.8)` with `backdrop-filter: blur(20px)`
- **Height:** 72px
- **Layout:** Logo (left) | Nav links (center) | CTA button (right)
- **Logo:** "LogoForge AI" text with gradient
- **Nav Links:** Features, Pricing, Gallery, Community, Login, Sign Up
- **CTA Button:** "Generate Logo" with gradient glow
- **Mobile:** Hamburger menu with slide-down drawer

### 3.2 Hero Section
- **Height:** 100vh
- **Background:** Animated gradient (purple/blue/turquoise subtle blobs)
- **Headline:** "Create Stunning Logos with AI"
- **Subheadline:** "Turn your ideas into professional logo designs in seconds"
- **Prompt Box:**
  - Glassmorphism container with animated gradient border
  - Placeholder: "Describe your dream logo..."
  - Focus: Glowing border animation
  - Button: "Generate" with gradient
- **Example Tags:** "Modern Tech Logo", "Luxury Brand", "Minimalist Icon"
- **Logo Carousel:** Horizontal auto-scrolling showcase below prompt
- **Parallax:** Floating orbs move on mouse

### 3.3 Features Section
- **Layout:** 2x2 grid (4 cards)
- **Background:** Dark gradient
- **Cards:** Glassmorphism with animated gradient borders
  1. "Instant Logo Generation" - Icon + description
  2. "Fully Customizable Styles" - Icon + description
  3. "Brand Kit Export (SVG, PNG, PDF)" - Icon + description
  4. "AI-Powered Color & Font Matching" - Icon + description
- **Hover:** Lift + glow intensification

### 3.4 Gallery Section
- **Layout:** CSS Grid masonry-style
- **Filters:** All, Tech, Luxury, Minimalist, Retro, Abstract
- **Cards:** Logo image with hover overlay
- **Overlay:** Logo name, tags, "Regenerate Similar" button
- **Animation:** Scroll-triggered fade-in

### 3.5 Pricing Section
- **Layout:** 3 cards (Free, Pro, Enterprise)
- **Pro Card:** Highlighted with neon purple border, "Most Popular" badge
- **Toggle:** Monthly/Annual billing
- **Cards:** Price, features list, CTA button

### 3.6 Community Section
- **Background:** Subtle particle/star field
- **Carousel:** Horizontal scroll of community logos
- **Stats:** "50,000+ logos created", "10,000+ creators"
- **CTA:** "Join Our Creator Community"

### 3.7 Footer
- **Columns:** 3 (About, Resources, Social Links)
- **Background:** Deep dark with top gradient
- **Social Icons:** Twitter, Instagram, Discord, LinkedIn

---

## 4. Interactions Specification

### Animations
| Element | Animation | Duration |
|---------|-----------|----------|
| Page load | Fade in | 300ms |
| Scroll sections | Fade + slide up | 400ms |
| Button hover | Scale 1.02 + glow | 200ms |
| Card hover | Lift + border glow | 250ms |
| Prompt focus | Border glow pulse | 200ms |
| Gradient text | Background position shift | 3s loop |
| Carousel | Infinite scroll | 30s loop |

### Parallax Effects
- Hero floating orbs: `translateY` and `translateX` on mouse move
- Background blobs: Subtle movement opposite to mouse

### Modal
- Login/Signup modal with glassmorphism
- Tabs: Login | Sign Up
- Input fields with neon glow on focus
- Google OAuth button
- Close button (X)

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop | 1200px+ | Full multi-column |
| Tablet | 768px-1199px | 2-column grids |
| Mobile | <768px | Single column, hamburger |

---

## 6. Technical Implementation

### Framework
- Next.js 15 (App Router)
- TypeScript 5+
- TailwindCSS 4
- Lucide React icons

### Key Dependencies
- `framer-motion` - Animations
- `clsx` / `tailwind-merge` - Class utilities

### Components
- Header
- HeroSection
- PromptBox
- LogoCarousel
- FeaturesSection
- FeatureCard
- GallerySection
- PricingSection
- PricingCard
- CommunitySection
- Footer
- AuthModal

---

## 7. Acceptance Criteria

- [ ] Header fixed with blur effect, navigation functional
- [ ] Hero section displays with gradient text and prompt box
- [ ] Prompt box has animated border on focus
- [ ] Example tags clickable and fill prompt
- [ ] Features section with 4 glowing cards
- [ ] Gallery with filter tabs and hover effects
- [ ] Pricing section with 3 plans and toggle
- [ ] Community carousel with auto-scroll
- [ ] Footer with 3 columns
- [ ] Login/Signup modal opens and closes
- [ ] All animations smooth and performant
- [ ] Fully responsive on all breakpoints
- [ ] No console errors
- [ ] Build passes successfully
