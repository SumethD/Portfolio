import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  const [activeSection, setActiveSection] = useState(1)

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
