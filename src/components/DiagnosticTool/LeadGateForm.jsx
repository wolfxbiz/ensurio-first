import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

// ── EmailJS config ──────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier = 200 emails/month)
// 2. Create a service (Gmail / Outlook / etc.) → copy the Service ID below
// 3. Create an email template → add template variables:
//      {{from_name}}, {{from_email}}, {{company}}, {{tool}}, {{score}}
//    Set "To Email" in the template to info@insurefirst.ae
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. 'AbCdEfGhIjKlMnOp'
// ────────────────────────────────────────────────────────────────────────────

const styles = {
  gate: {
    background: 'var(--navy)',
    border: 'none',
    borderRadius: 0,
    padding: '1.75rem',
    marginTop: '1.25rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--white)',
    marginBottom: '8px',
    lineHeight: 1.3,
  },
  desc: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.65,
    marginBottom: '1.5rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
    marginBottom: '14px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    marginBottom: '14px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
  },
  input: {
    padding: '12px 14px',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: 0,
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    color: 'var(--white)',
    outline: 'none',
    background: 'rgba(255,255,255,0.08)',
    width: '100%',
    transition: 'border-color 0.2s',
  },
  error: {
    fontSize: '11px',
    color: 'var(--danger)',
    marginTop: '3px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1.25rem',
    gap: '12px',
  },
  privacy: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.38)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  btn: {
    background: 'var(--teal)',
    color: 'var(--white)',
    border: 'none',
    padding: '13px 24px',
    borderRadius: 0,
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
}

export default function LeadGateForm({ reportLabel, onSubmit, tool, score, horizontal = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  const submit = async (data) => {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  data.name,
        from_email: data.email,
        company:    data.company,
        tool:       tool ?? reportLabel,
        score:      score ?? 'N/A',
      },
      EMAILJS_PUBLIC_KEY,
    ).catch(() => {
      setError('root', { message: 'Failed to send — please email us directly at info@insurefirst.ae' })
      throw new Error('emailjs failed')
    })
    onSubmit(data)
  }

  return (
    <motion.div
      style={styles.gate}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div style={styles.title}>Download Your Free {reportLabel}</div>
      <div style={styles.desc}>
        Enter your details to receive a personalized PDF report with your full analysis and recommendations.
      </div>

      <form onSubmit={handleSubmit(submit)} noValidate>
        {horizontal ? (
          /* Horizontal layout: all 3 fields + button in one row */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input style={{ ...styles.input, ...(errors.name ? { borderColor: 'var(--danger)' } : {}) }}
                placeholder="Your name"
                onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                onBlur={(e) => (e.target.style.borderColor = errors.name ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                {...register('name', { required: 'Required' })} />
              {errors.name && <span style={styles.error}>{errors.name.message}</span>}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Work Email</label>
              <input style={{ ...styles.input, ...(errors.email ? { borderColor: 'var(--danger)' } : {}) }}
                placeholder="name@company.com" type="email"
                onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                onBlur={(e) => (e.target.style.borderColor = errors.email ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
              {errors.email && <span style={styles.error}>{errors.email.message}</span>}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Company Name</label>
              <input style={{ ...styles.input, ...(errors.company ? { borderColor: 'var(--danger)' } : {}) }}
                placeholder="Your company"
                onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                onBlur={(e) => (e.target.style.borderColor = errors.company ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                {...register('company', { required: 'Required' })} />
              {errors.company && <span style={styles.error}>{errors.company.message}</span>}
            </div>
            <button type="submit" style={styles.btn} disabled={isSubmitting}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}>
              {isSubmitting ? 'Sending...' : 'Get Report ↓'}
            </button>
          </div>
        ) : (
          /* Default stacked layout */
          <>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input style={{ ...styles.input, ...(errors.name ? { borderColor: 'var(--danger)' } : {}) }}
                  placeholder="Your name"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.name ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                  {...register('name', { required: 'Required' })} />
                {errors.name && <span style={styles.error}>{errors.name.message}</span>}
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Work Email</label>
                <input style={{ ...styles.input, ...(errors.email ? { borderColor: 'var(--danger)' } : {}) }}
                  placeholder="name@company.com" type="email"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.email ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                  {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
                {errors.email && <span style={styles.error}>{errors.email.message}</span>}
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Company Name</label>
              <input style={{ ...styles.input, ...(errors.company ? { borderColor: 'var(--danger)' } : {}) }}
                placeholder="Your company or business"
                onFocus={(e) => (e.target.style.borderColor = 'var(--teal)')}
                onBlur={(e) => (e.target.style.borderColor = errors.company ? 'var(--danger)' : 'rgba(255,255,255,0.15)')}
                {...register('company', { required: 'Required' })} />
              {errors.company && <span style={styles.error}>{errors.company.message}</span>}
            </div>
          </>
        )}

        {errors.root && (
          <p style={{ ...styles.error, marginBottom: '6px', fontSize: '11px' }}>{errors.root.message}</p>
        )}

        {!horizontal && (
          <div style={styles.footer}>
            <span style={styles.privacy}>🔒 Strictly confidential. No spam.</span>
            <button type="submit" style={styles.btn} disabled={isSubmitting}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}>
              {isSubmitting ? 'Sending...' : `Get My Report ↓`}
            </button>
          </div>
        )}
      </form>
    </motion.div>
  )
}
