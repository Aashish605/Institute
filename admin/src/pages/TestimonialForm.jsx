import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import ImageUpload from '../components/ImageUpload'
import { FormField } from '../components/ui/FormField'
import { FiUser, FiMessageSquare, FiSave, FiArrowLeft, FiStar, FiCamera } from 'react-icons/fi'

export default function TestimonialForm() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = !!id
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [rating, setRating] = useState(5)
  const [hoveredStar, setHoveredStar] = useState(0)

  useEffect(() => {
    if (isEdit && location.state?.testimonial) {
      const t = location.state.testimonial
      reset({ name: t.name, role: t.role || '', company: t.company || '', content: t.content })
      setRating(t.rating || 5)
      setAvatarUrl(t.avatar || '')
    }
  }, [isEdit, location.state, reset])

  const onSubmit = async (data) => {
    data.avatar = avatarUrl
    data.rating = Number(rating) || 5
    setSubmitting(true)
    try {
      if (isEdit) {
        await api.put('/api/testimonial/update', { Id: id, ...data })
        toast.success('Testimonial updated')
      } else {
        await api.post('/api/testimonial/post', data)
        toast.success('Testimonial created')
      }
      navigate('/testimonials')
    } catch {
      toast.error(isEdit ? 'Update failed' : 'Create failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/testimonials')} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEdit ? 'Update testimonial details' : 'Share a new student testimonial'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b from-white to-gray-50/30 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-400" />

        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">👤</span>
                  <h3 className="text-base font-semibold text-gray-800">Student Information</h3>
                </div>
                <div className="space-y-4">
                  <FormField label="Name" name="name" icon={FiUser} register={register} errors={errors} required placeholder="Student name" />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Role" name="role" register={register} errors={errors} placeholder="e.g. Student" helperText="Optional" />
                    <FormField label="Company / Batch" name="company" register={register} errors={errors} placeholder="e.g. IOE 2081" helperText="Optional" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">💬</span>
                  <h3 className="text-base font-semibold text-gray-800">Testimonial Content</h3>
                </div>
                <FormField label="Content" name="content" icon={FiMessageSquare} register={register} errors={errors} required type="textarea" rows={5} placeholder="What did the student say about their experience?" helperText="Write their testimonial in their own words" />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiStar className="text-amber-500" size={16} /> Rating
                </h4>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => { setRating(star); setValue('rating', star) }}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <FiStar
                        size={24}
                        className={`transition-colors duration-150 ${
                          star <= (hoveredStar || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-semibold text-gray-600 ml-2">{rating}/5</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiCamera className="text-amber-500" size={16} /> Avatar
                </h4>
                <ImageUpload onUpload={(url) => setAvatarUrl(url)} label="Upload Avatar (optional)" />
                {avatarUrl && (
                  <div className="flex items-center gap-3">
                    <img src={avatarUrl} alt="avatar preview" className="w-14 h-14 rounded-full object-cover border-2 border-amber-200 shadow-sm" />
                    <span className="text-sm text-gray-500">Uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/testimonials')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition">
            <FiArrowLeft size={16} /> Cancel
          </button>
          <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            {submitting ? (
              <><Spinner /> Saving...</>
            ) : (
              <><FiSave size={16} /> {isEdit ? 'Update Testimonial' : 'Create Testimonial'}</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
