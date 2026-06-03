import { motion } from 'framer-motion'

const claimsStats = [
  { value: '98%', label: 'Claim success rate' },
  { value: '25+', label: 'Years advocacy' },
  { value: '24/7', label: 'Support available' },
]

export default function ProtoClaimsHighlight() {
  return (
    <section
      id="claims"
      style={{ background: 'var(--navy)', padding: '5rem 0', borderTop: '3px solid var(--teal)' }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', padding: '0 4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '1rem' }}>
            Claims Advisory
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            When Claims Become Complicated, We Stand Beside You
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
            As an independent claims advocate, we work exclusively for you — not for the insurer. From first notification of loss through to final settlement, we maximise your outcome at every stage.
          </p>

          {/* Inline stats */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {claimsStats.map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 2rem' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{stat.label}</div>
                </div>
                {i < claimsStats.length - 1 && (
                  <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }} />
                )}
              </div>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'var(--teal)',
              color: 'var(--white)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: 0,
              letterSpacing: '0.02em',
            }}
          >
            Get Claims Support Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
