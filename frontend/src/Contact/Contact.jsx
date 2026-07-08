import api from '../config/api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useContent } from '../context/ContentContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { CONTACT } from '../config/site'
import { motion } from "motion/react"

const Contact = () => {
  useDocumentTitle('Contact')
  const content = useContent()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/api/contact', data)
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <div className="pt-24 pb-16 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{content.contact_heading || CONTACT.heading}</h1>
          <p className="text-text-secondary max-w-xl mx-auto">{content.contact_subtitle || CONTACT.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Full Name</label>
                <input id="fullName" {...register("fullName", { required: "Name is required" })} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Your Name" />
                {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                <input id="email" type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="your@email.com" />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone</label>
                <input id="phone" type="tel" {...register("phone", { required: "Phone is required" })} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="+977 XXXXXXXXXX" />
                {errors.phone && <p className="text-xs text-error mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                <input id="subject" {...register("subject", { required: "Subject is required" })} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="How can we help?" />
                {errors.subject && <p className="text-xs text-error mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                <textarea id="message" rows={4} {...register("message", { required: "Message is required" })} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Your message..." />
                {errors.message && <p className="text-xs text-error mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-text-muted mb-0.5">Location</div>
                  <div className="text-sm">{content.contact_location || 'Maitighar, Kathmandu, Nepal'}<br />Opposite St. Xavier's College</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-text-muted mb-0.5">Phone</div>
                  <a href="tel:+977015360880" className="text-sm text-text hover:text-primary transition-colors block">+977 01-5360880</a>
                  <a href="tel:+9779851198288" className="text-sm text-text hover:text-primary transition-colors block">+977 9851198288</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-text-muted mb-0.5">Email</div>
                  <a href="mailto:info@piacademy.edu.np" className="text-sm text-text hover:text-primary transition-colors">info@piacademy.edu.np</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-text-muted mb-0.5">Office Hours</div>
                  <div className="text-sm">Sunday - Friday: 9AM - 5PM</div>
                  <div className="text-sm text-text-muted">Saturday: Closed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 bg-primary">
                <div className="text-white font-semibold">Find Us</div>
                <div className="text-white/70 text-sm">Visit our institute</div>
              </div>
              <iframe
                title="Map"
                className="w-full h-64"
                src={CONTACT.info.map.embedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
