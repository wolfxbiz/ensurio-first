import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Clock, Shield } from 'lucide-react'
import ProtoNav from '../prototype/home/components/ProtoNav'
import ProtoFooter from '../prototype/home/components/ProtoFooter'
import { useIsMobile } from '../prototype/home/hooks/useIsMobile'
import '../prototype/prototype.css'

const contactDetails = [
  {
    Icon: Mail,
    label: 'Email',
    lines: ['consult@insurefirst.ae', 'lobo@insurefirst.ae'],
    href: 'mailto:consult@insurefirst.ae',
    action: 'Send an email',
  },
  {
    Icon: Phone,
    label: 'Phone',
    lines: ['+971 50 976 5976'],
    href: 'tel:+971509765976',
    action: 'Call now',
  },
  {
    Icon: MapPin,
    label: 'Location',
    lines: ['Dubai, United Arab Emirates'],
    href: '#',
    action: 'Get directions',
  },
  {
    Icon: Clock,
    label: 'Office Hours',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Sat: 9:00 AM – 1:00 PM'],
    href: null,
    action: null,
  },
]

const enquiryTypes = [
  'Insurance Audit',
  'Risk Assessment',
  'Policy Review',
  'Claims Advisory',
  'Legal Claims Support',
  'Coverage Gap Analysis',
  'Business Insurance Quote',
  'Personal Insurance Quote',
  'Other',
]

const trustPoints = [
  { Icon: Shield, text: 'CBUAE Licensed — License 143' },
  { Icon: CheckCircle2, text: 'Independent, conflict-free advisory' },
  { Icon: Clock, text: 'Response within 1 business day' },
]

function FormSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '3rem 2rem' }}
    >
      <div style={{ width: '64px', height: '64px', background: 'var(--teal-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', borderRadius: '50%' }}>
        <CheckCircle2 size={32} color="var(--teal)" />
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem' }}>Message Sent</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '340px', margin: '0 auto 1.5rem' }}>
        Thank you for reaching out. Fredrick will review your enquiry and respond within one business day.
      </p>
      <a
        href="tel:+971509765976"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '10px 20px', background: 'var(--teal)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
      >
        <Phone size={14} /> Call us directly
      </a>
    </motion.div>
  )
}

function ContactForm({ isMobile }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', enquiry: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim()) e.message = 'Please describe how we can help'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '6px' }}>
        {label}{key === 'name' || key === 'email' || key === 'message' ? ' *' : ''}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }) }}
        style={{
          width: '100%',
          padding: '11px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--navy)',
          background: 'var(--white)',
          border: errors[key] ? '1.5px solid #e53e3e' : '1.5px solid var(--border)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => { if (!errors[key]) e.target.style.borderColor = 'var(--teal)' }}
        onBlur={(e) => { if (!errors[key]) e.target.style.borderColor = 'var(--border)' }}
      />
      {errors[key] && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#e53e3e', marginTop: '4px' }}>{errors[key]}</p>}
    </div>
  )

  if (submitted) return <FormSuccess />

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0 1.25rem' }}>
        <div>{field('Full Name', 'name', 'text', 'e.g. Ahmed Al Mansoori')}</div>
        <div>{field('Email Address', 'email', 'email', 'you@company.ae')}</div>
        <div>{field('Phone Number', 'phone', 'tel', '+971 50 000 0000')}</div>
        <div>{field('Company / Organisation', 'company', 'text', 'Optional')}</div>
      </div>

      {/* Enquiry type */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '6px' }}>
          What Can We Help With?
        </label>
        <select
          value={form.enquiry}
          onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
          style={{ width: '100%', padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: '14px', color: form.enquiry ? 'var(--navy)' : 'var(--text-muted)', background: 'var(--white)', border: '1.5px solid var(--border)', outline: 'none', boxSizing: 'border-box', cursor: 'pointer', appearance: 'auto' }}
        >
          <option value="">Select an enquiry type…</option>
          {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Message */}
      <div style={{ marginBottom: '1.75rem' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '6px' }}>
          Your Message *
        </label>
        <textarea
          rows={5}
          placeholder="Describe your situation or what you'd like to discuss…"
          value={form.message}
          onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
          style={{
            width: '100%',
            padding: '11px 14px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--navy)',
            background: 'var(--white)',
            border: errors.message ? '1.5px solid #e53e3e' : '1.5px solid var(--border)',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
            minHeight: '120px',
          }}
          onFocus={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--teal)' }}
          onBlur={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--border)' }}
        />
        {errors.message && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#e53e3e', marginTop: '4px' }}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '13px 28px', background: 'var(--teal)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '0.02em', width: isMobile ? '100%' : 'auto', justifyContent: 'center', transition: 'background 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--teal-dark)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--teal)'}
      >
        <Send size={15} /> Send Message
      </button>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
        By submitting this form you agree to be contacted regarding your insurance enquiry. We do not share your data with third parties.
      </p>
    </form>
  )
}

