# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign sumethdl.xyz from a dark cyberpunk sidebar SPA into a Bold Editorial full-page snap-scroll portfolio with updated content from the latest resume.

**Architecture:** Five full-viewport snap-scroll sections (`<main>` as scroll container) with a sticky frosted-glass Navbar, a fixed left ProgressBar driven by IntersectionObserver, and Framer Motion `useInView` animations per section. All canvas/WebGL/particle components are deleted; Playfair Display + Inter replace the existing typography.

**Tech Stack:** React 19, Vite, Tailwind CSS, Framer Motion, `@fontsource/playfair-display`, `@fontsource-variable/inter`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | Add font packages, remove unused deps |
| Modify | `tailwind.config.js` | Add Playfair Display + Inter font families, orange accent |
| Rewrite | `src/index.css` | Global resets, snap-scroll container, font imports |
| Rewrite | `src/App.jsx` | Snap-scroll `<main>`, section refs, IntersectionObserver, render order |
| Rewrite | `src/components/Navbar.jsx` | Sticky top nav, frosted glass, "Hire me" CTA |
| Create | `src/components/ProgressBar.jsx` | Fixed 2px left bar, section-index-based fill |
| Rewrite | `src/components/Hero.jsx` | Section 01 — headline, badge, 4 metrics |
| Create | `src/components/Work.jsx` | Section 02 — featured + grid projects |
| Rewrite | `src/components/Experience.jsx` | Section 03 — IFFA, Leica, RUSU |
| Rewrite | `src/components/About.jsx` | Section 04 — bio, 4 skill categories |
| Rewrite | `src/components/Contact.jsx` | Section 05 — mailto CTA, socials |
| Delete | `src/components/Projects.jsx` | Replaced by Work.jsx |
| Delete | `src/components/Particles.jsx` | No longer needed |
| Delete | `src/components/ParticleBackground.jsx` | No longer needed |
| Delete | `src/components/PageTransition.jsx` | No longer needed |
| Delete | `src/components/FuzzyText.jsx` | No longer needed |
| Modify | `index.html` | Update `<title>` |

---

## Task 1: Dependencies & Font Setup

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Modify: `index.html`

- [ ] **Step 1: Install font packages and remove unused deps**

```bash
cd D:/Portfolio
npm install @fontsource/playfair-display @fontsource-variable/inter
npm uninstall ogl bezier-easing
```

Expected: No errors. `node_modules/@fontsource/playfair-display` exists.

- [ ] **Step 2: Import fonts in `src/index.css`**

Replace the entire `src/index.css` with:

```css
/* Fonts */
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/playfair-display/400-italic.css';
@import '@fontsource/playfair-display/700.css';
@import '@fontsource/playfair-display/700-italic.css';
@import '@fontsource-variable/inter';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global resets */
*, *::before, *::after { box-sizing: border-box; }

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #060606;
  color: #ffffff;
}

/* Snap scroll container — applied to <main> in App.jsx */
main.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Each section snaps to viewport top */
section.snap-section {
  scroll-snap-align: start;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Custom scrollbar */
main.snap-container::-webkit-scrollbar { width: 0; }
```

- [ ] **Step 3: Update `tailwind.config.js`**

