import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import FileUpload from '../components/FileUpload'

export default function MockForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [fileUrl, setFileUrl] = useState('')
  const [fileType, setFileType] = useState('')

  const onSubmit = async (data) => {
    data.FileUrl = fileUrl
    data.FileType = fileType
    if (!data.FileUrl) { toast.error('Please upload a result file'); return }
    try {
      await api.post('/api/mock/post', data)
      toast.success('Mock result created')
      navigate('/mocks')
    } catch { toast.error('Create failed') }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Mock Result</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label htmlFor="Title" className="block font-semibold mb-1">Title</label>
          <input id="Title" {...register('Title', { required: true })} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="Week" className="block font-semibold mb-1">Week</label>
          <input id="Week" {...register('Week', { required: true })} placeholder="e.g. Week 10" className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="Description" className="block font-semibold mb-1">Description</label>
          <textarea id="Description" {...register('Description', { required: true })} rows={4} className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <FileUpload onUpload={({ url, fileType: ft }) => { setFileUrl(url); setFileType(ft) }} label="Upload Result File (Image / PDF / Excel)" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold">Create Mock Result</button>
          <button type="button" onClick={() => navigate('/mocks')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">Cancel</button>
        </div>
      </form>
    </motion.div>
  )
}
