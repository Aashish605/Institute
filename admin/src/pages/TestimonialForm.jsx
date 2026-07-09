import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import ImageUpload from '../components/ImageUpload'

export default function TestimonialForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [avatarUrl, setAvatarUrl] = useState('')

  const onSubmit = async (data) => {
    data.avatar = avatarUrl
    data.rating = Number(data.rating) || 5
    try {
      await api.post('/api/testimonial/post', data)
      toast.success('Testimonial created')
      navigate('/testimonials')
    } catch { toast.error('Create failed') }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Testimonial</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input id="name" {...register('name', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label htmlFor="rating" className="block font-semibold mb-1">Rating (1-5)</label>
            <input id="rating" type="number" min="1" max="5" defaultValue="5" {...register('rating')} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="role" className="block font-semibold mb-1">Role</label>
            <input id="role" {...register('role')} placeholder="e.g. Software Engineer" className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label htmlFor="company" className="block font-semibold mb-1">Company</label>
            <input id="company" {...register('company')} placeholder="e.g. Tech Corp" className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold mb-1">Content</label>
          <textarea id="content" {...register('content', { required: true })} rows={4} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <ImageUpload onUpload={(url) => setAvatarUrl(url)} label="Avatar Image (optional)" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold">Create Testimonial</button>
          <button type="button" onClick={() => navigate('/testimonials')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">Cancel</button>
        </div>
      </form>
    </motion.div>
  )
}
