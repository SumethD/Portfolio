import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#040404',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '72px', fontWeight: 400, color: '#fff',
          letterSpacing: '-0.02em', lineHeight: 1,
        }}
      >
        SDL
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
        style={{
          width: '40px', height: '2px',
          background: '#ff5500',
          transformOrigin: 'left',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{
          fontFamily: 'InterVariable, Inter, sans-serif',
          fontSize: '11px', color: '#333',
          letterSpacing: '0.25em', textTransform: 'uppercase',
        }}
      >
        Sumeth D.L — Portfolio
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const container = document.querySelector('main.snap-container')
    const sections = document.querySelectorAll('section.snap-section')
    if (!container || !sections.length) return

    const observers = Array.from(sections).map((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(i + 1)
        },
        { threshold: 0.5, root: container }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <Navbar />
      <ProgressBar activeSection={activeSection} totalSections={5} />
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
