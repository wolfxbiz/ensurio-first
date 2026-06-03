import { motion } from 'framer-motion'
import { serviceCategories } from '../data/index.js'

export default function ProtoServices() {
  return (
    <section style={{ background: 'var(--light-bg)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
            Insurance Services
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Comprehensive Insurance Services
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '15px', lineHeight: 1.7 }}>
            From commercial property to specialist risk, we advise on the full spectrum of insurance products available in the UAE market.
          </p>
        </div>

        {/* 4-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {serviceCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 0 }}
            >
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--teal)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid var(--teal)',
                marginBottom: '1rem',
              }}>
                {cat.category}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{ width: '6px', height: '6px', background: 'var(--teal)', flexShrink: 0, marginTop: '6px', borderRadius: 0, display: 'inline-block' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
