import { useState, useEffect } from 'react'
import api from "../config/api";
import { NavLink } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { HERO, COURSES } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from "motion/react"
import { Award, Users, GraduationCap, BookOpen, MonitorPlay, UserCheck, Library } from 'lucide-react'
import CourseCard, { CourseCardSkeleton } from '../Components/CourseCard'
import Testimonials from '../Components/Testimonials'

const stats = [
  { label: "Years of Excellence", value: "5+", icon: Award },
  { label: "Students Taught", value: "1000+", icon: Users },
  { label: "Expert Faculty", value: "25+", icon: GraduationCap },
  { label: "Courses Offered", value: "10+", icon: BookOpen },
]

const features = [
  {
    icon: MonitorPlay,
    title: "Hybrid Learning",
    description: "Blend of live and recorded sessions by top professionals tailored to your pace.",
    highlights: ["Live interactive classes", "Recorded session library", "Flexible scheduling"],
  },
  {
    icon: UserCheck,
    title: "Personal Mentorship",
    description: "Tailored guidance from experienced mentors who help you navigate your academic journey.",
    highlights: ["One-on-one mentoring", "Progress tracking", "Doubt resolution"],
  },
  {
    icon: Library,
    title: "Resource Library",
    description: "Structured content library with curated materials for enriched learning across all subjects.",
    highlights: ["Topic-wise modules", "Practice sets", "Study materials"],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
}

const Home = () => {
  useDocumentTitle('Home')
  const content = useContent()
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/course')
      .then(res => setCourse(res.data.courses))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">


        <div className="max-w-7xl mx-auto px-6 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {content.hero_tagline || "Nepal's Premier Learning Institute"}
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.1] text-text mb-6 tracking-tight">
                {content.hero_heading || HERO.heading}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {content.hero_headingHighlight || HERO.headingHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-lg">
                {content.hero_subtitle || HERO.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <NavLink
                  to="/course"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-white font-semibold shadow-lg shadow-secondary/30 hover:bg-secondary-light hover:shadow-secondary/50 hover:scale-[1.03] transition-all duration-200"
                >
                  {content.hero_cta || HERO.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </NavLink>
                <NavLink
                  to="/about"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-white text-text-secondary font-semibold shadow-sm hover:bg-primary/5 hover:border-primary/20 hover:text-primary hover:shadow-md hover:scale-[1.03] transition-all duration-200"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </NavLink>
              </div>


            </motion.div>

            {/* Right — Image card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >


              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={content.hero_image || HERO.image}
                  alt="Hero"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#02122b]/60 via-transparent to-transparent" />

                {/* Floating card — top right */}
                <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white shadow-xl">
                  <div className="text-xs text-white/60 mb-0.5">Success Rate</div>
                  <div className="text-xl font-bold">98%</div>
                </div>

                {/* Floating card — bottom left */}
                <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">New Batch</div>
                    <div className="text-sm font-semibold">Enrolling Now</div>
                  </div>
                </div>
              </div>


            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white overflow-hidden py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative bg-white border rounded-xl p-6 text-center hover:shadow-md home-info-card">
                    <div className="w-11 h-11 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-text-muted">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <div className="rounded-2xl border border-border mx-4 mb-6 overflow-hidden">
        <section className="relative py-20 bg-surface overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/70 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4 border border-primary/10">
                <BookOpen className="w-4 h-4" />
                Featured Learning Paths
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {content.course_heading || COURSES.heading}
                </span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                {content.course_subtitle || COURSES.subtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full mx-auto mt-6" />
            </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <CourseCardSkeleton key={i} />)
          ) : (
            course.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <CourseCard course={c} index={i} />
              </motion.div>
            ))
          )}
          </div>

          {course.length > 3 && (
            <motion.div {...fadeUp} className="text-center mt-10">
              <NavLink to="/course" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-white text-text-secondary font-semibold shadow-sm hover:bg-primary/5 hover:border-primary/20 hover:text-primary hover:shadow-md hover:scale-[1.03] transition-all duration-200">
                View All Courses
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </NavLink>
            </motion.div>
          )}
        </div>
      </section>
      </div>

      {/* Why Choose Us */}
      <section className="relative py-20 mb-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Why Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose <span className="text-secondary">Us</span></h2>
            <p className="text-text-secondary max-w-xl mx-auto">Everything you need to excel in your entrance exams</p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full mx-auto mt-6" />
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl bg-white border hover:shadow-xl hover:border-secondary/20 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">{f.description}</p>
                    <ul className="space-y-2">
                      {f.highlights.map((h, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mb-6">
        <Testimonials />
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-border mx-4 mb-6 overflow-hidden">
        <section className="relative py-20 bg-surface overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Join 1000+ Students
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">Ready to Start Your Journey?</h2>
            <p className="text-text-secondary mb-10 max-w-lg mx-auto text-lg">Join us today and take the first step toward your dream career.</p>
            <NavLink to="/contact" className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary-light hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 group">
              Get Started Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </NavLink>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Home
