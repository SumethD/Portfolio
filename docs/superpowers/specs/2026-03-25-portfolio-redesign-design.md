# Portfolio Redesign — Design Spec
**Date:** 2026-03-25
**Project:** sumethdl.xyz — Full portfolio redesign
**Status:** Approved

---

## Overview

Complete redesign of Sumeth D.L's personal portfolio (D:\Portfolio — React/Vite/Tailwind). The redesign elevates the site from a dark cyberpunk aesthetic to a **Bold Editorial** style with **full-page snap scroll** navigation. All content is updated from the latest resume, including two new featured projects (Creitr, SimpliFlow) and a new Leadership section.

---

## Design Direction

### Aesthetic: Bold Editorial
- Oversized **Playfair Display** serif headlines (italic accents in muted color `#333`)
- **Inter** for all body text, labels, and UI elements
- Color palette: near-black backgrounds (`#050505`–`#080808`), white text, orange accent `#ff5500`
- Thin rules and gradient lines (orange → transparent) as editorial dividers
- Section kickers: `10px`, `0.25em` letter-spacing, orange, monospace, with a `24px` orange rule prefix
- Minimal decoration — no particle backgrounds, no corner borders

### Navigation: Full-Page Snap Scroll
- Sticky top nav bar (`52px` height, frosted glass `backdrop-filter: blur(12px)`)
- Nav items: Work, Experience, About, Contact — `11px` uppercase, letter-spaced
- "Hire me" CTA in top-right: orange border, uppercase
- Fixed left progress bar (`2px` wide) — fills based on current section index (e.g. section 2 of 5 = 40%)
- Section counter label (`01 — HOME`) top-left of each section, decorative
- Smooth `scroll-snap-type: y mandatory` on the main scroll container (`<main>` wrapper div in `App.jsx`)

---

## Sections

### 01 — Hero
**Purpose:** First impression, establish identity and credibility.

**Layout:** Full viewport. Content left-aligned, max-width 900px, `padding: 0 40px`.

**Content:**
- Availability badge: green dot + "Open to opportunities · Melbourne, AU" — bordered pill
- Kicker: `SUMETH D.L — JUNIOR SOFTWARE ENGINEER`
- Headline: `"Building fast, shipping clean."` — Playfair Display, `clamp(52px, 8vw, 96px)`, italic on "fast,"
- Subtext: tech stack + "Founder of Creitr. Built SimpliFlow. Production experience shipping features to 1,500+ users."
- Metrics row (4 stats, separated by `1px` vertical rules):
  - `+58%` — Page load performance
  - `1,500+` — Users in production
  - `3` — Live products
  - `~28%` — Registration growth
- **Data consistency note:** Hero metrics are derived from the IFFA role in Section 03. If any metric changes, update both the Hero metrics row and the Experience section bullet simultaneously.
- Scroll hint: `↓ scroll` bottom-left with vertical gradient line above

---

### 02 — Work
**Purpose:** Showcase projects, lead with founder work.

**Layout:** Full viewport. Max-width 900px.

**Content:**
- Headline: `"Products built & shipped."` — Playfair serif, italic on "built"
- **Featured row** (2-column grid): Creitr + SimpliFlow
  - Each: orange top-edge gradient line, founder badge, live link arrow `↗`, description, tech tag pills
  - Creitr: shows `85 PageSpeed` badge, React 19 / Convex / Clerk / Stripe / Resend
  - SimpliFlow: AI automation agency, React / Tailwind / n8n / AI Automation
- **Grid row** (3-column): Super Price, Hal-Bot, Savorly-AI
  - Compact cards — type label, name (muted), short description

**Project order:** Creitr → SimpliFlow → Super Price → Hal-Bot → Savorly-AI

---

### 03 — Experience & Leadership
**Purpose:** Work history with accurate metrics + leadership credential.

**Layout:** Full viewport. 2-column grid for work roles, full-width row for leadership.

**Content:**

**IFFA Windsor** (Mar 2024 – Sep 2024) — Software Engineer (Front-End)
- Rebuilt PHP portal → React/TypeScript: **+58% page load performance**, **+34.6% user engagement**
- Onboarding journey: **1,500+ users adopted**, drove **~28% registration growth**
- Real-time API integration: **+38% page views**
- Agile: sprint planning, code reviews, retrospectives

**Leica Biosystems** (Nov 2022 – Present) — Product Assembler / Lab Support
*(Display as "Present" — role is ongoing as of March 2026)*
- Python Kanban app → **100% inventory digitisation**
- Precision assembly on **$100K–$200K instruments**
- **98.3% accuracy** on component builds
- R&D documentation in Peloris cell

**RUSU — Team Lead** (Feb 2022 – Dec 2023) *(full-width card, tagged "Leadership")*
- Led **5 projects**, engaged **100+ students**
- **+40% participation** increase through mentoring
- Cross-team coordination & stakeholder communication

---

### 04 — About & Skills
**Purpose:** Personal bio, education, and skill categories.

