import { motion } from 'framer-motion'

const styles = {
  section: { padding: '5rem 2rem', background: 'var(--navy)' },
  inner: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' },
  eyebrow: { fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, marginBottom: '0.5rem' },
  h2: { fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '1.25rem', lineHeight: 1.1, letterSpacing: '-0.02em' },
  body: { fontSize: '16px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.82, marginBottom: '1.25rem' },
  highlightBox: {
    background: 'rgba(0,184,153,0.1)', border: '1px solid rgba(0,184,153,0.25)',
    borderRadius: 0, padding: '1.25rem', marginTop: '1.5rem',
  },
  highlightText: { fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontStyle: 'italic' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)' },
  statCard: { background: 'rgba(255,255,255,0.04)', padding: '2rem', textAlign: 'center' },
  statNum: { fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 800, color: 'var(--teal)', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.02em' },
  statLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 },
  timelineWrap: { marginTop: '2rem' },
  timelineItem: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' },
  timelineDot: {
    width: '10px', height: '10px', borderRadius: '50%',
    background: 'var(--teal)', flexShrink: 0, marginTop: '6px',
  },
  timelineYear: { fontSize: '12px', fontWeight: 700, color: 'var(--teal)', marginBottom: '2px' },
  timelineText: { fontSize: '15px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.7 },
}

const TIMELINE = [
  { year: 'Founded', text: 'Established as Insure First Consultancy — built on trust, precise advisory, and unyielding client dedication.' },
  { year: 'Growth', text: 'Expanded client base across the GCC, protecting over 500 corporates and optimising $40M+ in insurance premiums.' },
  { year: 'Today', text: 'Operating as Ensurio First Risk Management Consultancies — a premier multi-disciplinary advisory firm for the region.' },
]

const STATS = [
  { num: '15+', label: 'Years of trusted advisory' },
  { num: '500+', label: 'Corporate clients protected' },
  { num: '$40M+', label: 'Premiums optimised' },
  { num: '98%', label: 'Client retention rate' },
]

export default function AboutSection() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.inner} className="about-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={styles.eyebrow}>Our Story</p>
          <h2 style={styles.h2}>From Insure First to Ensurio First</h2>
          <p style={styles.body}>
            Founded as Insure First Consultancy, we built our reputation on a foundation of trust, precise advisory,
            and unyielding client dedication. As the business landscape transformed, so did we.
          </p>
          <p style={styles.body}>
            Today, operating as Ensurio First Risk Management Consultancies, we stand as a premier multi-disciplinary
            advisory firm in the region. Our identity may have evolved, but our core philosophy remains intact.
          </p>
          <div style={styles.highlightBox}>
            <p style={styles.highlightText}>
              "By blending our deep-rooted heritage in corporate protection with cutting-edge Risk Management
              and Management Consultancy capabilities, we provide businesses with a 360-degree shield and a
              blueprint for strategic growth."
            </p>
          </div>

          <div style={styles.timelineWrap}>
            {TIMELINE.map((item) => (
              <div key={item.year} style={styles.timelineItem}>
                <div style={styles.timelineDot} />
                <div>
                  <div style={styles.timelineYear}>{item.year}</div>
                  <div style={styles.timelineText}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.num} style={styles.statCard}>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
