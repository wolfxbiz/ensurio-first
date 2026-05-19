import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'Risk Management', to: '/risk-management' },
  { label: 'Management Consultancy', to: '/management-consultancy' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      {/* Top bar */}
      <div style={{ background: 'var(--navy)', padding: '7px 0', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }} className="topbar">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="mailto:consult@insurefirst.ae" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'inherit', textDecoration: 'none' }}>📧 consult@insurefirst.ae</a>
            <a href="tel:+971509765976" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'inherit', textDecoration: 'none' }}>📞 +971 50 976 5976</a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 DMCC Business Centre, Dubai</span>
          </div>
          <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.02em' }} className="topbar-rebrand">
            ✦ Now operating as Ensurio First
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(13,27,75,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

          {/* Logo → home */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="Ensurio First" style={{ height: '80px', width: 'auto', display: 'block' }} />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      padding: '8px 18px', fontSize: '14px', fontWeight: 600,
                      color: active ? 'var(--teal)' : 'var(--navy)',
                      textDecoration: 'none', display: 'block',
                      transition: 'color 0.2s', letterSpacing: '0.01em',
                      borderBottom: active ? '2px solid var(--teal)' : '2px solid transparent',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--teal)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = active ? 'var(--teal)' : 'var(--navy)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/#contact"
              className="nav-cta"
              style={{ background: 'var(--teal)', color: 'var(--white)', padding: '11px 22px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', display: 'inline-block', fontFamily: 'var(--font-body)', letterSpacing: '0.01em', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
            >
              Get a Quote
            </Link>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'none', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}
            >
              <motion.span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--navy)', transformOrigin: 'center' }} animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
              <motion.span style={{ display: 'block', width: '16px', height: '2px', background: 'var(--navy)' }} animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} />
              <motion.span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--navy)', transformOrigin: 'center' }} animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
            >
              <div style={{ padding: '0.75rem 2rem 1rem' }}>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', padding: '12px 0', fontSize: '15px', fontWeight: 600, color: pathname === link.to ? 'var(--teal)' : 'var(--navy)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', marginTop: '1rem', background: 'var(--teal)', color: 'var(--white)', padding: '13px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textAlign: 'center', fontFamily: 'var(--font-body)' }}
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
