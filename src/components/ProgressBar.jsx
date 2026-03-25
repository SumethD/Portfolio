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
