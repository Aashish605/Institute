import { useState } from 'react'
import axios from 'axios'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD || 'drsfbaluf'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || 'image_preset'

export default function ImageUpload({ onUpload, label }) {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
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
      <label className="block font-semibold mb-1">{label || 'Upload Image'}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
      />
      {uploading && <span className="text-sm text-blue-600">Uploading...</span>}
    </div>
  )
}
