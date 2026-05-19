import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepIndicator from './StepIndicator'
import ScoreResult from './ScoreResult'
import LeadGateForm from './LeadGateForm'

const STEPS = ['Governance', 'Succession', 'Legacy']

const QUESTIONS = [
  {
    step: 0, key: 'q1',
    text: 'Does your family business have a formal MOA/AOA in place?',
    options: ['No formal documents exist', 'Basic documents, not reviewed recently', 'Up-to-date MOA/AOA in place', 'Fully tailored for multi-generational transfer'],
  },
  {
    step: 0, key: 'q2',
    text: 'Are family roles, decision-making authority, and ownership rights clearly defined in writing?',
    options: ['Not at all — handled informally', 'Partially — some verbal agreements', 'Mostly documented, some gaps', 'Fully documented and signed'],
  },
  {
    step: 1, key: 'q3',
    text: 'Is there an identified and groomed successor for current leadership?',
    options: ['No successor identified', 'Identified but no formal plan', 'Successor being actively mentored', 'Formal succession plan documented & tested'],
  },
  {
    step: 1, key: 'q4',
    text: 'How is ownership transfer to the next generation structured?',
    options: ['No structure exists', 'Informally discussed with family', 'Partially structured (shares, trusts)', 'Fully structured with legal instruments'],
  },
  {
    step: 2, key: 'q5',
    text: 'Does your estate planning include a corporate Will or legal legacy structure?',
    options: ['No Will or estate plan exists', 'Personal Will only, no corporate coverage', 'Corporate Will exists, needs review', 'Fully updated corporate estate structure'],
  },
  {
    step: 2, key: 'q6',
    text: 'How would you rate your key stakeholder relationships (suppliers, buyers)?',
    options: ['Transactional, no formal trust built', 'Cordial, but owner-dependent', 'Strong, partially institutionalized', 'Institutional trust, not person-dependent'],
  },
]

const s = {
  qCard: {
    background: 'var(--light-bg)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '0.875rem',
    marginBottom: '0.75rem',
  },
  qText: { fontSize: '13px', fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '0.625rem' },
  optList: { display: 'flex', flexDirection: 'column', gap: '5px' },
  opt: {
    display: 'flex', alignItems: 'flex-start', gap: '8px',
    padding: '7px 10px', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', cursor: 'pointer',
    fontSize: '12px', color: 'var(--text-muted)',
    lineHeight: 1.4, background: 'var(--white)',
    transition: 'all 0.15s', userSelect: 'none',
  },
  optSel: { borderColor: 'var(--teal)', background: 'var(--teal-pale)', color: 'var(--navy)', fontWeight: 500 },
  radio: {
    width: '13px', height: '13px', borderRadius: '50%',
    border: '1.5px solid var(--border)', flexShrink: 0,
    marginTop: '1px', transition: 'all 0.15s',
  },
  radioSel: { borderColor: 'var(--teal)', background: 'var(--teal)' },
  btnRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.875rem' },
  btnPrimary: {
    background: 'var(--navy)', color: 'var(--white)', border: 'none',
    padding: '9px 20px', borderRadius: 'var(--radius-md)',
    fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
  },
  btnOutline: {
    background: 'transparent', color: 'var(--text-muted)',
    border: '1px solid var(--border)', padding: '9px 16px',
    borderRadius: 'var(--radius-md)', fontSize: '13px',
    fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)',
  },
  matGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '0.875rem' },
  matCard: {
    background: 'var(--light-bg)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)', padding: '0.75rem', textAlign: 'center',
  },
  matScore: { fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 },
  matLabel: { fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' },
  matBar: { height: '3px', borderRadius: '2px', background: 'var(--border)', marginTop: '8px', overflow: 'hidden' },
  insightList: { listStyle: 'none', marginBottom: '0.875rem' },
  insightItem: {
    display: 'flex', gap: '8px', padding: '7px 0',
    borderBottom: '1px solid var(--border)', fontSize: '12px',
    color: 'var(--text-muted)', lineHeight: 1.5, alignItems: 'flex-start',
  },
  successWrap: { textAlign: 'center', padding: '2rem 1rem' },
  successIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'var(--teal)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto 1rem', fontSize: '24px', color: 'var(--white)',
  },
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
}