export default function ContactPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', color: '#111827' }}>
      <ProtoNav />
      <main>

        {/* ── Hero ── */}
        <section style={{ background: 'var(--navy)', padding: isMobile ? '3rem 0.75rem' : '4.5rem 0', borderBottom: '3px solid var(--teal)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(14,164,114,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,164,114,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0' : '0 4rem', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Link to="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/</span>
                <span style={{ fontSize: '13px', color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Contact Us</span>
              </div>
              <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
                Let's Talk
              </p>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', maxWidth: '600px', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Get Expert Insurance Advice Today
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '14px' : '16px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '1.75rem' }}>
                Book a no-obligation consultation with Fredrick Lobo and find out exactly where your insurance stands.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {trustPoints.map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px' }}>
                    <Icon size={14} color="var(--teal)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Main content ── */}
        <section style={{ background: 'var(--light-bg)', padding: isMobile ? '3rem 0' : '5rem 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 0.75rem' : '0 4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr', gap: isMobile ? '2rem' : '1px', background: isMobile ? 'transparent' : 'var(--border)' }}>

              {/* Left: Form */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{ background: 'var(--white)', padding: isMobile ? '1.75rem' : '2.5rem 3rem', height: '100%', boxSizing: 'border-box' }}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <MessageSquare size={20} color="var(--teal)" />
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Send Us a Message</h2>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Fill in the form and we will come back to you within one business day.
                  </p>
                </div>
                <ContactForm isMobile={isMobile} />
              </motion.div>

              {/* Right: Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: isMobile ? 'transparent' : 'var(--border)', height: '100%' }}
              >
                {contactDetails.map(({ Icon, label, lines, href, action }) => (
                  <div
                    key={label}
                    style={{ background: 'var(--white)', padding: isMobile ? '1.25rem' : '1.75rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                  >
                    <div style={{ width: '44px', height: '44px', background: 'var(--teal-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="var(--teal)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '4px' }}>{label}</p>
                      {lines.map((line) => (
                        <p key={line} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--navy)', fontWeight: 500, margin: '0 0 2px' }}>{line}</p>
                      ))}
                      {action && href && (
                        <a
                          href={href}
                          style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--teal)', textDecoration: 'none', marginTop: '6px', display: 'inline-block' }}
                        >
                          {action} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {/* WhatsApp CTA */}
                <div style={{ background: 'var(--navy)', padding: isMobile ? '1.25rem' : '1.75rem 2rem', flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '0.5rem' }}>Prefer WhatsApp?</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    Message us directly on WhatsApp for a faster response.
                  </p>
                  <a
                    href="https://wa.me/971509765976"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '11px 20px', background: '#25D366', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ strip ── */}
        <section style={{ background: 'var(--white)', padding: isMobile ? '2.5rem 0' : '4rem 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 0.75rem' : '0 4rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '1.5rem' }}>Quick Answers</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.5rem' : '2.5rem' }}>
              {[
                { q: 'Is the initial consultation free?', a: 'Yes. We offer a no-obligation first consultation to understand your situation before recommending any engagement.' },
                { q: 'How quickly can you respond to a claim?', a: 'We respond to claim enquiries the same business day and can be engaged on an emergency basis for urgent losses.' },
                { q: 'Do you work with all insurers in UAE?', a: 'Yes. As an independent consultant licensed by CBUAE, we work across all registered insurers in the UAE market.' },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14.5px', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{q}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <ProtoFooter />
    </div>
  )
}
