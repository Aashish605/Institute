import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../config/api'
import ImageUpload from '../components/ImageUpload'

export default function NoticeForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [imgUrl, setImgUrl] = useState('')

  const onSubmit = async (data) => {
    data.Img = imgUrl
    if (!data.Img) { toast.error('Please upload an image'); return }
    try {
      await api.post('/api/notice/post', data)
      toast.success('Notice created')
      navigate('/notices')
    } catch { toast.error('Create failed') }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Notice</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label htmlFor="Title" className="block font-semibold mb-1">Title</label>
          <input id="Title" {...register('Title', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="Description" className="block font-semibold mb-1">Description</label>
          <textarea id="Description" {...register('Description', { required: true })} rows={4} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <ImageUpload onUpload={(url) => setImgUrl(url)} label="Upload Image" />
          {imgUrl && <img src={imgUrl} alt="preview" className="mt-2 h-32 rounded-lg object-cover" />}
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold">Create Notice</button>
          <button type="button" onClick={() => navigate('/notices')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">Cancel</button>
        </div>
      </form>
    </div>
  )
}
