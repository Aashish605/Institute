import { NavLink } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from 'motion/react'

const About = () => {
  useDocumentTitle('About')
  const content = useContent()

  const highlights = [
    { icon: "About/expert.png", title: "Expert Instructors", desc: "Knowledgeable instructors with extensive experience in competitive exam preparation." },
    { icon: "About/learning.png", title: "Flexible Learning", desc: "Practice anytime, anywhere with online exams and instant results." },
    { icon: "About/support.png", title: "Dedicated Support", desc: "Regular Q&A, doubt clearing, and guidance by IOE Ambassadors." },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[300px] sm:h-[350px] rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-primary to-primary-dark"
        >
          <div className="absolute inset-0 bg-[url('/About/image.png')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 flex flex-col justify-center h-full px-10 sm:px-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{content.about_hero_title || 'About Mirror'}</h1>
            <p className="text-lg text-white/80 max-w-xl">{content.about_hero_subtitle || 'Building a strong foundation for your future'}</p>
          </div>
        </motion.div>

        {/* About Us */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 inline-block border-b-3 border-secondary pb-1">{content.about_aboutUs_heading || 'About Us'}</h2>
          <p className="text-text-secondary leading-relaxed mt-4">
            {content.about_aboutUs_text || 'Mirror Academy is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. Founded by passionate educators and exam specialists, we exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.'}
          </p>
          <p className="text-text-secondary leading-relaxed mt-4">
            Our approach combines <span className="font-semibold text-text">expert-led teaching, data-driven performance analytics,</span> and a strong mentorship-driven community to give students the clarity, confidence, and competence they need to excel.
          </p>
        </motion.section>

        {/* Introduction */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-xl bg-surface border border-border">
          <h2 className="text-2xl font-bold mb-4">{content.about_introduction_heading || 'Introduction'}</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            At <span className="font-semibold text-text">Mirror Academy</span>, we believe that every student has the potential to excel — with the right guidance, strategy, and environment. That's why we offer a comprehensive, student-focused approach to entrance exam preparation, available both online and offline.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Focused Entrance Preparation with emphasis on conceptual clarity",
              "Chapter-wise tests, full-length exams, and smart analytics",
              "High-quality recorded lectures, practice sets, and doubt-solving",
              "Mentorship from toppers and expert faculty",
              "Personalized support and a vibrant student community",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-text-secondary">
                <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-text-secondary">At Mirror Academy, we don't just prepare you for exams — we help you unlock your full academic potential.</p>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">{content.about_whyChooseUs_heading || 'Why Students Choose Us'}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/5 flex items-center justify-center">
                  <img src={item.icon} alt={item.title} className="w-7 h-7 object-contain" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-text-secondary mt-6 max-w-2xl mx-auto text-sm">
            Founded by Pulchowk Campus graduates and front-line faculty members, Mirror contributes towards developing qualitative future engineers.
          </p>
        </motion.section>

        {/* Message from Mirror Family */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 rounded-2xl overflow-hidden bg-white border border-border shadow-sm">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-dark p-8 flex flex-col items-center justify-center text-white">
              <img src="About/person.png" alt="" className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-white/20" />
              <h3 className="text-xl font-bold text-center">{content.about_message_heading || 'Message From Mirror Family'}</h3>
            </div>
            <div className="lg:col-span-3 p-8 text-sm text-text-secondary leading-relaxed space-y-4">
              <p>Dear prospective students/Guardians, we take great delight in extending a warm welcome to you all at Mirror Academy—founded by the front-liner faculties of engineering entrance and graduates of Pulchowk Campus.</p>
              <p>Our only goal is to support our students academically and maximize their outputs in competitive examinations.</p>
              <p>Our prime location in Kathmandu Valley, Maitighar, is easily accessible. We are equipped with adequate infrastructure, quality books, and qualified instructors.</p>
              <p>Together we can grow and create an impact in the field of engineering.</p>
              <p className="font-medium text-text">- Mirror Family</p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to start your journey with Mirror Academy?</h2>
          <NavLink to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary-light transition-colors shadow-lg shadow-secondary/20">
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </NavLink>
        </motion.section>
      </div>
    </div>
  )
}

export default About
