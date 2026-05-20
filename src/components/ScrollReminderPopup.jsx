import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const SCROLL_THRESHOLD    = 600   // px before report reminder fires
const DELAY_MS            = 1200
const TOOL_PROMPT_DELAY   = 7000  // ms before "try the tool" fires for new visitors
const TOOL_PROMPT_SCROLL  = 350   // px scroll before "try the tool" fires

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

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 600)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 600)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

export default function ScrollReminderPopup() {
  const isMobile = useIsMobile()

  // ── Report reminder (after tool used) ────────────────────────────────────
  const [visible, setVisible]     = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [done, setDone]           = useState(false)
  const [result, setResult]       = useState(null)
  const [status, setStatus]       = useState('idle')
  const reminderShownRef          = useRef(false)
  const reminderTimerRef          = useRef(null)

  // ── "Try the tool" prompt (no tool used yet) ──────────────────────────────
  const [toolPromptVisible, setToolPromptVisible]     = useState(false)
  const [toolPromptMinimized, setToolPromptMinimized] = useState(false)
  const toolPromptShownRef  = useRef(false)
  const toolPromptTimerRef  = useRef(null)

  const { register, handleSubmit, formState: { errors } } = useForm()

  /* ── Diagnostic event listeners ── */
  useEffect(() => {
    const onResult = (e) => {
      setResult(e.detail)
      // hide tool prompt if user started the tool
      setToolPromptVisible(false)
      setToolPromptMinimized(false)
    }
    const onSubmitted = () => { setDone(true); setVisible(false); setMinimized(false) }
    window.addEventListener('ensurio:result', onResult)
    window.addEventListener('ensurio:submitted', onSubmitted)
    return () => {
      window.removeEventListener('ensurio:result', onResult)
      window.removeEventListener('ensurio:submitted', onSubmitted)
    }
  }, [])

  /* ── Report reminder scroll trigger ── */
  useEffect(() => {
    if (done || reminderShownRef.current) return
    const onScroll = () => {
      if (!result || done || reminderShownRef.current) return
      if (window.scrollY > SCROLL_THRESHOLD) {
        clearTimeout(reminderTimerRef.current)
        reminderTimerRef.current = setTimeout(() => {
          if (!reminderShownRef.current && !done) {
            reminderShownRef.current = true
            setVisible(true)
          }
        }, DELAY_MS)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(reminderTimerRef.current)
    }
  }, [result, done])

  /* ── "Try the tool" prompt trigger (fires for visitors who haven't used tool) ── */
  useEffect(() => {
    if (toolPromptShownRef.current || result) return

    const fire = () => {
      if (toolPromptShownRef.current || result) return
      toolPromptShownRef.current = true
      setToolPromptVisible(true)
    }

    // Time-based
    toolPromptTimerRef.current = setTimeout(fire, TOOL_PROMPT_DELAY)

    // Scroll-based (whichever comes first)
    const onScroll = () => {
      if (window.scrollY > TOOL_PROMPT_SCROLL) fire()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(toolPromptTimerRef.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [result])

  /* ── Dismiss handlers ── */
  const dismissReminder = () => {
    setVisible(false)
    setTimeout(() => setMinimized(true), 200)
  }
  const expandReminder = () => { setMinimized(false); setVisible(true) }
  const fullyDismissReminder = (e) => { e.stopPropagation(); setMinimized(false) }

  const dismissToolPrompt = () => {
    setToolPromptVisible(false)
    setTimeout(() => setToolPromptMinimized(true), 200)
  }
  const expandToolPrompt = () => { setToolPromptMinimized(false); setToolPromptVisible(true) }
  const fullyDismissToolPrompt = (e) => { e.stopPropagation(); setToolPromptMinimized(false) }

  const goToTool = () => {
    setToolPromptVisible(false)
    setToolPromptMinimized(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Email submit ── */
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
  const savings = result?.savings != null ? `$${result.savings.toLocaleString()}` : ''

  const inputStyle = {
    flex: 1,
    minWidth: isMobile ? '100%' : '140px',
    padding: '10px 12px',
    border: '2px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    color: 'var(--white)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.2s',
  }

  const popupStyle = {
    position: 'fixed',
    bottom: isMobile ? 0 : '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9001,
    width: '100%',
    maxWidth: isMobile ? '100%' : '640px',
    background: 'var(--navy)',
    boxShadow: '0 24px 64px rgba(13,27,75,0.45)',
    overflow: 'hidden',
  }

  return (
    <>
      {/* ════════════════════════════════════════════
          1. REPORT REMINDER POPUP (tool already used)
         ════════════════════════════════════════════ */}
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={dismissReminder}
              style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(13,27,75,0.18)', backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={popupStyle}
            >
              <div style={{ height: '3px', background: 'var(--teal)' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0.875rem 1rem 0.625rem' : '1rem 1.25rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px', border: `3px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 800, color, lineHeight: 1 }}>{result?.score}</span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>/100</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {label} — Your Report is Ready
                    </p>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                      {result?.savings != null
                        ? <>Est. <strong style={{ color: 'var(--teal)' }}>{savings}</strong> in annual savings available. Don't leave without it.</>
                        : <>Your personalised report is ready. Get your full analysis and action plan.</>
                      }
                    </p>
                  </div>
                </div>
                <button onClick={dismissReminder} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px', flexShrink: 0 }} aria-label="Close">×</button>
              </div>

              {/* Form */}
              <div style={{ padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem' }}>
                {status === 'sent' ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: 'var(--teal)', fontWeight: 600, fontSize: '14px', padding: '0.5rem 0' }}>
                    ✓ Report on its way — check your inbox!
                  </motion.p>
                ) : (
                  <form onSubmit={handleSubmit(submit)} noValidate>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <input {...register('name', { required: true })} placeholder="Full Name"
                        style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--danger)' } : {}) }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                        onBlur={(e) => (e.target.style.borderColor = errors.name ? 'var(--danger)' : 'rgba(255,255,255,0.15)')} />
                      <input {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })} type="email" placeholder="Work Email"
                        style={{ ...inputStyle, ...(errors.email ? { borderColor: 'var(--danger)' } : {}) }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? 'var(--danger)' : 'rgba(255,255,255,0.15)')} />
                      <button type="submit" disabled={status === 'sending'}
                        style={{ background: 'var(--teal)', color: 'var(--white)', border: 'none', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', borderRadius: 0, whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s', width: isMobile ? '100%' : 'auto' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}>
                        {status === 'sending' ? 'Sending...' : 'Get My Free Report →'}
                      </button>
                    </div>
                    {status === 'error' && <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '6px' }}>Could not send — email us at consult@insurefirst.ae</p>}
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>🔒 Strictly confidential. No spam. One-click unsubscribe.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Report reminder — minimized banner */}
      <AnimatePresence>
        {minimized && !done && !visible && (
          <motion.div
            initial={{ y: 64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 64, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34, delay: 0.05 }}
            onClick={expandReminder}
            style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 8999, width: '100%', maxWidth: isMobile ? '100%' : '640px', background: 'var(--navy)', borderTop: `3px solid ${color}`, boxShadow: '0 -4px 32px rgba(13,27,75,0.28)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', gap: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ width: '32px', height: '32px', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 800, color, lineHeight: 1 }}>{result?.score}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1px', whiteSpace: 'nowrap' }}>Your report is ready</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {result?.savings != null ? `Est. ${savings} in annual savings` : 'Click to get your free report'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ background: 'var(--teal)', color: 'var(--white)', padding: '7px 14px', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                Get Free Report →
              </span>
              <button onClick={fullyDismissReminder} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '4px 2px' }} aria-label="Dismiss">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          2. "TRY THE TOOL" POPUP (tool not yet used)
         ════════════════════════════════════════════ */}
      <AnimatePresence>
        {toolPromptVisible && !result && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={dismissToolPrompt}
              style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(13,27,75,0.14)', backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={popupStyle}
            >
              <div style={{ height: '3px', background: 'var(--teal)' }} />

              <div style={{ padding: isMobile ? '1.25rem 1rem' : '1.5rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Icon */}
                    <div style={{ width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: isMobile ? '18px' : '22px' }}>
                      📊
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Free Diagnostic Tool
                      </p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1.25, marginBottom: '6px' }}>
                        Are You Overpaying on Insurance?
                      </p>
                      <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: '400px' }}>
                        Get a free risk score and estimated savings in under 2 minutes — no sign-up required.
                      </p>
                    </div>
                  </div>
                  <button onClick={dismissToolPrompt} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px', flexShrink: 0 }} aria-label="Close">×</button>
                </div>

                {/* Trust row + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', flexWrap: 'wrap' }}>
                    {[['2 min', 'to complete'], ['Free', 'no cost'], ['500+', 'businesses checked']].map(([num, lbl]) => (
                      <div key={num}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: 'var(--teal)', lineHeight: 1 }}>{num}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={goToTool}
                    style={{ background: 'var(--teal)', color: 'var(--white)', border: 'none', padding: '11px 22px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', borderRadius: 0, whiteSpace: 'nowrap', transition: 'background 0.2s', width: isMobile ? '100%' : 'auto' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
                  >
                    Try Free Tool →
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* "Try the tool" — minimized banner */}
      <AnimatePresence>
        {toolPromptMinimized && !result && !toolPromptVisible && (
          <motion.div
            initial={{ y: 64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 64, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34, delay: 0.05 }}
            onClick={expandToolPrompt}
            style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 8999, width: '100%', maxWidth: isMobile ? '100%' : '640px', background: 'var(--navy)', borderTop: '3px solid var(--teal)', boxShadow: '0 -4px 32px rgba(13,27,75,0.28)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', gap: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>📊</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1px', whiteSpace: 'nowrap' }}>Free Risk Assessment</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Find out if you're overpaying — takes 2 minutes</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span onClick={(e) => { e.stopPropagation(); goToTool() }} style={{ background: 'var(--teal)', color: 'var(--white)', padding: '7px 14px', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                Try Free Tool →
              </span>
              <button onClick={fullyDismissToolPrompt} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '4px 2px' }} aria-label="Dismiss">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
