import { useState, useRef } from 'react'
import axios from 'axios'
import { FiUploadCloud } from 'react-icons/fi'
import { motion } from 'motion/react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD || 'drsfbaluf'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || 'image_preset'

export default function ImageUpload({ onUpload, label }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', UPLOAD_PRESET)
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)
      onUpload(res.data.secure_url)
    } catch (err) {
      console.error('Upload failed', err)
    }
    setUploading(false)
  }

  return (
    <div>
      <label className="block font-semibold mb-1 text-gray-700">{label || 'Upload Image'}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="h-32 mx-auto rounded-lg object-cover" />
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
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</p>
          </div>
        )}
      </div>
    </div>
  )
}
