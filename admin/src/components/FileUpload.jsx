import { useState, useRef } from 'react'
import axios from 'axios'
import { FiUploadCloud, FiFileText, FiDownload } from 'react-icons/fi'
import { motion } from 'motion/react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET

export default function FileUpload({ onUpload, label }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [fileType, setFileType] = useState(null)
  const inputRef = useRef(null)

  const detectType = (file) => {
    const name = file.name.toLowerCase()
    if (name.endsWith('.pdf')) return 'pdf'
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return 'xlsx'
    return 'image'
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const type = detectType(file)
    setFileType(type)
    if (type === 'image') {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(file.name)
    }
    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', UPLOAD_PRESET)
      const endpoint = type === 'image' ? 'image' : 'raw'
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${endpoint}/upload`, data)
      onUpload({ url: res.data.secure_url, fileType: type })
    } catch (err) {
      console.error('Upload failed', err)
    }
    setUploading(false)
  }

  return (
    <div>
      <label className="block font-semibold mb-1 text-gray-700">{label || 'Upload Result File'}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf,.xlsx,.xls"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
        {preview ? (
          <div className="relative">
            {fileType === 'image' ? (
              <img src={preview} alt="Preview" className="h-32 mx-auto rounded-lg object-cover" />
            ) : fileType === 'pdf' ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <FiFileText size={48} className="text-red-500" />
                <span className="text-sm text-gray-600 font-medium">{preview}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <FiDownload size={48} className="text-green-600" />
                <span className="text-sm text-gray-600 font-medium">{preview}</span>
              </div>
            )}
            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-semibold">Uploading...</span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <FiUploadCloud size={32} className="mx-auto text-gray-400 group-hover:text-primary transition-colors" />
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Click to upload result file
            </p>
            <p className="text-xs text-gray-400">Images, PDF, Excel (.xlsx / .xls)</p>
          </div>
        )}
      </div>
    </div>
  )
}
