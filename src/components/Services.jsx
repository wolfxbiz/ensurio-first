import { motion } from 'framer-motion'

const IOP_PHASES = [
  { num: '01', title: 'Policy Audit & Technical Alignment', desc: 'Meticulous audit of coverage, deductibles, warranties, exclusions, and premium alignment against your actual risk footprint.' },
  { num: '02', title: 'Total Cost of Risk (TCOR) Analysis', desc: 'Evaluation of historical claim frequencies, administrative overheads, and uninsured exposures to establish a lean financial baseline.' },
  { num: '03', title: 'Risk Retention & Deductible Restructuring', desc: 'Analyzing balance sheet capacity to determine optimal self-insured retentions (SIRs) and deductible thresholds to drive down premiums.' },
  { num: '04', title: 'Claim Mitigation & Risk Profile Enhancement', desc: 'Implementing safety protocols and BCP to secure preferred risk status from insurers, ensuring competitive future renewal rates.' },
]

const MGMT_SERVICES = [
  { icon: '⚖', title: 'Family Business Succession Planning', desc: 'Navigating the transition of leadership and ownership to the next generation with structured legal and operational frameworks.' },
  { icon: '📜', title: 'Estate & Legacy Structuring', desc: 'Strategic guidance on creating legally sound corporate Wills and estate structures that protect intergenerational wealth.' },
  { icon: '📋', title: 'Family Business Governance', desc: 'Drafting MOA & AOA specifically tailored for family businesses to pass seamlessly to the owners\' children.' },
  { icon: '📈', title: 'Business Valuation & Exit Strategies', desc: 'Finding the optimal path to sell your business with adequately appreciated value and market positioning.' },
  { icon: '🤝', title: 'Stakeholder Trust & Relationship Building', desc: 'Creating institutional trust with suppliers and buyers through transparent, sustainable communication strategies.' },
  { icon: '⚙', title: 'Operational Efficiency & Process Optimisation', desc: 'Analyzing workflows to eliminate redundancies, reduce overheads, and improve productivity across the organization.' },
]

const styles = {
  section: {
    padding: '5rem 2rem',
    background: 'var(--white)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  eyebrow: {
    fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
    color: 'var(--teal)', fontWeight: 700, marginBottom: '0.5rem',
  },
  h2: {
    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,2.8rem)',
    fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.1, letterSpacing: '-0.02em',
  },
  desc: { fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '3rem' },
  pillarsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'var(--border)', marginBottom: '4rem' },
  pillarCard: { background: 'var(--white)', padding: '2.5rem' },
  pillarTag: { fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, marginBottom: '0.5rem' },
  pillarTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', letterSpacing: '-0.02em' },
  pillarTagline: { fontSize: '15px', color: 'var(--teal)', fontStyle: 'italic', marginBottom: '1rem' },
  pillarDesc: { fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 },
  iopGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginTop: '1.5rem' },
  iopCard: { background: 'var(--light-bg)', padding: '1.75rem' },
  iopNum: { fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--border-dark)', lineHeight: 1, marginBottom: '0.6rem' },
  iopTitle: { fontSize: '15px', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem' },
  iopDesc: { fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 },
  mgmtGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '1.5rem' },
  mgmtCard: {
    border: '1px solid var(--border)', borderRadius: 0,
    padding: '1.75rem', background: 'var(--white)',
    transition: 'all 0.2s', cursor: 'default',
  },
  mgmtIcon: { fontSize: '28px', marginBottom: '0.875rem', display: 'block' },
  mgmtTitle: { fontSize: '15px', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' },
  mgmtDesc: { fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 },
}

export default function Services() {
  return (
    <section id="services" style={styles.section}>
      <div style={styles.inner}>
        <p style={styles.eyebrow}>Our Services</p>
        <h2 style={styles.h2}>Two Pillars of Expert Advisory</h2>
        <p style={styles.desc}>
          Combining deep-rooted heritage in corporate protection with cutting-edge Risk Management
          and Management Consultancy capabilities, we provide a 360-degree shield and blueprint for strategic growth.
        </p>

        {/* PILLAR I */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ padding: '1rem 0 0.5rem', borderTop: '2px solid var(--teal)', display: 'inline-block' }}>
            <span style={styles.pillarTag}>Pillar I</span>
          </div>
          <h3 style={styles.pillarTitle}>Risk Management Consultancy</h3>
          <p style={styles.pillarTagline}>Proactive strategies to anticipate, mitigate, and manage corporate vulnerability.</p>
          <p style={styles.pillarDesc}>
            In today's volatile business environment, resilience and fiscal discipline are your greatest assets.
            At Ensurio First, we go beyond traditional coverage oversight to provide comprehensive Risk Management Consultancy
            through our signature Insurance Optimisation Programme (IOP).
          </p>

          <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.03em' }}>
              Insurance Optimisation Programme (IOP) — 4 Phase Framework
            </span>
          </div>
          <div style={styles.iopGrid} className="services-iop">
            {IOP_PHASES.map((phase) => (
              <motion.div
                key={phase.num}
                style={styles.iopCard}
                whileHover={{ background: '#EEF2FF' }}
              >
                <div style={styles.iopNum}>{phase.num}</div>
                <div style={styles.iopTitle}>{phase.title}</div>
                <div style={styles.iopDesc}>{phase.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PILLAR II */}
        <div>
          <div style={{ padding: '1rem 0 0.5rem', borderTop: '2px solid var(--teal)', display: 'inline-block' }}>
            <span style={styles.pillarTag}>Pillar II</span>
          </div>
          <h3 style={styles.pillarTitle}>Management Consultancy</h3>
          <p style={styles.pillarTagline}>Transforming challenges into structured growth, operational excellence, and lasting legacies.</p>
          <p style={styles.pillarDesc}>
            We partner with business leaders and family-owned enterprises to solve complex structural challenges,
            maximize enterprise value, and ensure seamless continuity across generations.
          </p>
          <div style={styles.mgmtGrid} className="services-mgmt">
            {MGMT_SERVICES.map((svc) => (
              <motion.div
                key={svc.title}
                style={styles.mgmtCard}
                whileHover={{ borderColor: 'var(--teal)', boxShadow: 'var(--shadow-md)' }}
              >
                <span style={styles.mgmtIcon}>{svc.icon}</span>
                <div style={styles.mgmtTitle}>{svc.title}</div>
                <div style={styles.mgmtDesc}>{svc.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
