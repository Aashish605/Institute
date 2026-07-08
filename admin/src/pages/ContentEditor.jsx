import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'
import { FiChevronDown, FiSave } from 'react-icons/fi'

const sections = [
  { label: 'Hero Section', icon: '🎯', keys: ['hero_heading', 'hero_headingHighlight', 'hero_subtitle', 'hero_image', 'hero_cta'] },
  { label: 'About Section', icon: '📖', keys: ['about_aboutUs_heading', 'about_aboutUs_text', 'about_introduction_heading', 'about_whyChooseUs_heading', 'about_message_heading'] },
  { label: 'Contact', icon: '📞', keys: ['contact_phone', 'contact_mobile', 'contact_email', 'contact_location', 'contact_hours'] },
  { label: 'Social Links', icon: '🔗', keys: ['social_facebook', 'social_instagram', 'social_tiktok', 'social_whatsapp'] },
  { label: 'Site Info', icon: '⚙️', keys: ['site_name', 'site_tagline', 'site_copyright'] },
  { label: 'Footer', icon: '📋', keys: ['footer_aboutText', 'footer_rights'] },
  { label: 'Mock & Notice Pages', icon: '📝', keys: ['mock_heading', 'mock_subtitle', 'notice_heading'] },
  { label: 'Courses Page', icon: '📚', keys: ['course_heading', 'course_subtitle'] },
  { label: 'Login Page', icon: '🔐', keys: ['login_heading'] },
]

const labels = {
  hero_heading: 'Heading', hero_headingHighlight: 'Highlighted Word', hero_subtitle: 'Subtitle',
  hero_image: 'Image Path', hero_cta: 'CTA Button Text',
  about_aboutUs_heading: 'About Us Heading', about_aboutUs_text: 'About Us Text',
  about_introduction_heading: 'Introduction Heading', about_whyChooseUs_heading: 'Why Choose Us Heading',
  about_message_heading: 'Message Heading',
  contact_phone: 'Phone', contact_mobile: 'Mobile', contact_email: 'Email',
  contact_location: 'Location', contact_hours: 'Office Hours',
  social_facebook: 'Facebook URL', social_instagram: 'Instagram URL',
  social_tiktok: 'TikTok URL', social_whatsapp: 'WhatsApp Number',
  site_name: 'Site Name', site_tagline: 'Tagline', site_copyright: 'Copyright Name',
  footer_aboutText: 'About Text', footer_rights: 'Rights Text',
  mock_heading: 'Mock Page Heading', mock_subtitle: 'Mock Page Subtitle',
  notice_heading: 'Notice Page Heading',
  course_heading: 'Courses Page Heading', course_subtitle: 'Courses Page Subtitle',
  login_heading: 'Login Page Heading',
}

const textareas = ['hero_subtitle', 'about_aboutUs_text', 'footer_aboutText']

export default function ContentEditor() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [openSection, setOpenSection] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/api/content').then(res => setContent(res.data)).catch(() => toast.error('Failed to load content'))
      .finally(() => setLoading(false))
  }, [])

  const updateValue = (key, value) => {
    setContent({ ...content, [key]: value })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/api/content', content)
      toast.success('Content updated')
    } catch {
      toast.error('Save failed')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <LoaderThree />
    </div>
  )

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Content Editor</h1>
          <p className="text-gray-500 mt-1">Edit text content across the website</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50 shadow-sm"
        >
          <FiSave size={18} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
        {sections.map((section, si) => (
          <div key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <motion.button
              onClick={() => setOpenSection(openSection === si ? null : si)}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-gray-800 hover:bg-gray-50/80 transition"
              whileTap={{ scale: 0.995 }}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{section.icon}</span>
                <span className="text-base">{section.label}</span>
              </span>
              <motion.span
                animate={{ rotate: openSection === si ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown size={18} className="text-gray-400" />
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {openSection === si && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                    {section.keys.map(key => (
                      <div key={key}>
                        <label className="block font-medium text-sm text-gray-600 mb-1">{labels[key] || key}</label>
                        {textareas.includes(key) ? (
                          <textarea
                            value={content[key] || ''}
                            onChange={e => updateValue(key, e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          />
                        ) : (
                          <input
                            value={content[key] || ''}
                            onChange={e => updateValue(key, e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
