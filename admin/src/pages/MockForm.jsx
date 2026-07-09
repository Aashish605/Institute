import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import FileUpload from '../components/FileUpload'
import { FormField } from '../components/ui/FormField'
import { FiFileText, FiCalendar, FiSave, FiArrowLeft, FiFile, FiPaperclip } from 'react-icons/fi'

export default function MockForm() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = !!id
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    if (isEdit && location.state?.mock) {
      const m = location.state.mock
      reset({ Title: m.Title, Week: m.Week, Description: m.Description })
      setFileUrl(m.FileUrl || '')
      setFileType(m.FileType || '')
    }
  }, [isEdit, location.state, reset])

  const onSubmit = async (data) => {
    data.FileUrl = fileUrl
    data.FileType = fileType
    if (!data.FileUrl) { toast.error('Please upload a result file'); return }
    setSubmitting(true)
    try {
      if (isEdit) {
        await api.put('/api/mock/update', { Id: id, ...data })
        toast.success('Mock result updated')
      } else {
        await api.post('/api/mock/post', data)
        toast.success('Mock result created')
      }
      navigate('/mocks')
    } catch {
      toast.error(isEdit ? 'Update failed' : 'Create failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/mocks')} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{isEdit ? 'Edit Mock Result' : 'Add Mock Result'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEdit ? 'Update mock test result' : 'Publish a new mock test result'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b from-white to-gray-50/30 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-400" />

        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-lg">📊</span>
                  <h3 className="text-base font-semibold text-gray-800">Mock Details</h3>
                </div>
                <div className="space-y-4">
                  <FormField label="Title" name="Title" icon={FiFileText} register={register} errors={errors} required placeholder="e.g. Mock Test Week 10" />
                  <FormField label="Week" name="Week" icon={FiCalendar} register={register} errors={errors} required placeholder="e.g. Week 10" helperText="The week number or period this mock test covers" />
                  <FormField label="Description" name="Description" register={register} errors={errors} required type="textarea" rows={5} placeholder="Describe what this mock test covers..." />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiPaperclip className="text-purple-600" size={16} /> Result File
                </h4>
                <FileUpload onUpload={({ url, fileType: ft }) => { setFileUrl(url); setFileType(ft) }} label="Upload File (Image / PDF / Excel)" />
                {fileUrl && (
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <FiFile className="text-purple-500 shrink-0" size={20} />
                    <div className="text-sm text-purple-700 truncate flex-1">{fileUrl.split('/').pop() || 'File uploaded'}</div>
                    <span className="text-xs font-medium px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full uppercase">{fileType || 'file'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
          <button type="button" onClick={() => navigate('/mocks')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition">
            <FiArrowLeft size={16} /> Cancel
          </button>
          <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            {submitting ? (
              <><Spinner /> Saving...</>
            ) : (
              <><FiSave size={16} /> {isEdit ? 'Update Mock Result' : 'Create Mock Result'}</>
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
