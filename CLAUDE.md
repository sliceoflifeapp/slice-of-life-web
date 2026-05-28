# Slice of Life — Marketing Website

Landing page for Slice of Life, a Mac app that auto-edits a day's iPhone/camera footage into a narrated journal video.

## Project

- **Goal**: Drive downloads of the Mac app (DMG)
- **Audience**: iPhone users, casual videographers, journalers, memory-keepers
- **Tone**: Warm, personal, quietly premium — not techy, not corporate
- **URL**: TBD (will be deployed as static site)

## Design System

- **Color scheme**: Deep blue gradient — mirrors the app's ambient glow aesthetic
  - Background: near-black navy (`#070e1f` or similar)
  - Primary blue: `#326EE1` (app's glass button fill base)
  - Accent / glow: `rgba(120, 185, 255, 0.4)` (app's glass border)
  - Text: white (`#fff`) for headings, `rgba(255,255,255,0.7)` for body
- **Font**: Montserrat (same as app) — weight 700 for headings, 400 for body
- **Buttons**: Glass style — `rgba(50, 110, 225, 0.52)` fill, `rgba(120, 185, 255, 0.38)` border, blue outer glow
- **Headings**: `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.06em`
- **No intro animation** — clean, fast-loading static page

## App Facts (for copy)

- Mac app (Electron), Apple Silicon + Intel
- Drag in footage → AI picks the best moments → exports a narrated video with captions
- Uses on-device Whisper for transcription (private, no upload)
- Uses Claude (Anthropic) for vision and narration selection
- Outputs: MP4 + Premiere Pro XML
- Current version: 0.1.26 beta
- Download: DMG file

## Stack

- Plain HTML / CSS / JS — no framework, no build step
- Single `index.html` is fine for v1
- Fonts loaded from Google Fonts or local (Montserrat)
- No backend needed — static hosting (Netlify, Vercel, or GitHub Pages)

## File Structure

```
gather-web/
  index.html
  css/
    style.css
  js/
    main.js        (if needed)
  fonts/           (if self-hosting Montserrat)
  assets/
    screenshots/   (app screenshots)
    icon.png       (app icon)
  CLAUDE.md
```

## Sections (planned)

1. **Hero** — headline, subheadline, download CTA button
2. **How it works** — 3-step visual (film → drop → watch)
3. **Features** — key selling points (AI narration, captions, Premiere XML, on-device privacy)
4. **Screenshots / preview** — app UI or sample output
5. **Download** — prominent CTA, version number, system requirements

## Copy Notes

- Lead with the feeling, not the feature: "Your day, remembered." not "AI video editor"
- Privacy angle is strong: "Everything stays on your Mac"
- The "no effort" angle: "Drop your footage. Done."
- Beta framing: early access, free during beta

## Recent Work

### Session 1 — Full page build
- Built complete landing page: Nav → Hero → Promo video → Testimonial strip → How it works → Feature showcase → FAQ → Download → Footer
- Favicon: `assets/icon.png` (copied from `~/Desktop/Slice of Life/Slice of Life - White Icon.png`)
- Pricing: $49 one-time purchase (not free/beta)
- Hero app mockup: 4 Unsplash photo thumbnails + white icon logo at 36px
  - `photo-1494790108377` (woman portrait), `photo-1476514525535` (hiking), `photo-1517841905240` (lifestyle), `photo-1511988617509` (group)
- How it works: 3 steps with NLE timeline SVG icon for step 2
- Feature showcase: 2-row grid — walkthrough video card, b-roll (camera SVG), narration (waveform SVG), customization (configure UI SVG), XML (timeline SVG), Today's Prompt (app card)
  - Card art: `position: absolute; inset: 0` with `display: flex; align-items: center; justify-content: center`
  - SVG vertical centering: adjusted `viewBox` minY to add equal top/bottom padding (Customization: `viewBox="0 -13 260 200"`, XML: `viewBox="0 -6 220 140"`)
- FAQ: 3-column accordion from app FAQ content; `max-height: 0` → `300px` CSS transition
- Testimonial strip: thin banner between promo video and How it works
- Copy: pain points woven in — "You filmed it. Now what?" / "No sorting, no renaming, no prep" / "No timeline. No tutorials. No $500 editor" / "Your memories deserve to be watched"
- Today's Prompt copy: personalized-history angle — "You've been filming a lot at home lately…"

### Session 2 — Premium polish pass (Emil + taste-skill)
- **Custom easing curves**: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` added to `:root`; used on all interactive transitions
- **Noise texture**: `body::after` fixed overlay — SVG `feTurbulence` data URI at 3% opacity, 180px tile; gives dark background a premium grain without being visible
- **Gradient headline**: "Document your day." wrapped in `<span class="gradient-text">` — white → `#9ECFFF` gradient via `background-clip: text`
- **Hero headline letter-spacing**: tightened `0.04em` → `0.025em` (Emil: at large sizes tight spacing reads more refined)
- **Body text hierarchy**: `.hero-sub` 80% → 65% white; `.step-desc` + `.showcase-desc` 80% → 62% white for better contrast against headings
- **Button press feedback**: `.btn-primary:active` + `.nav-cta:active` → `transform: scale(0.97)` for tactile response
- **Nav scroll state**: JS adds `.nav--scrolled` after 40px; darkens background to 97% opacity + adds shadow
- **Mockup float**: `.hero-mockup` has `float` keyframe (±7px, 4.5s ease-in-out loop); `prefers-reduced-motion` disabled
- **Showcase card hover**: subtle `translateY(-2px)` lift + soft blue outer glow (`box-shadow`)
- **Asymmetric FAQ**: closes fast with `ease-in` (0.18s), opens slower with `ease-out` (0.3s)
- **Scroll reveal**: updated to `scale(0.97) + translateY(12px)` baseline with `var(--ease-out)`; duration slowed to 0.9s; stagger resets per section (120ms between items, max 500ms cap) so each section cascades independently rather than all firing simultaneously

### Session 3 — Brand guide dead-space fixes + export

**Brand guide file**: `brand-guide.html` (also saved to `~/Desktop/Slice of Life/Slice of Life - Brand Guide.html`)  
**Brand guide PDF**: `~/Desktop/Slice of Life/Slice of Life - Brand Guide.pdf` (1.1 MB, 21 pages, generated via Chrome headless)

#### Dead-space fixes applied to every content page:

- **Page 11 (Logo Don'ts)**: `.logo-dont-preview` height 60pt → 80pt; added two-column "Clear Space Rule / Background Guidance" section below the grid
- **Page 13 (Primary Colors)**: Added "Approved Combinations" — four mini live-demo tiles showing headline, section label, body copy, and glass button on navy
- **Page 14 (Secondary Palette & Effects)**: Added two-column section — "Glass — When to Use" (do/don't bullets) + "Glow Elevation Scale" (three live box-shadow demo boxes: resting / active / hover)
- **Page 16 (Typeface)**: Added "Character Set" — two specimen panels: full uppercase alphabet at 15pt and numerals & symbols at 15pt
- **Page 17 (Use of Type)**: Added third row of type-usage cards — "Button / CTA" (live glass button demo) and "Caption / Meta" (version string example)
- **Page 19 (UI Patterns)**: Added "Navigation Bar" card (live nav demo + rgba specs) and "Spacing System" card (visual 4pt base unit scale with colored bars)
- **Page 20 (Website)**: Added "Hero Anatomy" panel — structured reference for badge, headline, subhead, actions, and app mockup specs
- **Page 21 (Social Media)**: Added "Format Reference" (four cards: feed post, story/reel, Twitter/X, App Store pixel sizes) and "Caption Tone" callout box

#### Glow fix (carried over from Session 2, documented here):
- Corner glows on all pages use `background-image: radial-gradient(ellipse X% Y% at 100% 0%, ...)` anchored directly to page corners — avoids the overflow-clipping issue that cut off `::before`/`::after` pseudo-elements
- Classes: `.glow-tr` (top-right), `.glow-bl` (bottom-left), `.glow-center`, combined `.glow-tr.glow-bl`

#### PDF generation command:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --no-pdf-header-footer \
  --print-to-pdf="OUTPUT.pdf" \
  "file:///Users/nathangriffey/Desktop/gather-web/brand-guide.html"
```
Run from any directory — uses the gather-web source so `assets/icon.png` resolves correctly.

---

## Pending / Next Session

### Landing page (gather-web)
- **Hero video**: Replace app mockup with actual video showing files dropped in → example edit plays
- **Real testimonials**: Replace 3 placeholder quotes with real beta user quotes + names/photos
- **Real app output example**: Show what a finished Slice actually looks like (highest-impact missing element)
- **Pricing/purchase flow**: Wire up Lemon Squeezy $49 button — use `class="lemonsqueezy-button"` overlay checkout, no separate page needed; tax category = Downloadable Software
- **Email capture**: Softer CTA for users not ready to buy
- **Founder story section**
- **Footer links**: Privacy policy, contact, social media
- **OG/social meta tags** for sharing
- **GitHub/deployment setup**

### Brand guide
- HTML source: `gather-web/brand-guide.html`
- Saved copies: `~/Desktop/Slice of Life/Slice of Life - Brand Guide.html` + `.pdf`
- No outstanding issues — all pages filled, glows fixed
