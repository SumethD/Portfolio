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