function MatBar({ value }) {
  return (
    <div style={s.matBar}>
      <motion.div
        style={{ height: '100%', borderRadius: '2px', background: 'var(--teal)' }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  )
}

export default function FamilyCheck() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [result, setResult] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const answer = (key, val) => setAnswers((a) => ({ ...a, [key]: val }))
  const stepQuestions = QUESTIONS.filter((q) => q.step === step)

  const next = () => {
    const missing = stepQuestions.find((q) => answers[q.key] === undefined)
    if (missing) return alert('Please answer all questions before continuing.')
    setDir(1); setStep((s) => s + 1)
  }
  const back = () => { setDir(-1); setStep((s) => s - 1) }

  const generate = () => {
    const missing = stepQuestions.find((q) => answers[q.key] === undefined)
    if (missing) return alert('Please answer all questions before continuing.')
    const gov = Math.round(((answers.q1 || 0) + (answers.q2 || 0)) / 6 * 100)
    const suc = Math.round(((answers.q3 || 0) + (answers.q4 || 0)) / 6 * 100)
    const leg = Math.round(((answers.q5 || 0) + (answers.q6 || 0)) / 6 * 100)
    const total = Math.round((gov + suc + leg) / 3)
    const desc =
      total < 35 ? 'Your family business lacks foundational continuity structures. Without intervention, leadership transitions carry significant risk of disruption and value erosion.'
      : total < 55 ? 'Some structures exist, but critical areas like succession and estate planning require urgent attention before the next generation takes over.'
      : total < 75 ? 'A solid foundation is in place. Targeted improvements in governance and legacy documentation will significantly increase enterprise resilience.'
      : 'Your family business demonstrates strong continuity readiness. Focus on maintaining and institutionalizing your existing frameworks.'
    const insights = []
    if (gov < 50) insights.push({ icon: '⚠', text: 'Governance gap: MOA/AOA and role definitions are insufficient. Informal arrangements create legal and operational risk during transitions.' })
    if (suc < 50) insights.push({ icon: '⚠', text: 'Succession risk: No clearly documented leadership transfer plan — the single largest threat to family business continuity.' })
    if (leg < 50) insights.push({ icon: '⚠', text: 'Legacy exposure: Without a corporate Will and estate structure, ownership transfer may trigger legal disputes and tax inefficiencies.' })
    if ((answers.q6 || 0) < 2) insights.push({ icon: '⚠', text: 'Stakeholder risk: Key relationships are owner-dependent. Loss of leadership may disrupt supplier and buyer confidence.' })
    insights.push({ icon: '✓', text: 'A structured consultation with our Management Consultancy team will map your highest-priority actions and a clear path forward.' })
    setResult({ total, gov, suc, leg, desc, insights })
    setDone(true)
  }

  const reset = () => { setStep(0); setDone(false); setSubmitted(false); setResult(null); setAnswers({}) }

  if (submitted) {
    return (
      <motion.div style={s.successWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={s.successIcon}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>Playbook on its Way!</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Your Family Business Continuity Playbook will be sent within one business day. Our team may reach out to arrange a complimentary discovery session.
        </p>
        <button style={{ ...s.btnOutline, marginTop: '1.25rem' }} onClick={reset}>Start New Assessment</button>
      </motion.div>
    )
  }

  return (
    <>
      <StepIndicator steps={STEPS} current={done ? 3 : step} />

      <AnimatePresence mode="wait" custom={dir}>
        {!done && (
          <motion.div key={`step-${step}`} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
            {stepQuestions.map((q) => (
              <div key={q.key} style={s.qCard}>
                <div style={s.qText}>{q.text}</div>
                <div style={s.optList}>
                  {q.options.map((opt, i) => {
                    const sel = answers[q.key] === i
                    return (
                      <div key={i} style={{ ...s.opt, ...(sel ? s.optSel : {}) }} onClick={() => answer(q.key, i)}>
                        <div style={{ ...s.radio, ...(sel ? s.radioSel : {}) }} />
                        {opt}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            <div style={s.btnRow}>
              {step > 0 ? <button style={s.btnOutline} onClick={back}>← Back</button> : <span />}
              {step < 2
                ? <button style={s.btnPrimary} onClick={next}>Continue →</button>
                : <button style={s.btnPrimary} onClick={generate}>Generate Report →</button>
              }
            </div>
          </motion.div>
        )}

        {done && result && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <ScoreResult score={result.total} description={result.desc} />
            <div style={s.matGrid}>
              {[['Governance', result.gov], ['Succession', result.suc], ['Legacy', result.leg]].map(([label, val]) => (
                <div key={label} style={s.matCard}>
                  <div style={s.matScore}>{val}</div>
                  <div style={s.matLabel}>{label}</div>
                  <MatBar value={val} />
                </div>
              ))}
            </div>
            <ul style={s.insightList}>
              {result.insights.map((ins, i) => (
                <li key={i} style={s.insightItem}>
                  <span style={{ flexShrink: 0, color: ins.icon === '✓' ? 'var(--teal)' : 'var(--warning)' }}>{ins.icon}</span>
                  <span>{ins.text}</span>
                </li>
              ))}
            </ul>
            <LeadGateForm reportLabel="Family Business Continuity Playbook" onSubmit={() => setSubmitted(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
