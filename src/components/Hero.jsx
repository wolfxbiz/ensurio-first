import { motion } from 'framer-motion'
import DiagnosticTool from './DiagnosticTool/index'

const styles = {
  hero: {
    background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    padding: '2.5rem 2rem 3.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  /* Subtle background accent — light teal radial glow */
  bgGlow: {
    position: 'absolute',
    top: '-120px',
    right: '-80px',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(0,184,153,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '38% 62%',
    gap: '3rem',
    alignItems: 'start',
    position: 'relative',
    zIndex: 1,
  },
  rebrandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--teal-pale)',
    border: '1px solid rgba(0,184,153,0.3)',
    padding: '6px 14px',
    marginBottom: '1.5rem',
    fontSize: '12px',
    color: 'var(--teal-dark)',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--teal)',
    display: 'inline-block',
    flexShrink: 0,
  },
  h1: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
    fontWeight: 800,
    lineHeight: 1.08,
    marginBottom: '1.25rem',
    color: 'var(--navy)',
    letterSpacing: '-0.02em',
  },
  h1Accent: {
    color: 'var(--teal)',
    display: 'block',
  },
  sub: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.8,
    marginBottom: '2rem',
    fontWeight: 400,
    maxWidth: '460px',
  },
  trustIcons: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    marginBottom: '1.75rem',
    flexWrap: 'wrap',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-mid)',
  },
  trustCheck: {
    width: '18px',
    height: '18px',
    background: 'var(--teal-pale)',
    border: '1.5px solid var(--teal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: 'var(--teal-dark)',
    fontWeight: 700,
    flexShrink: 0,
  },
  stats: {
    display: 'flex',
    gap: '2.5rem',
    marginTop: '2.5rem',
    paddingTop: '2rem',
    borderTop: '2px solid var(--border)',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--navy)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontWeight: 400,
    lineHeight: 1.45,
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const TRUST_ITEMS = ['Risk Management Consultancy', 'Management Consultancy']
const STATS = [
  { num: '15+', label: 'Years of trusted\nadvisory' },
  { num: '500+', label: 'Corporates\nprotected' },
  { num: '$40M+', label: 'Premiums\noptimised' },
]

export default function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.bgGlow} />

      <div style={styles.inner} className="hero-inner">
        {/* LEFT: Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div style={styles.rebrandBadge}>
              <span style={styles.badgeDot} />
              Rebranding &amp; Expansion — Insure First is now Ensurio First
            </div>
          </motion.div>

          <motion.h1 style={styles.h1} variants={itemVariants}>
            Same Trusted Expertise,
            <span style={styles.h1Accent}>Expanded Horizons.</span>
          </motion.h1>

          <motion.p style={styles.sub} variants={itemVariants}>
            Ensurio First Risk Management Consultancies — a premier multi-disciplinary
            advisory firm delivering 360-degree corporate protection and strategic
            growth solutions.
          </motion.p>

          <motion.div style={styles.trustIcons} variants={itemVariants}>
            {TRUST_ITEMS.map((item) => (
              <span key={item} style={styles.trustItem}>
                <span style={styles.trustCheck}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div style={styles.stats} variants={itemVariants}>
            {STATS.map(({ num, label }) => (
              <div key={num} style={styles.stat}>
                <span style={styles.statNum}>{num}</span>
                <span style={{ ...styles.statLabel, whiteSpace: 'pre-line' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Diagnostic Tool */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="hero-tool"
        >
          <DiagnosticTool />
        </motion.div>
      </div>
    </section>
  )
}
