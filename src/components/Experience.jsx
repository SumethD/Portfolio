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
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-sans font-semibold"
          style={{ fontSize: '10px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: '24px', height: '1px', background: '#ff5500' }} />
          Work & Leadership
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="font-serif"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', marginBottom: '40px' }}
        >
          Shipped <em style={{ fontStyle: 'italic', color: '#333' }}>to</em><br />production.
        </motion.h2>

        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
          {ROLES.map(({ company, role, period, tag, bullets }, i) => (
            <motion.div
              key={company}
              custom={i + 2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ border: '1px solid #111', padding: '28px', background: '#080808', position: 'relative' }}
            >
              <span className="font-sans absolute" style={{ top: '24px', right: '24px', fontSize: '9px', color: '#ff5500', border: '1px solid rgba(255,85,0,0.2)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {tag}
              </span>
              <div className="font-sans" style={{ fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.1em', fontFamily: 'monospace', marginBottom: '10px' }}>{period}</div>
              <div className="font-sans font-bold" style={{ fontSize: '18px', color: '#fff', marginBottom: '4px', letterSpacing: '-0.01em' }}>{company}</div>
              <div className="font-sans" style={{ fontSize: '12px', color: '#444', marginBottom: '16px' }}>{role}</div>
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

        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          style={{ border: '1px solid #111', borderTop: 'none', padding: '28px', background: '#070707', position: 'relative' }}
        >
          <span className="font-sans absolute" style={{ top: '24px', right: '24px', fontSize: '9px', color: '#ff5500', border: '1px solid rgba(255,85,0,0.2)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Leadership
          </span>
          <div className="font-sans" style={{ fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.1em', fontFamily: 'monospace', marginBottom: '10px' }}>Feb 2022 – Dec 2023</div>
          <div className="font-sans font-bold" style={{ fontSize: '18px', color: '#fff', marginBottom: '4px', letterSpacing: '-0.01em' }}>RMIT University Student Union (RUSU)</div>
          <div className="font-sans" style={{ fontSize: '12px', color: '#444', marginBottom: '16px' }}>Team Lead</div>
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
