import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import ImageUpload from '../components/ImageUpload'
import { FormField } from '../components/ui/FormField'
import { FiBook, FiDollarSign, FiTag, FiLink, FiSave, FiArrowLeft, FiPlus, FiX, FiImage, FiBarChart2 } from 'react-icons/fi'

export default function CourseForm() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = !!id
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [features, setFeatures] = useState([{ icon: '', text: '' }])
  const [subjects, setSubjects] = useState([''])
  const imageUrl = watch('image')

  useEffect(() => {
    if (isEdit && location.state?.course) {
      const c = location.state.course
      reset({
        title: c.title,
        description: c.description,
        image: c.image,
        oldPrice: c.oldPrice,
        newPrice: c.newPrice,
        discount: c.discount,
        materialsLink: c.materialsLink,
        mockTestLink: c.mockTestLink || '',
      })
      setFeatures(c.features || [{ icon: '', text: '' }])
      setSubjects(c.subjects || [''])
    }
  }, [isEdit, location.state, reset])

  const onSubmit = async (data) => {
    data.features = features.filter(f => f.text)
    data.subjects = subjects.filter(s => s)
    setSubmitting(true)
    try {
      if (isEdit) {
        await api.put(`/api/course/${id}`, data)
        toast.success('Course updated')
      } else {
        await api.post('/api/course', data)
        toast.success('Course created')
      }
      navigate('/courses')
    } catch {
      toast.error(isEdit ? 'Update failed' : 'Create failed')
    } finally {
      setSubmitting(false)
    }
  }

  const addFeature = () => setFeatures([...features, { icon: '', text: '' }])
  const updateFeature = (i, field, value) => {
    const copy = [...features]; copy[i][field] = value; setFeatures(copy)
  }
  const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i))

  const addSubject = () => setSubjects([...subjects, ''])
  const updateSubject = (i, value) => {
    const copy = [...subjects]; copy[i] = value; setSubjects(copy)
  }
  const removeSubject = (i) => setSubjects(subjects.filter((_, idx) => idx !== i))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/courses')} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{isEdit ? 'Edit Course' : 'Add Course'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEdit ? 'Update course details' : 'Create a new course listing'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b from-white to-gray-50/30 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- LEFT COLUMN --- */}
            <div className="col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">📋</span>
                  <h3 className="text-base font-semibold text-gray-800">Basic Information</h3>
                </div>
                <div className="space-y-4">
                  <FormField label="Title" name="title" icon={FiBook} register={register} errors={errors} required placeholder="e.g. BE Entrance Preparation (Online)" />
                  <FormField label="Description" name="description" register={register} errors={errors} required type="textarea" rows={4} placeholder="Describe what this course offers..." helperText="Provide a clear overview of the course content and benefits" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">💰</span>
                  <h3 className="text-base font-semibold text-gray-800">Pricing</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Old Price" name="oldPrice" type="number" icon={FiDollarSign} register={register} errors={errors} required />
                  <FormField label="New Price" name="newPrice" type="number" icon={FiDollarSign} register={register} errors={errors} required />
                  <FormField label="Discount" name="discount" icon={FiTag} register={register} errors={errors} required placeholder="e.g. 38%" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">⭐</span>
                  <h3 className="text-base font-semibold text-gray-800">Course Features</h3>
                </div>
                <div className="space-y-2.5">
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <input value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} placeholder="Icon URL" className="flex-1 border rounded-xl px-3 py-2 border-gray-300 text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-200 bg-white" />
                      <input value={f.text} onChange={e => updateFeature(i, 'text', e.target.value)} placeholder="Feature text" className="flex-[2] border rounded-xl px-3 py-2 border-gray-300 text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-200 bg-white" />
                      {features.length > 1 && (
                        <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <FiX size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addFeature} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition">
                    <FiPlus size={14} /> Add feature
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">📚</span>
                  <h3 className="text-base font-semibold text-gray-800">Subjects</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {subjects.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-primary/5 text-primary rounded-full px-3 py-1.5 text-sm">
                      <input value={s} onChange={e => updateSubject(i, e.target.value)} className="bg-transparent border-none outline-none w-20 text-sm text-primary placeholder-primary/40" placeholder="Subject" />
                      {subjects.length > 1 && (
                        <button type="button" onClick={() => removeSubject(i)} className="text-primary/60 hover:text-primary p-0.5 rounded-full hover:bg-primary/10 transition">
                          <FiX size={14} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={addSubject} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition">
                  <FiPlus size={14} /> Add subject
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">🔗</span>
                  <h3 className="text-base font-semibold text-gray-800">Course Links</h3>
                </div>
                <div className="space-y-4">
                  <FormField label="Materials Link" name="materialsLink" icon={FiLink} register={register} errors={errors} required placeholder="https://drive.google.com/..." helperText="Link to study materials for enrolled students" />
                  <FormField label="Mock Test Link" name="mockTestLink" icon={FiLink} register={register} errors={errors} required placeholder="https://..." helperText="Link to mock test portal for enrolled students" />
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiImage className="text-primary" size={16} /> Course Image
                </h4>
                <input
                  {...register('image', { required: 'Image URL is required' })}
                  placeholder="Paste image URL..."
                  className="w-full border rounded-xl px-3 py-2 text-sm border-gray-300 bg-white focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition-all duration-200"
                />
                {errors.image && <p className="text-red-500 text-xs flex items-center gap-1"><span>•</span>{errors.image.message}</p>}
                {imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <img src={imageUrl} alt="preview" className="w-full h-36 object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
                <ImageUpload onUpload={(url) => setValue('image', url)} label="Upload" />
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiBarChart2 className="text-primary" size={16} /> Summary
                </h4>
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between">
                    <span>Features</span>
                    <span className="font-medium text-gray-700">{features.filter(f => f.text).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subjects</span>
                    <span className="font-medium text-gray-700">{subjects.filter(s => s).length}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between">
                    <span>Status</span>
                    <span className="font-medium text-green-600">{isEdit ? 'Editing' : 'New'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/courses')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition">
            <FiArrowLeft size={16} /> Cancel
          </button>
          <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            {submitting ? (
              <><Spinner /> Saving...</>
            ) : (
              <><FiSave size={16} /> {isEdit ? 'Update Course' : 'Create Course'}</>
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
