import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const SCROLL_THRESHOLD = 600 // px scrolled before popup fires
const DELAY_MS = 1200        // ms after threshold before it appears

function getScoreColor(s) {
  if (s < 40) return '#EF4444'
  if (s < 60) return '#F59E0B'
  if (s < 75) return '#00B899'
  return '#10B981'
}
function getScoreLabel(s) {
  if (s < 40) return 'High Risk'
  if (s < 60) return 'Moderate Risk'
  if (s < 75) return 'Developing'
  return 'Strong'
}

export default function ScrollReminderPopup() {
  const [visible, setVisible]   = useState(false)
  const [done, setDone]         = useState(false)   // submitted
  const [result, setResult]     = useState(null)    // { score, savings }
  const [status, setStatus]     = useState('idle')  // idle | sending | sent
  const timerRef = useRef(null)
  const shownRef = useRef(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  /* ── Listen for diagnostic events ── */
  useEffect(() => {
    const onResult = (e) => setResult(e.detail)
    const onSubmitted = () => { setDone(true); setVisible(false) }
    window.addEventListener('ensurio:result', onResult)
    window.addEventListener('ensurio:submitted', onSubmitted)
    return () => {
      window.removeEventListener('ensurio:result', onResult)
      window.removeEventListener('ensurio:submitted', onSubmitted)
    }
  }, [])

  /* ── Scroll listener ── */
  useEffect(() => {
    if (done || shownRef.current) return
    const onScroll = () => {
      if (!result || done || shownRef.current) return
      if (window.scrollY > SCROLL_THRESHOLD) {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          if (!shownRef.current && !done) {
            shownRef.current = true
            setVisible(true)
          }
        }, DELAY_MS)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timerRef.current)
    }
  }, [result, done])

  const dismiss = () => setVisible(false)

  const submit = async (data) => {
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  data.name,
        from_email: data.email,
        company:    data.company ?? '',
        tool:       'Insurance Premium Check (Reminder)',
        score:      result?.score ?? 'N/A',
      }, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
      window.dispatchEvent(new CustomEvent('ensurio:submitted'))
      setTimeout(() => setVisible(false), 2000)
    } catch {
      setStatus('error')
    }
  }

  const color   = result ? getScoreColor(result.score) : 'var(--teal)'
  const label   = result ? getScoreLabel(result.score) : ''
  const savings = result ? `$${result.savings.toLocaleString()}` : ''

  const inputStyle = {
    flex: 1,
    padding: '10px 12px',
    border: '2px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    color: 'var(--white)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    borderRadius: 0,
    minWidth: 0,
    transition: 'border-color 0.2s',
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop (subtle) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(13,27,75,0.18)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Popup panel */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9001,
              width: '100%',
              maxWidth: '640px',
              background: 'var(--navy)',
              boxShadow: '0 24px 64px rgba(13,27,75,0.45)',
              overflow: 'hidden',
            }}
          >
            {/* Teal top bar */}
            <div style={{ height: '3px', background: 'var(--teal)' }} />

            {/* Header row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem 0.75rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Score badge */}
                <div style={{
                  width: '48px', height: '48px', border: `3px solid ${color}`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color, lineHeight: 1 }}>
                    {result?.score}
                  </span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>/100</span>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label} — Your Report is Ready
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                    Est. <strong style={{ color: 'var(--teal)' }}>{savings}</strong> in annual savings available. Don't leave without it.
                  </p>
                </div>
              </div>
              <button
                onClick={dismiss}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px', flexShrink: 0 }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: '1rem 1.25rem' }}>
              {status === 'sent' ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: 'var(--teal)', fontWeight: 600, fontSize: '14px', padding: '0.5rem 0' }}>
                  ✓ Report on its way — check your inbox!
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit(submit)} noValidate>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <input
                      {...register('name', { required: true })}
                      placeholder="Full Name"
                      style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--danger)' } : {}) }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                    />
                    <input
                      {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                      type="email"
                      placeholder="Work Email"
                      style={{ ...inputStyle, ...(errors.email ? { borderColor: 'var(--danger)' } : {}) }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                    />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        background: 'var(--teal)', color: 'var(--white)', border: 'none',
                        padding: '10px 20px', fontSize: '13px', fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'var(--font-body)', borderRadius: 0,
                        whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
                    >
                      {status === 'sending' ? 'Sending...' : 'Get My Free Report →'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '6px' }}>
                      Could not send — email us at consult@insurefirst.ae
                    </p>
                  )}
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
                    🔒 Strictly confidential. No spam. One-click unsubscribe.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
