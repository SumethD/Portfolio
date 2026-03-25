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
  const isInView = useInView(ref, { once: false, margin: '-15%' })

  return (
    <section id="contact" className="snap-section" style={{ background: '#050505' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '12px', color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        05 — CONTACT
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '1200px', padding: '80px 60px 60px', margin: '0 auto' }}>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '12px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Get in touch
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#fff', marginBottom: '40px' }}
        >
          Let&apos;s<br /><em style={{ fontStyle: 'italic', color: '#555' }}>build</em><br />something.
        </motion.h2>

        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '36px' }}
        >
          <span style={{ display: 'block', width: '60px', height: '1px', background: 'linear-gradient(90deg, #ff5500, transparent)' }} />
        </motion.div>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '40px', marginBottom: '36px' }}
        >
          {CONTACT_INFO.map(({ label, value }) => (
            <div key={label}>
              <div className="font-sans" style={{ fontSize: '11px', color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
              <div className="font-sans" style={{ fontSize: '16px', color: '#777' }}>{value}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
        >
          <a
            href="mailto:sumethlokuliyana76@gmail.com"
            className="font-sans font-semibold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#000', fontSize: '15px', padding: '12px 28px', borderRadius: '6px', letterSpacing: '0.02em', textDecoration: 'none' }}
          >
            ✉ Send an email
          </a>
          <a
            href="https://linkedin.com/in/sumeth-lokuliyana"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}
          >
            or connect on LinkedIn →
          </a>
        </motion.div>

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
              style={{ fontSize: '13px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = '#777'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
