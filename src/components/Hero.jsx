import { motion, useInView } from 'framer-motion'
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
