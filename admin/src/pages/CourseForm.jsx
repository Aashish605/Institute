import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../config/api'
import ImageUpload from '../components/ImageUpload'

export default function CourseForm() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = !!id
  const { register, handleSubmit, reset } = useForm()
  const [features, setFeatures] = useState([{ icon: '', text: '' }])
  const [subjects, setSubjects] = useState([''])

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
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Course' : 'Add Course'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input id="title" {...register('title', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
          <textarea id="description" {...register('description', { required: true })} rows={4} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="image" className="block font-semibold mb-1">Image URL</label>
          <input id="image" {...register('image')} placeholder="Paste image URL or upload below" className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2" />
          <ImageUpload onUpload={(url) => { const ev = { target: { value: url } }; register('image').onChange(ev) }} label="Or upload new image" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="oldPrice" className="block font-semibold mb-1">Old Price</label>
            <input id="oldPrice" type="number" {...register('oldPrice', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label htmlFor="newPrice" className="block font-semibold mb-1">New Price</label>
            <input id="newPrice" type="number" {...register('newPrice', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label htmlFor="discount" className="block font-semibold mb-1">Discount</label>
            <input id="discount" {...register('discount', { required: true })} placeholder="e.g. 38%" className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Features</label>
          {features.map((f, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} placeholder="Icon URL" className="flex-1 border rounded-lg px-4 py-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input value={f.text} onChange={e => updateFeature(i, 'text', e.target.value)} placeholder="Feature text" className="flex-[2] border rounded-lg px-4 py-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {features.length > 1 && (
                <button type="button" onClick={() => removeFeature(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg">X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-sm text-primary font-medium hover:underline">+ Add feature</button>
        </div>
        <div>
          <label className="block font-semibold mb-1">Subjects</label>
          {subjects.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={s} onChange={e => updateSubject(i, e.target.value)} placeholder="Subject name" className="flex-1 border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {subjects.length > 1 && (
                <button type="button" onClick={() => removeSubject(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg">X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSubject} className="text-sm text-primary font-medium hover:underline">+ Add subject</button>
        </div>
        <div>
          <label htmlFor="materialsLink" className="block font-semibold mb-1">Materials Link</label>
          <input id="materialsLink" {...register('materialsLink')} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="mockTestLink" className="block font-semibold mb-1">Mock Test Link</label>
          <input id="mockTestLink" {...register('mockTestLink')} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold">
            {isEdit ? 'Update Course' : 'Create Course'}
          </button>
          <button type="button" onClick={() => navigate('/courses')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
