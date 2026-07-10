import { useState } from 'react'
import api from '../config/api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useContent } from '../context/ContentContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { CONTACT, SOCIAL } from '../config/site'
import { motion, AnimatePresence } from 'motion/react'

/* ── helpers ── */
const isOpen = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const day = now.getDay()   // 0=Sun,6=Sat
  const hour = now.getHours()
  const open = day !== 6 && hour >= 9 && hour < 17
  return open
}

const InputField = ({ id, label, type = 'text', register, error, rows, placeholder }) => {
  const [focused, setFocused] = useState(false)
  const Tag = rows ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
        {label}
      </label>
      <Tag
        id={id}
        type={type}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...register}
        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none resize-none"
        style={{
          border: `1.5px solid ${error ? 'var(--color-error)' : focused ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: focused ? 'rgba(0,78,143,0.02)' : 'white',
          boxShadow: focused ? '0 0 0 3px rgba(0,78,143,0.08)' : 'none',
          color: 'var(--color-text)',
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="text-xs mt-1.5 flex items-center gap-1"
            style={{ color: 'var(--color-error)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const InfoCard = ({ icon, label, children, href, accent }) => {
  const MotionTag = href ? motion.a : motion.div
  return (
    <MotionTag
      {...(href ? { href } : {})}
      className="flex gap-4 items-start p-4 rounded-xl bg-white group"
      style={{
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${accent || 'var(--color-primary)'}`,
        textDecoration: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      whileHover={href ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' } : undefined}
      transition={{ duration: 0.15 }}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${accent || 'var(--color-primary)'}18` }}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
        <div className="text-sm" style={{ color: 'var(--color-text)' }}>{children}</div>
      </div>
    </MotionTag>
  )
}

const Contact = () => {
  useDocumentTitle('Contact')
  const content = useContent()
  const open = isOpen()
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/api/contact', data)
      toast.success('Message sent successfully!')
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-10 px-10 sm:px-16 py-12"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #0077c2 100%)' }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(247,146,29,0.25)', color: 'var(--color-secondary-light)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-secondary-light)' }} />
              Reach Out
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {content.contact_heading || CONTACT.heading}
            </h1>
            <p className="max-w-xl text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {content.contact_subtitle || CONTACT.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-3 h-full"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-10 text-center flex flex-col items-center justify-center h-full"
                  style={{ border: '1px solid var(--color-border)', minHeight: '420px' }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(16,185,129,0.12)' }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-2xl p-6 sm:p-8 space-y-5 h-full flex flex-col"
                  style={{ border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div>
                    <h2 className="text-lg font-bold mb-1">Send us a message</h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>We respond within 24 hours on working days.</p>
                  </div>

                  {/* Name + Email — 2-col row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField id="fullName" label="Full Name" placeholder="Your name"
                      register={register('fullName', { required: 'Name is required' })}
                      error={errors.fullName} />
                    <InputField id="email" label="Email" type="email" placeholder="your@email.com"
                      register={register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                      error={errors.email} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField id="phone" label="Phone" type="tel" placeholder="+977 XXXXXXXXXX"
                      register={register('phone', { required: 'Phone is required' })}
                      error={errors.phone} />
                    <InputField id="subject" label="Subject" placeholder="How can we help?"
                      register={register('subject', { required: 'Subject is required' })}
                      error={errors.subject} />
                  </div>

                  <InputField id="message" label="Message" rows={4} placeholder="Your message..."
                    register={register('message', { required: 'Message is required' })}
                    error={errors.message} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5"
                    style={{
                      background: isSubmitting
                        ? 'var(--color-text-muted)'
                        : 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)',
                      boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(247,146,29,0.35)',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".3" /><path d="M21 12a9 9 0 00-9-9" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>

                  {/* Social links */}
                  <div className="pt-2 border-t mt-auto" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-xs text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>Follow us on social media</p>
                    <div className="flex justify-center gap-3">
                      {[
                        { href: SOCIAL.facebook, label: 'Facebook', color: '#1877F2', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                        { href: SOCIAL.instagram, label: 'Instagram', color: '#E1306C', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                        { href: SOCIAL.tiktok, label: 'TikTok', color: '#000000', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7a8.16 8.16 0 004.77 1.52V6.4a4.85 4.85 0 01-1-.29z"/></svg> },
                      ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                          style={{ background: `${s.color}18`, color: s.color }}
                          title={s.label}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col"
          >
            <div className="flex flex-col flex-1 space-y-3">
            {/* Open/Closed badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{
                background: open ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${open ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: open ? 'var(--color-success)' : 'var(--color-error)' }} />
              <span className="text-sm font-medium" style={{ color: open ? 'var(--color-success)' : 'var(--color-error)' }}>
                {open ? 'We\'re open right now' : 'Currently closed'}
              </span>
              <span className="text-xs ml-auto" style={{ color: 'var(--color-text-muted)' }}>Sun–Fri 9AM–5PM</span>
            </div>

            {/* Info cards */}
            <InfoCard
              label="Location"
              accent="var(--color-primary)"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            >
              {content.contact_location || 'Maitighar, Kathmandu, Nepal'}
              <br />
              <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Opposite St. Xavier's College</span>
            </InfoCard>

            <InfoCard
              label="Phone"
              href="tel:+977015360880"
              accent="#10b981"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.13 12.72a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
            >
              +977 01-5360880<br />
              <a href="tel:+9779851198288" style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>+977 9851198288</a>
            </InfoCard>

            <InfoCard
              label="Email"
              href="mailto:info@institute.edu.np"
              accent="var(--color-secondary)"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
            >
              info@institute.edu.np
            </InfoCard>

            <InfoCard
              label="Office Hours"
              accent="#8b5cf6"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            >
              Sunday – Friday: 9:00 AM – 5:00 PM
              <br />
              <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>Saturday: Closed</span>
            </InfoCard>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${SOCIAL.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.25)',
                borderLeft: '3px solid #25D366',
                textDecoration: 'none',
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,211,102,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.976 0C5.368 0 0 5.362 0 11.962c0 2.11.555 4.087 1.52 5.797L0 24l6.418-1.484A12.02 12.02 0 0011.976 24c6.607 0 11.976-5.362 11.976-11.962C23.952 5.362 18.583 0 11.976 0zm.024 21.846a9.924 9.924 0 01-5.024-1.364l-.36-.214-3.737.864.898-3.627-.236-.373a9.843 9.843 0 01-1.545-5.27c0-5.46 4.467-9.91 9.963-9.91 5.494 0 9.963 4.45 9.963 9.91 0 5.461-4.47 9.984-9.922 9.984z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-text-muted)' }}>WhatsApp</div>
                <div className="text-sm font-medium" style={{ color: '#25D366' }}>Chat with us instantly</div>
              </div>
              <svg className="ml-auto group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            </div>
          </motion.div>
        </div>

        {/* ── Map — full width below grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ background: 'var(--color-primary)' }}>
            <div>
              <div className="text-white font-semibold">Find Us</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>Visit our institute</div>
            </div>
            <a
              href="https://maps.google.com/?q=Kathmandu+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', textDecoration: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Get Directions
            </a>
          </div>
          <iframe
            title="Map"
            className="w-full h-80"
            src={CONTACT.info.map.embedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
