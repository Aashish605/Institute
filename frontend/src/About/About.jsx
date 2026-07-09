import { NavLink } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from 'motion/react'

const stats = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '10+', label: 'Expert Faculty' },
  { value: '5+', label: 'Years of Excellence' },
  { value: '95%', label: 'Success Rate' },
]

const highlights = [
  { icon: 'About/expert.png', title: 'Expert Instructors', desc: 'Knowledgeable instructors with extensive experience in competitive exam preparation.' },
  { icon: 'About/learning.png', title: 'Flexible Learning', desc: 'Practice anytime, anywhere with online exams and instant results.' },
  { icon: 'About/support.png', title: 'Dedicated Support', desc: 'Regular Q&A, doubt clearing, and guidance by IOE Ambassadors.' },
]

const steps = [
  'Focused Entrance Preparation with emphasis on conceptual clarity',
  'Chapter-wise tests, full-length exams, and smart analytics',
  'High-quality recorded lectures, practice sets, and doubt-solving',
  'Mentorship from toppers and expert faculty',
  'Personalized support and a vibrant student community',
]

const About = () => {
  useDocumentTitle('About')
  const content = useContent()

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-14"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #0077c2 100%)' }}
        >
          {/* decorative blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

          <div className="absolute inset-0 bg-[url('/About/image.png')] bg-cover bg-center opacity-10" />

          <div className="relative z-10 px-10 sm:px-16 pt-14 pb-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(247,146,29,0.25)', color: 'var(--color-secondary-light)' }}
            >
              Mirror Academy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-3"
            >
              {content.about_hero_title || 'About Mirror'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg max-w-xl mb-10"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {content.about_hero_subtitle || 'Building a strong foundation for your future'}
            </motion.p>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x"
              style={{ borderTop: '1px solid rgba(255,255,255,0.15)', divideColor: 'rgba(255,255,255,0.15)' }}
            >
              {stats.map((s, i) => (
                <div key={i} className="px-6 py-5 text-center" style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : undefined }}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── About Us — two-column ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14 grid lg:grid-cols-5 gap-10 items-center"
        >
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(0,78,143,0.08)', color: 'var(--color-primary)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-5"
              style={{ borderLeft: '4px solid var(--color-secondary)', paddingLeft: '1rem' }}>
              {content.about_aboutUs_heading || 'About Us'}
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {content.about_aboutUs_text || 'Mirror Academy is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. Founded by passionate educators and exam specialists, we exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.'}
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Our approach combines <span className="font-semibold" style={{ color: 'var(--color-text)' }}>expert-led teaching, data-driven performance analytics,</span> and a strong mentorship-driven community to give students the clarity, confidence, and competence they need to excel.
            </p>
          </div>

          {/* side highlight card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: 'linear-gradient(135deg, rgba(0,78,143,0.04) 0%, rgba(0,78,143,0.10) 100%)', border: '1px solid rgba(0,78,143,0.12)' }}>
              {[
                { label: 'Founded', value: '2019' },
                { label: 'Location', value: 'Maitighar, Kathmandu' },
                { label: 'Mode', value: 'Online & Offline' },
                { label: 'Specialty', value: 'IOE / CSIT Entrance' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < 3 ? '1px solid rgba(0,78,143,0.1)' : undefined }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Introduction — numbered steps ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14 rounded-2xl p-8"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(247,146,29,0.1)', color: 'var(--color-secondary-dark)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-secondary)' }} />
            What Sets Us Apart
          </span>
          <h2 className="text-2xl font-bold mb-2">{content.about_introduction_heading || 'Introduction'}</h2>
          <p className="mb-7" style={{ color: 'var(--color-text-secondary)' }}>
            At <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Mirror Academy</span>, we believe that every student has the potential to excel — with the right guidance, strategy, and environment.
          </p>

          <div className="space-y-3">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-white hover:shadow-sm transition-all duration-200 group"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-white transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }}>
                  {i + 1}
                </div>
                <span className="text-sm pt-1" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            At Mirror Academy, we don't just prepare you for exams — we help you unlock your full academic potential.
          </p>
        </motion.section>

        {/* ── Why Choose Us ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14"
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(0,78,143,0.08)', color: 'var(--color-primary)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
              Our Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">{content.about_whyChooseUs_heading || 'Why Students Choose Us'}</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white text-center hover:-translate-y-1 transition-all duration-300"
                style={{
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
                whileHover={{ borderColor: 'var(--color-primary)', boxShadow: '0 4px 16px rgba(0,78,143,0.12)' }}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(0,78,143,0.08) 0%, rgba(247,146,29,0.1) 100%)' }}>
                  <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Founded by Pulchowk Campus graduates and front-line faculty members, Mirror contributes towards developing qualitative future engineers.
          </p>
        </motion.section>

        {/* ── Message from Mirror Family ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--color-border)', boxShadow: '0 4px 24px rgba(0,78,143,0.08)' }}
        >
          <div className="grid lg:grid-cols-5">
            {/* Left — person */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center p-10 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)' }}>
              <div className="absolute top-4 right-4 text-8xl font-serif opacity-10 leading-none select-none">"</div>
              <div className="relative">
                <img src="About/person.png" alt="" className="w-28 h-28 rounded-full object-cover ring-4 mb-4"
                  style={{ ringColor: 'rgba(255,255,255,0.25)' }} />
              </div>
              <h3 className="text-lg font-bold text-center mb-1">{content.about_message_heading || 'Message From Mirror Family'}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(247,146,29,0.3)', color: 'var(--color-secondary-light)' }}>
                Mirror Academy
              </span>
            </div>

            {/* Right — message */}
            <div className="lg:col-span-3 p-8 relative" style={{ background: 'white' }}>
              <div className="absolute top-6 right-8 text-7xl font-serif leading-none select-none"
                style={{ color: 'rgba(0,78,143,0.06)' }}>"</div>
              <div className="space-y-4 relative z-10">
                {[
                  'Dear prospective students and guardians, we take great delight in extending a warm welcome to you all at Mirror Academy—founded by the front-liner faculties of engineering entrance and graduates of Pulchowk Campus.',
                  'Our only goal is to support our students academically and maximize their outputs in competitive examinations.',
                  'Our prime location in Kathmandu Valley, Maitighar, is easily accessible. We are equipped with adequate infrastructure, quality books, and qualified instructors.',
                  'Together we can grow and create an impact in the field of engineering.',
                ].map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{para}</p>
                ))}
                <p className="font-semibold text-sm pt-2" style={{ color: 'var(--color-text)' }}>— Mirror Family</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── CTA — full-width gradient banner ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl overflow-hidden relative text-center py-14 px-8"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #0077c2 100%)' }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to start your journey with Mirror Academy?
            </h2>
            <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Join hundreds of students who have already taken the first step toward their dream career.
            </p>
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--color-secondary)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(247,146,29,0.4)',
              }}
            >
              Contact Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>
        </motion.section>

      </div>
    </div>
  )
}

export default About