Replace the contents with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['InterVariable', 'Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        accent: '#ff5500',
        dark: {
          DEFAULT: '#060606',
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
          400: '#222222',
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Update `index.html` title**

In `index.html`, change `<title>` to:
```html
<title>Sumeth D.L — Software Engineer</title>
```

- [ ] **Step 5: Verify fonts load**

```bash
npm run dev
```

Open http://localhost:5173. Open browser DevTools → Network → filter "playfair". Confirm font files are loaded (status 200). No console errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tailwind.config.js src/index.css index.html
git commit -m "feat: add Playfair Display + Inter fonts, update tailwind config"
```

---

## Task 2: ProgressBar Component

**Files:**
- Create: `src/components/ProgressBar.jsx`

The progress bar is a fixed 2px-wide vertical strip on the left edge. It receives the current section index (1-indexed, 1–5) and fills proportionally.

- [ ] **Step 1: Create `src/components/ProgressBar.jsx`**

```jsx
import { motion } from 'framer-motion'

// activeSection: 1-indexed (1 = first section, 5 = last)
// totalSections: total count (5)
export default function ProgressBar({ activeSection, totalSections }) {
  const fillPercent = (activeSection / totalSections) * 100

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-50"
      style={{ width: '2px', background: '#0f0f0f' }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{ background: '#ff5500', borderRadius: '0 0 2px 2px' }}
        animate={{ height: `${fillPercent}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify no import errors**

```bash
npm run build 2>&1 | head -20
```

Expected: Build succeeds (exit 0). If errors, fix imports.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressBar.jsx
git commit -m "feat: add ProgressBar component with section-index fill"
```

---

## Task 3: Navbar Component

**Files:**
- Rewrite: `src/components/Navbar.jsx`

Sticky top nav, 52px tall, frosted glass backdrop, logo left, nav links + "Hire me" CTA right.

- [ ] **Step 1: Rewrite `src/components/Navbar.jsx`**

```jsx
export default function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-10"
      style={{
        height: '52px',
        background: 'rgba(6,6,6,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #141414',
      }}
    >
      {/* Logo */}
      <span
        className="font-sans font-bold text-white tracking-widest"
        style={{ fontSize: '14px', letterSpacing: '0.1em' }}
      >
        SDL
      </span>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-8">
        <div className="flex gap-7">
          {[
            { label: 'Work', id: 'work' },
            { label: 'Experience', id: 'experience' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="font-sans text-white/40 hover:text-white transition-colors"
              style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {label}
            </button>
          ))}
        </div>
        <a
          href="mailto:sumethlokuliyana76@gmail.com"
          className="font-sans font-semibold"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ff5500',
            border: '1px solid rgba(255,85,0,0.35)',
            padding: '6px 14px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Hire me
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: rewrite Navbar with frosted glass sticky top nav"
```

---

## Task 4: Hero Section

**Files:**
- Rewrite: `src/components/Hero.jsx`

Full-viewport section 01. Availability badge, Playfair Display headline, subtext, 4-metric row, scroll hint.

- [ ] **Step 1: Rewrite `src/components/Hero.jsx`**

```jsx
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const METRICS = [
  { value: '+58%', label: 'Page load performance' },
  { value: '1,500+', label: 'Users in production' },
  { value: '3', label: 'Live products' },
  { value: '~28%', label: 'Registration growth' },
]

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="hero" className="snap-section" style={{ background: '#060606' }}>
      {/* Section label */}
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        01 — HOME
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '900px', padding: '0 40px', paddingTop: '80px', paddingBottom: '60px', margin: '0 auto' }}>
        {/* Availability badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #1e1e1e', borderRadius: '20px', padding: '6px 14px', marginBottom: '36px' }}
        >
          <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
          <span className="font-sans" style={{ fontSize: '11px', color: '#555', letterSpacing: '0.06em' }}>
            Open to opportunities · Melbourne, AU
          </span>
        </motion.div>

        {/* Kicker */}
        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: '#ff5500' }} />
          Sumeth D.L — Junior Software Engineer
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#fff', marginBottom: '32px' }}
        >
          Building<br />
          <em style={{ fontStyle: 'italic', color: '#333' }}>fast,</em><br />
          shipping<br />
          clean.
        </motion.h1>

        {/* Rule */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}
        >
          <span style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #ff5500, transparent)' }} />
        </motion.div>

        {/* Subtext */}
        <motion.p
          custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans"
          style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, maxWidth: '380px' }}
        >
          React · TypeScript · Spring Boot · AWS. Founder of Creitr. Built SimpliFlow. Production experience shipping features to 1,500+ users.
        </motion.p>

        {/* Metrics row
            NOTE: These numbers are derived from the IFFA role in Section 03 (Experience).
            If any metric changes, update Experience.jsx simultaneously. */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', marginTop: '48px', borderTop: '1px solid #111', paddingTop: '28px' }}
        >
          {METRICS.map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                paddingRight: i < METRICS.length - 1 ? '32px' : 0,
                marginRight: i < METRICS.length - 1 ? '32px' : 0,
                borderRight: i < METRICS.length - 1 ? '1px solid #111' : 'none',
              }}
            >
              <div className="font-sans font-bold" style={{ fontSize: '28px', color: '#fff', letterSpacing: '-0.02em' }}>
                {value}
              </div>
              <div className="font-sans" style={{ fontSize: '10px', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <span
        className="font-sans absolute"
        style={{ bottom: '28px', left: '40px', fontSize: '10px', color: '#222', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ display: 'block', width: '1px', height: '32px', background: 'linear-gradient(180deg, transparent, #333)' }} />
        ↓ scroll
      </span>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: rewrite Hero section with editorial headline and metrics"
```

---

## Task 5: Work Section

**Files:**
- Create: `src/components/Work.jsx`

Section 02. Featured 2-col row (Creitr + SimpliFlow) then 3-col grid (Super Price, Hal-Bot, Savorly-AI).

- [ ] **Step 1: Create `src/components/Work.jsx`**

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

const FEATURED = [
  {
    type: 'Founder & Solo Engineer',
    name: 'Creitr',
    url: 'https://creitr.com',
    badge: '85 PageSpeed',
    desc: 'Brand deal management SaaS for content creators. 5-stage pipeline, drag-and-drop kanban, automated email alerts, and Stripe subscription billing.',
    tags: ['React 19', 'Convex', 'Clerk', 'Stripe', 'Resend'],
  },
  {
    type: 'Founder',
    name: 'SimpliFlow.net',
    url: 'https://www.simpliflow.net',
    badge: null,
    desc: 'AI automation agency helping Australian SMBs implement n8n workflows, Claude/GPT automation, and data pipeline tooling.',
    tags: ['React', 'Tailwind', 'n8n', 'AI Automation'],
  },
]

const GRID = [
  {
    type: 'Full-Stack',
    name: 'Super Price',
    desc: 'Price comparison engine. ~10k daily comparisons, 50% faster lookups. Spring Boot REST API + AWS + SQLite data pipeline.',
  },
  {
    type: 'AWS · AI',
    name: 'Hal-Bot',
    desc: 'RMIT AI chatbot reducing query response times by 40%. AWS Lex + Lambda + DynamoDB backend.',
  },
  {
    type: 'AI · Weekend',
    name: 'Savorly-AI',
    desc: 'GPT-4 recipe assistant. 50+ conversions/day. Edamam API + YouTube video-to-recipe tool.',
  },
]

export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="work" className="snap-section" style={{ background: '#060606' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        02 — WORK
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '900px', padding: '80px 40px 60px', margin: '0 auto' }}>
        {/* Kicker */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Selected work
        </motion.div>

        {/* Headline */}
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', marginBottom: '36px' }}
        >
          Products <em style={{ fontStyle: 'italic', color: '#333' }}>built</em><br />& shipped.
        </motion.h2>

        {/* Featured row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {FEATURED.map(({ type, name, url, badge, desc, tags }, i) => (
            <motion.div
              key={name}
              custom={i + 2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{
                border: '1px solid #1e1e1e',
                borderRadius: '8px',
                padding: '24px',
                background: '#080808',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Orange top accent line */}
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #ff5500, transparent)' }} />

              <div className="font-sans font-semibold" style={{ fontSize: '9px', color: '#ff5500', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {type}
              </div>

              {badge && (
                <div className="font-sans font-bold absolute" style={{ top: '20px', right: '20px', fontSize: '11px', color: '#ff5500' }}>
                  {badge}
                </div>
              )}

              <div className="font-sans font-bold" style={{ fontSize: '20px', color: '#fff', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {name} <span style={{ color: '#333', fontSize: '14px' }}>↗</span>
                </a>
              </div>

              <p className="font-sans" style={{ fontSize: '12px', color: '#444', lineHeight: 1.6, marginBottom: '14px' }}>
                {desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {tags.map(tag => (
                  <span key={tag} className="font-sans" style={{ fontSize: '10px', color: '#333', border: '1px solid #1a1a1a', padding: '2px 8px', borderRadius: '3px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {GRID.map(({ type, name, desc }, i) => (
            <motion.div
              key={name}
              custom={i + 4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ border: '1px solid #141414', borderRadius: '8px', padding: '18px', background: '#080808' }}
            >
              <div className="font-sans" style={{ fontSize: '9px', color: '#2a2a2a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {type}
              </div>
              <div className="font-sans font-semibold" style={{ fontSize: '15px', color: '#888', marginBottom: '6px' }}>
                {name}
              </div>
              <p className="font-sans" style={{ fontSize: '11px', color: '#333', lineHeight: 1.5 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Work.jsx
git commit -m "feat: add Work section with Creitr + SimpliFlow featured, 3-project grid"
```

---

## Task 6: Experience Section

**Files:**
- Rewrite: `src/components/Experience.jsx`

Section 03. 2-col grid for IFFA + Leica, full-width row for RUSU Leadership.

- [ ] **Step 1: Rewrite `src/components/Experience.jsx`**

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const ROLES = [
  {
    company: 'IFFA Windsor',
    role: 'Software Engineer (Front-End)',
    period: 'Mar 2024 – Sep 2024',
    tag: 'Frontend',
    bullets: [
      <>Rebuilt PHP portal in React/TypeScript — <strong style={{ color: '#ff5500' }}>+58% page load performance</strong>, <strong style={{ color: '#ff5500' }}>+34.6% user engagement</strong></>,
      <>Onboarding journey adopted by <strong style={{ color: '#ff5500' }}>1,500+ users</strong>, drove <strong style={{ color: '#ff5500' }}>~28% registration growth</strong></>,
      <>Real-time API integration contributed to <strong style={{ color: '#ff5500' }}>+38% page views</strong></>,
      <>Agile: sprint planning, code reviews, retrospectives</>,
    ],
  },
  {
    company: 'Leica Biosystems',
    role: 'Product Assembler / Lab Support',
    period: 'Nov 2022 – Present',
    tag: 'Lab & R&D',
    bullets: [
      <>Python Kanban app — <strong style={{ color: '#ff5500' }}>100% inventory digitisation</strong></>,
      <>Precision assembly on <strong style={{ color: '#ff5500' }}>$100K–$200K instruments</strong></>,
      <><strong style={{ color: '#ff5500' }}>98.3% accuracy</strong> on component builds</>,
      <>R&D documentation in Peloris cell</>,
    ],
  },
]

const LEADERSHIP = [
  <>Led <strong style={{ color: '#ff5500' }}>5 projects</strong>, engaged <strong style={{ color: '#ff5500' }}>100+ students</strong></>,
  <><strong style={{ color: '#ff5500' }}>+40% participation</strong> increase through structured mentoring</>,
  <>Improved student retention through mentoring programs</>,
  <>Cross-team coordination & stakeholder communication</>,
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="experience" className="snap-section" style={{ background: '#050505' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        03 — EXPERIENCE
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '900px', padding: '80px 40px 60px', margin: '0 auto' }}>
        {/* Kicker */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Work & Leadership
        </motion.div>

        {/* Headline */}
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', marginBottom: '40px' }}
        >
          Shipped <em style={{ fontStyle: 'italic', color: '#333' }}>to</em><br />production.
        </motion.h2>

        {/* Work roles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
          {ROLES.map(({ company, role, period, tag, bullets }, i) => (
            <motion.div
              key={company}
              custom={i + 2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ border: '1px solid #111', padding: '28px', background: '#080808', position: 'relative' }}
            >
              <span className="font-sans absolute" style={{ top: '24px', right: '24px', fontSize: '9px', color: '#ff5500', border: '1px solid rgba(255,85,0,0.2)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {tag}
              </span>
              <div className="font-sans" style={{ fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.1em', fontFamily: 'monospace', marginBottom: '10px' }}>
                {period}
              </div>
              <div className="font-sans font-bold" style={{ fontSize: '18px', color: '#fff', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                {company}
              </div>
              <div className="font-sans" style={{ fontSize: '12px', color: '#444', marginBottom: '16px' }}>
                {role}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {bullets.map((bullet, j) => (
                  <li key={j} className="font-sans" style={{ fontSize: '11px', color: '#444', lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#ff5500', fontSize: '9px', top: '2px' }}>—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Leadership — full width */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ border: '1px solid #111', borderTop: 'none', padding: '28px', background: '#070707', position: 'relative' }}
        >
          <span className="font-sans absolute" style={{ top: '24px', right: '24px', fontSize: '9px', color: '#ff5500', border: '1px solid rgba(255,85,0,0.2)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Leadership
          </span>
          <div className="font-sans" style={{ fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.1em', fontFamily: 'monospace', marginBottom: '10px' }}>
            Feb 2022 – Dec 2023
          </div>
          <div className="font-sans font-bold" style={{ fontSize: '18px', color: '#fff', marginBottom: '4px', letterSpacing: '-0.01em' }}>
            RMIT University Student Union (RUSU)
          </div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#444', marginBottom: '16px' }}>
            Team Lead
          </div>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 32px' }}>
            {LEADERSHIP.map((bullet, i) => (
              <li key={i} className="font-sans" style={{ fontSize: '11px', color: '#444', lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#ff5500', fontSize: '9px', top: '2px' }}>—</span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: rewrite Experience with updated IFFA metrics + RUSU leadership"
```

---

## Task 7: About Section

**Files:**
- Rewrite: `src/components/About.jsx`

Section 04. Two-column: bio + education left, 4 skill category tag clouds right.

- [ ] **Step 1: Rewrite `src/components/About.jsx`**

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

const SKILLS = [
  {
    category: 'Front-End',
    isNew: false,
    items: [
      { label: 'React', strong: true },
      { label: 'TypeScript', strong: true },
      { label: 'JavaScript', strong: true },
      { label: 'HTML/CSS', strong: false },
      { label: 'Tailwind CSS', strong: false },
      { label: 'Next.js', strong: false },
    ],
  },
  {
    category: 'Backend & Cloud',
    isNew: false,
    items: [
      { label: 'Node.js', strong: true },
      { label: 'Python', strong: true },
      { label: 'Spring Boot', strong: false },
      { label: 'Flask', strong: false },
      { label: 'AWS', strong: false },
      { label: 'Git', strong: false },
    ],
  },
  {
    category: 'Automation & AI',
    isNew: true,
    items: [
      { label: 'n8n workflows', strong: true },
      { label: 'Prompt Engineering', strong: true },
      { label: 'Claude API', strong: false },
      { label: 'ChatGPT', strong: false },
      { label: 'Cursor', strong: false },
      { label: 'Gemini', strong: false },
    ],
  },
  {
    category: 'Data',
    isNew: false,
    items: [
      { label: 'SQL', strong: false },
      { label: 'SQLite', strong: false },
      { label: 'Pandas', strong: false },
      { label: 'DynamoDB', strong: false },
      { label: 'Supabase', strong: false },
    ],
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" className="snap-section" style={{ background: '#060606' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        04 — ABOUT
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div
        ref={ref}
        style={{ maxWidth: '900px', padding: '80px 40px 60px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}
      >
        {/* Left: bio + education */}
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-sans font-semibold"
            style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
            About me
          </motion.div>

          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-serif"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', marginBottom: '24px' }}
          >
            Engineer.<br /><em style={{ fontStyle: 'italic', color: '#333' }}>Founder.</em><br />Builder.
          </motion.h2>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-sans"
            style={{ fontSize: '12px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}
          >
            Results-driven Software Engineer with production experience shipping features to 1,500+ users. Skilled in React, TypeScript, Spring Boot, and AWS — with a track record of measurable impact. Combines strong front-end engineering with automation, data pipeline, and cloud-native development capabilities. Proven ability to own features end-to-end from architecture through production debugging.
          </motion.p>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            style={{ borderTop: '1px solid #111', paddingTop: '20px' }}
          >
            <div className="font-sans font-semibold" style={{ fontSize: '9px', color: '#ff5500', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Education
            </div>
            <div className="font-sans font-semibold" style={{ fontSize: '13px', color: '#888' }}>
              Bachelor of Computer Science
            </div>
            <div className="font-sans" style={{ fontSize: '11px', color: '#333', marginTop: '3px' }}>
              RMIT University · Melbourne, VIC · 2021–2024
            </div>
          </motion.div>
        </div>

        {/* Right: skill categories */}
        <div style={{ paddingTop: '8px' }}>
          {SKILLS.map(({ category, isNew, items }, i) => (
            <motion.div
              key={category}
              custom={i + 4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ marginBottom: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #111' }}>
                <span className="font-sans font-semibold" style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {category}
                </span>
                {isNew && (
                  <span className="font-sans" style={{ fontSize: '9px', color: '#ff5500', background: 'rgba(255,85,0,0.1)', padding: '2px 7px', borderRadius: '3px' }}>
                    New
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {items.map(({ label, strong }) => (
                  <span
                    key={label}
                    className="font-sans"
                    style={{
                      fontSize: '11px',
                      color: strong ? '#888' : '#555',
                      border: `1px solid ${strong ? '#222' : '#161616'}`,
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: rewrite About with bio, education, and 4 skill categories"
```

---

## Task 8: Contact Section

**Files:**
- Rewrite: `src/components/Contact.jsx`

Section 05. Large editorial headline, contact info row, mailto CTA, social links.

- [ ] **Step 1: Rewrite `src/components/Contact.jsx`**

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const CONTACT_INFO = [
  { label: 'Email', value: 'sumethlokuliyana76@gmail.com' },
  { label: 'Location', value: 'Clyde North, VIC · Australia' },
  { label: 'Response time', value: 'Within 24–48 hours' },
]

const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/SumethD' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/sumeth-lokuliyana' },
  { label: 'sumethdl.xyz', url: 'https://sumethdl.xyz' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="contact" className="snap-section" style={{ background: '#050505' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        05 — CONTACT
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '900px', padding: '80px 40px 60px', margin: '0 auto' }}>
        {/* Kicker */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Get in touch
        </motion.div>

        {/* Headline */}
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#fff', marginBottom: '40px' }}
        >
          Let's<br /><em style={{ fontStyle: 'italic', color: '#333' }}>build</em><br />something.
        </motion.h2>

        {/* Rule */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '36px' }}
        >
          <span style={{ display: 'block', width: '60px', height: '1px', background: 'linear-gradient(90deg, #ff5500, transparent)' }} />
        </motion.div>

        {/* Contact info row */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '40px', marginBottom: '36px' }}
        >
          {CONTACT_INFO.map(({ label, value }) => (
            <div key={label}>
              <div className="font-sans" style={{ fontSize: '9px', color: '#2a2a2a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {label}
              </div>
              <div className="font-sans" style={{ fontSize: '13px', color: '#555' }}>
                {value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
        >
          <a
            href="mailto:sumethlokuliyana76@gmail.com"
            className="font-sans font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#000', fontSize: '13px', padding: '12px 28px', borderRadius: '6px', letterSpacing: '0.02em', textDecoration: 'none' }}
          >
            ✉ Send an email
          </a>
          <a
            href="https://linkedin.com/in/sumeth-lokuliyana"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{ fontSize: '12px', color: '#333', textDecoration: 'none' }}
          >
            or connect on LinkedIn →
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '20px', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid #0f0f0f' }}
        >
          {SOCIALS.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans"
              style={{ fontSize: '11px', color: '#2a2a2a', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = '#555'}
              onMouseLeave={e => e.target.style.color = '#2a2a2a'}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: rewrite Contact with editorial headline and mailto CTA"
```

---

## Task 9: Wire Everything in App.jsx

**Files:**
- Rewrite: `src/App.jsx`

Snap-scroll `<main>`, IntersectionObserver for progress bar, render all sections with Navbar on top.

- [ ] **Step 1: Rewrite `src/App.jsx`**

```jsx
import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'

const SECTIONS = ['hero', 'work', 'experience', 'about', 'contact']
const TOTAL_SECTIONS = SECTIONS.length

export default function App() {
  const [activeSection, setActiveSection] = useState(1)

  useEffect(() => {
    const observers = []

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index + 1) // 1-indexed
          }
        },
        { threshold: 0.5 } // section must be 50% visible to activate
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <ProgressBar activeSection={activeSection} totalSections={TOTAL_SECTIONS} />
      <Navbar />
      <main className="snap-container">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: Clean build.

- [ ] **Step 3: Start dev server and smoke-test in browser**

```bash
npm run dev
```

Open http://localhost:5173. Verify:
- [ ] Navbar visible at top with frosted glass
- [ ] Orange progress bar on far left
- [ ] Hero loads with serif headline "Building fast, shipping clean."
- [ ] Scrolling snaps to each section
- [ ] Progress bar advances as you scroll through sections
- [ ] "Hire me" button in nav opens email client
- [ ] Creitr and SimpliFlow links in Work section open correct URLs

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire App.jsx with snap-scroll container and IntersectionObserver progress tracking"
```

---

## Task 10: Delete Obsolete Files

**Files:**
- Delete: `src/components/Projects.jsx`
- Delete: `src/components/Particles.jsx`
- Delete: `src/components/ParticleBackground.jsx`
- Delete: `src/components/PageTransition.jsx`
- Delete: `src/components/FuzzyText.jsx`

- [ ] **Step 1: Delete obsolete components**

```bash
cd D:/Portfolio
rm src/components/Projects.jsx
rm src/components/Particles.jsx
rm src/components/ParticleBackground.jsx
rm src/components/PageTransition.jsx
rm src/components/FuzzyText.jsx
```

- [ ] **Step 2: Verify no remaining imports of deleted files**

```bash
grep -r "Projects\|Particles\|ParticleBackground\|PageTransition\|FuzzyText" src/ --include="*.jsx" --include="*.tsx" --include="*.js"
```

Expected: No output. If any imports remain, remove them.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete particle, page-transition, fuzzy-text, and projects components"
```

---

## Task 11: Responsive Polish

**Files:**
- Modify: `src/components/Work.jsx`
- Modify: `src/components/Experience.jsx`
- Modify: `src/components/About.jsx`

The featured grid (2-col) and experience grid (2-col) need to stack on mobile. Add responsive grid collapse.

- [ ] **Step 1: Add responsive styles to Work.jsx**

In `Work.jsx`, add a `<style>` tag inside the component or add a responsive class. Since we're using inline styles, add a `useEffect` or use a CSS class approach.

The simplest approach is to add a `<style>` block in `index.css`:

Append to `src/index.css`:

```css
/* Responsive grid collapse */
@media (max-width: 640px) {
  .grid-2col { grid-template-columns: 1fr !important; }
  .grid-3col { grid-template-columns: 1fr !important; }
  .grid-about { grid-template-columns: 1fr !important; gap: 32px !important; }
}
```

- [ ] **Step 2: Add className to grid containers in Work.jsx**

In `Work.jsx`, add `className="grid-2col"` to the featured projects `<div>` and `className="grid-3col"` to the grid projects `<div>`.

- [ ] **Step 3: Add className to grid containers in Experience.jsx**

In `Experience.jsx`, add `className="grid-2col"` to the roles grid `<div>`.

- [ ] **Step 4: Add className to grid container in About.jsx**

In `About.jsx`, add `className="grid-about"` to the two-column wrapper `<div>`.

- [ ] **Step 5: Verify build and mobile view**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Open http://localhost:5173, open DevTools → Toggle device toolbar → iPhone SE (375px). Verify columns stack vertically.

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/components/Work.jsx src/components/Experience.jsx src/components/About.jsx
git commit -m "feat: add responsive grid collapse for mobile viewports"
```

---

## Task 12: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
cd D:/Portfolio
npm run build
```

Expected: Build completes with no errors. Output shows bundle sizes (JS should be under ~300KB gzipped).

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open http://localhost:4173. Verify:
- [ ] All 5 sections render correctly
- [ ] Snap scroll works
- [ ] Progress bar advances correctly (20% increments)
- [ ] No console errors (open DevTools → Console)
- [ ] Creitr link (`https://creitr.com`) opens in new tab
- [ ] SimpliFlow link (`https://www.simpliflow.net`) opens in new tab
- [ ] "Send an email" CTA opens email client with correct address
- [ ] Navbar "Hire me" opens email client
- [ ] Mobile layout works (DevTools device toolbar)

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — bold editorial, snap scroll, updated resume content"
```