**Layout:** Full viewport. 2-column — bio/education left, skill categories right.

**Bio (updated from resume):**
> "Results-driven Software Engineer with production experience shipping features to 1,500+ users. Skilled in React, TypeScript, Spring Boot, and AWS — with a track record of measurable impact. Combines strong front-end engineering with automation, data pipeline, and cloud-native development capabilities. Proven ability to own features end-to-end from architecture through production debugging."

**Education:** Bachelor of Computer Science — RMIT University · Melbourne, VIC · 2021–2024

**Skill Categories (4):**
1. **Front-End:** React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Next.js
2. **Backend & Cloud:** Node.js, Python, Spring Boot, Flask, AWS, Git
3. **Automation & AI** *(new)*: n8n workflows, Prompt Engineering, Claude API, ChatGPT, Cursor, Gemini
4. **Data:** SQL, SQLite, Pandas, DynamoDB, Supabase

Skills displayed as tag clouds (bordered pill chips), not progress bars.

---

### 05 — Contact
**Purpose:** Simple, direct conversion to email or LinkedIn.

**Layout:** Full viewport. Left-aligned, max-width 900px.

**Content:**
- Headline: `"Let's build something."` — Playfair serif, same scale as hero
- Contact info row: Email · Location (Clyde North, VIC) · Response time (24–48 hours)
- Primary CTA: `✉ Send an email` → `mailto:sumethlokuliyana76@gmail.com` — white button, black text
- Secondary: `or connect on LinkedIn →`
- Social links footer strip: GitHub · LinkedIn · sumethdl.xyz
- Phone: +61 448 533 871 (optional, can be omitted for privacy)

---

## Technical Architecture

### Stack (unchanged)
- React 19 + Vite
- Tailwind CSS
- Framer Motion (animations)
- EmailJS (contact form, if re-added later)

### New Dependencies
- **`@fontsource/playfair-display`** — serif headlines. Install via npm; import the specific weights used:
  ```js
  // main.jsx or index.css
  import '@fontsource/playfair-display/400.css'
  import '@fontsource/playfair-display/400-italic.css'
  import '@fontsource/playfair-display/700.css'
  import '@fontsource/playfair-display/700-italic.css'
  ```
- **`@fontsource/inter`** — body text and UI labels. Import variable weight:
  ```js
  import '@fontsource-variable/inter'
  ```
- Remove: `ogl` (WebGL particle library) — no longer needed
- Remove: `bezier-easing` — no longer needed

### Component Structure
```
src/
  components/
    Navbar.jsx          — sticky top nav, blur, "Hire me" CTA
    Hero.jsx            — section 01
    Work.jsx            — section 02 (replaces Projects.jsx)
    Experience.jsx      — section 03 (updated)
    About.jsx           — section 04 (updated)
    Contact.jsx         — section 05 (updated)
    ProgressBar.jsx     — fixed left 2px progress indicator (new)
  App.jsx               — snap scroll container, section refs
  index.css             — scroll-snap, font imports, global resets
```

**Remove:** `ParticleBackground.jsx`, `Particles.jsx`, `PageTransition.jsx`, `FuzzyText.jsx`

### Scroll Snap Implementation
The scroll container is a `<main>` element in `App.jsx` that wraps all 5 sections. Snap is applied to this element, not to `html`:

```css
/* index.css */
main.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
section {
  scroll-snap-align: start;
  min-height: 100vh;
}
```

**Progress bar:** Tracks current section index using an `IntersectionObserver` on each section ref in `App.jsx`. N is **1-indexed** (first section = 1, last = 5). When section N becomes visible, `ProgressBar` fills to `(N / totalSections) * 100%` — so section 1 shows 20%, section 5 shows 100%. This is more reliable than raw `scrollY` math with snap scroll.

### Animation Approach
- Framer Motion `useInView` for section entry animations (fade + y translate)
- Hero metrics: staggered count-up on mount using `framer-motion` variants
- Project cards: subtle `y: 20 → 0` + opacity fade on scroll into view
- No particle backgrounds, no canvas effects
- No `AnimatePresence` — sections remain mounted; transitions handled via `useInView` per-section

---

## Content Changes Summary

| Item | Change |
|------|--------|
| Creitr | **Added** — featured project #1, Founder & Solo Engineer |
| SimpliFlow.net | **Added** — featured project #2, Founder |
| IFFA metrics | **Updated** — +58% (was 60%), +34.6% engagement, ~28% registrations |
| RUSU Leadership | **Added** — new section in Experience |
| Automation & AI skills | **Added** — n8n, Claude, Prompt Engineering, Cursor |
| Particle background | **Removed** |
| FuzzyText / WebGL | **Removed** |
| Sidebar nav | **Replaced** with sticky top bar + snap scroll |
| Pricing section | Already removed |
| Location | Updated to Clyde North, VIC |

---

## Out of Scope
- Blog or writing section
- Dark/light mode toggle
- CMS integration
- Password-protected work samples
- Analytics integration (can be added post-launch)
