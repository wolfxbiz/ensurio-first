import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { insights } from '../data/index.js'

export default function ProtoInsights() {
  return (
    <section id="insights" style={{ background: 'var(--light-bg)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.75rem' }}>
              Latest Insights
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              Latest Insights
            </h2>
          </div>
          <a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--teal)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View All Insights →
          </a>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {insights.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ background: 'var(--teal-pale)' }}
              style={{ background: 'var(--white)', padding: '1.75rem', borderRadius: 0, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
              {/* Tag badge */}
              <div style={{ display: 'inline-block', alignSelf: 'flex-start', background: 'var(--teal-pale)', color: 'var(--teal-dark)', padding: '4px 10px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', marginBottom: '1rem', borderRadius: 0 }}>
                {article.tag}
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.4, flex: 1 }}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {article.excerpt}
              </p>

              {/* Bottom: date + read time + link */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)' }}>{article.date}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} color="var(--text-muted)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)' }}>{article.readTime}</span>
                  </div>
                </div>
                <a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--teal)', textDecoration: 'none' }}>
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
