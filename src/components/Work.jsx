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
  const isInView = useInView(ref, { once: false, margin: '-15%' })

  return (
    <section id="work" className="snap-section" style={{ background: '#060606' }}>
      <span
        className="absolute font-sans font-semibold"
        style={{ top: '24px', left: '40px', fontSize: '12px', color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        02 — WORK
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div ref={ref} style={{ maxWidth: '1200px', padding: '80px 60px 60px', margin: '0 auto' }}>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '12px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Selected work
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', marginBottom: '36px' }}
        >
          Products <em style={{ fontStyle: 'italic', color: '#555' }}>built</em><br />& shipped.
        </motion.h2>

        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {FEATURED.map(({ type, name, url, badge, desc, tags }, i) => (
            <motion.div
              key={name}
              custom={i + 2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ border: '1px solid #1e1e1e', borderRadius: '8px', padding: '24px', background: '#080808', position: 'relative', overflow: 'hidden' }}
            >
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #ff5500, transparent)' }} />
              <div className="font-sans font-semibold" style={{ fontSize: '11px', color: '#ff5500', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {type}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div className="font-sans font-bold" style={{ fontSize: '24px', color: '#fff', letterSpacing: '-0.01em' }}>
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {name} <span style={{ color: '#555', fontSize: '14px' }}>↗</span>
                  </a>
                </div>
                {badge && (
                  <span className="font-sans font-bold" style={{ fontSize: '11px', color: '#ff5500', border: '1px solid rgba(255,85,0,0.3)', padding: '2px 8px', borderRadius: '3px', whiteSpace: 'nowrap' }}>
                    {badge}
                  </span>
                )}
              </div>
              <p className="font-sans" style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '14px' }}>{desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {tags.map(tag => (
                  <span key={tag} className="font-sans" style={{ fontSize: '12px', color: '#555', border: '1px solid #1a1a1a', padding: '2px 8px', borderRadius: '3px' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {GRID.map(({ type, name, desc }, i) => (
            <motion.div
              key={name}
              custom={i + 4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ border: '1px solid #141414', borderRadius: '8px', padding: '18px', background: '#080808' }}
            >
              <div className="font-sans" style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{type}</div>
              <div className="font-sans font-semibold" style={{ fontSize: '18px', color: '#888', marginBottom: '6px' }}>{name}</div>
              <p className="font-sans" style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
