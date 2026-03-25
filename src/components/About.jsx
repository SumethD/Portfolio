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
        style={{ top: '24px', left: '40px', fontSize: '12px', color: '#2a2a2a', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        04 — ABOUT
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#1e1e1e' }} />
      </span>

      <div
        ref={ref}
        className="grid-about"
        style={{ maxWidth: '900px', padding: '80px 40px 60px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}
      >
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-sans font-semibold"
            style={{ fontSize: '12px', color: '#ff5500', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
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
            style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}
          >
            Results-driven Software Engineer with production experience shipping features to 1,500+ users. Skilled in React, TypeScript, Spring Boot, and AWS — with a track record of measurable impact. Combines strong front-end engineering with automation, data pipeline, and cloud-native development capabilities. Proven ability to own features end-to-end from architecture through production debugging.
          </motion.p>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            style={{ borderTop: '1px solid #111', paddingTop: '20px' }}
          >
            <div className="font-sans font-semibold" style={{ fontSize: '11px', color: '#ff5500', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Education
            </div>
            <div className="font-sans font-semibold" style={{ fontSize: '15px', color: '#888' }}>
              Bachelor of Computer Science
            </div>
            <div className="font-sans" style={{ fontSize: '13px', color: '#333', marginTop: '3px' }}>
              RMIT University · Melbourne, VIC · 2021–2024
            </div>
          </motion.div>
        </div>

        <div style={{ paddingTop: '8px' }}>
          {SKILLS.map(({ category, isNew, items }, i) => (
            <motion.div
              key={category}
              custom={i + 4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
              style={{ marginBottom: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #111' }}>
                <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#ff5500', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
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
                      fontSize: '13px',
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
