import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../config/api'

const sections = [
  {
    label: 'Hero Section',
    keys: ['hero_heading', 'hero_headingHighlight', 'hero_subtitle', 'hero_image', 'hero_cta'],
  },
  {
    label: 'About Section',
    keys: ['about_aboutUs_heading', 'about_aboutUs_text', 'about_introduction_heading', 'about_whyChooseUs_heading', 'about_message_heading'],
  },
  {
    label: 'Contact',
    keys: ['contact_phone', 'contact_mobile', 'contact_email', 'contact_location', 'contact_hours'],
  },
  {
    label: 'Social Links',
    keys: ['social_facebook', 'social_instagram', 'social_tiktok', 'social_whatsapp'],
  },
  {
    label: 'Site Info',
    keys: ['site_name', 'site_tagline', 'site_copyright'],
  },
  {
    label: 'Footer',
    keys: ['footer_aboutText', 'footer_rights'],
  },
  {
    label: 'Mock & Notice Pages',
    keys: ['mock_heading', 'mock_subtitle', 'notice_heading'],
  },
  {
    label: 'Courses Page',
    keys: ['course_heading', 'course_subtitle'],
  },
  {
    label: 'Login Page',
    keys: ['login_heading'],
  },
]

const labels = {
  hero_heading: 'Heading',
  hero_headingHighlight: 'Highlighted Word',
  hero_subtitle: 'Subtitle',
  hero_image: 'Image Path',
  hero_cta: 'CTA Button Text',
  about_aboutUs_heading: 'About Us Heading',
  about_aboutUs_text: 'About Us Text',
  about_introduction_heading: 'Introduction Heading',
  about_whyChooseUs_heading: 'Why Choose Us Heading',
  about_message_heading: 'Message Heading',
  contact_phone: 'Phone',
  contact_mobile: 'Mobile',
  contact_email: 'Email',
  contact_location: 'Location',
  contact_hours: 'Office Hours',
  social_facebook: 'Facebook URL',
  social_instagram: 'Instagram URL',
  social_tiktok: 'TikTok URL',
  social_whatsapp: 'WhatsApp Number',
  site_name: 'Site Name',
  site_tagline: 'Tagline',
  site_copyright: 'Copyright Name',
  footer_aboutText: 'About Text',
  footer_rights: 'Rights Text',
  mock_heading: 'Mock Page Heading',
  mock_subtitle: 'Mock Page Subtitle',
  notice_heading: 'Notice Page Heading',
  course_heading: 'Courses Page Heading',
  course_subtitle: 'Courses Page Subtitle',
  login_heading: 'Login Page Heading',
}

const textareas = ['hero_subtitle', 'about_aboutUs_text', 'footer_aboutText']

export default function ContentEditor() {
  const [content, setContent] = useState({})
  const [saving, setSaving] = useState(false)
  const [openSection, setOpenSection] = useState(0)

  useEffect(() => {
    api.get('/api/content').then(res => setContent(res.data)).catch(() => toast.error('Failed to load content'))
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Content Editor</h1>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section, si) => (
          <div key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === si ? -1 : si)}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-lg text-gray-800 hover:bg-gray-50 transition"
            >
              {section.label}
              <span className={`transform transition ${openSection === si ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openSection === si && (
              <div className="px-6 pb-6 space-y-4">
                {section.keys.map(key => (
                  <div key={key}>
                    <label className="block font-medium text-sm text-gray-600 mb-1">{labels[key] || key}</label>
                    {textareas.includes(key) ? (
                      <textarea
                        value={content[key] || ''}
                        onChange={e => updateValue(key, e.target.value)}
                        rows={3}
                        className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    ) : (
                      <input
                        value={content[key] || ''}
                        onChange={e => updateValue(key, e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
