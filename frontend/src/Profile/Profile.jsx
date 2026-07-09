import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUser } from '../Redux/Auth/AuthSlice'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import api from '../config/api'
import { PAYMENTS } from '../config/site'
import { toast } from 'react-toastify'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from 'motion/react'
import { BadgeCheck, Building2, Camera, GraduationCap, LogOut, Mail, Phone, Sparkles, UserRound, ShieldCheck } from 'lucide-react'

function Profile() {
  useDocumentTitle('Profile')
  const dispatch = useDispatch()
  const logIn = useSelector((state) => state.auth.user)
  const [name, setname] = useState(logIn?.displayName || '')
  const [age, setAge] = useState(logIn?.age || '')
  const [number, setNumber] = useState(logIn?.number || '')
  const [userClass, setUserClass] = useState(logIn?.class || '')
  const [school, setSchool] = useState(logIn?.school || '')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const fileInputRef = useRef(null)

  const updated = !!(logIn?.number && logIn?.class && logIn?.age && logIn?.school)
  const profileImage = logIn?.photo?.trim() ? logIn.photo : '/profile.jpg'

  useEffect(() => {
    setname(logIn?.displayName || '')
    setAge(logIn?.age || '')
    setNumber(logIn?.number || '')
    setUserClass(logIn?.class || '')
    setSchool(logIn?.school || '')
  }, [logIn?.displayName, logIn?.age, logIn?.number, logIn?.class, logIn?.school])

  const validate = () => {
    const errs = {}
    if (!name?.trim()) errs.name = 'Name is required'
    if (age && (!/^\d+$/.test(age) || Number(age) < 1 || Number(age) > 120)) errs.age = 'Enter a valid age (1–120)'
    if (number && !/^[\d\s+\-()]{7,20}$/.test(number)) errs.number = 'Enter a valid phone number'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await api.put('/auth/update', { name, age, number, class: userClass, school })
      if (res.data.user) {
        dispatch(setUser(res.data.user))
        toast.success('Profile updated!')
      } else {
        toast.error('Update failed')
      }
    } catch {
      toast.error('Update failed')
    }
    setLoading(false)
  }

  const uploadPhoto = async (file) => {
    setUploadingPhoto(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', PAYMENTS.cloudinary.uploadPreset)
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${PAYMENTS.cloudinary.cloudName}/image/upload`, data)
      const updateRes = await api.put('/auth/update', { photo: res.data.secure_url })
      if (updateRes.data.user) {
        dispatch(setUser(updateRes.data.user))
        toast.success('Profile photo updated!')
      }
    } catch {
      toast.error('Failed to update profile photo')
    }
    setUploadingPhoto(false)
  }

  if (!logIn) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,139,0,0.12),_transparent_32%),linear-gradient(135deg,_#fffdf8_0%,_#f8fafc_100%)] px-6 py-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-3xl border border-border/60 bg-white/90 p-8 text-center shadow-xl shadow-primary/10 backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserRound className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-text">You are not signed in</h1>
          <p className="mt-3 text-sm leading-6 text-text-secondary">Please log in to view and update your profile details.</p>
          <a href="/profile/login" className="mt-6 inline-flex items-center justify-center rounded-xl bg-secondary px-5 py-3 font-semibold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:bg-secondary-light hover:scale-[1.02]">
            Go to Login
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,139,0,0.12),_transparent_32%),linear-gradient(135deg,_#fffdf8_0%,_#f8fafc_100%)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-border/60 bg-white/80 p-4 shadow-[0_25px_80px_-30px_rgba(2,18,43,0.35)] backdrop-blur md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.2fr]">
            <div className="rounded-[24px] border border-primary/10 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                My Profile
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                    <img src={profileImage} alt={logIn.displayName || 'Profile'} className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/30 transition-all duration-200">
                      {uploadingPhoto ? (
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </div>
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={(e) => { if (e.target.files[0]) uploadPhoto(e.target.files[0]); e.target.value = '' }} />
                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white shadow-md pointer-events-none">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                </div>
                <h1 className="mt-5 text-2xl font-semibold text-text">{logIn.displayName}</h1>
                <p className="mt-1 text-sm text-text-secondary">{logIn.email}</p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${updated ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {updated ? 'Profile Complete' : 'Needs Update'}
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-text-secondary shadow-sm">
                    {logIn.photo ? 'Google Account' : 'Account'}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/70 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Email</p>
                    <p className="text-sm font-medium text-text">{logIn.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/70 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Phone</p>
                    <p className="text-sm font-medium text-text">{number || 'Not added yet'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/70 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Class</p>
                    <p className="text-sm font-medium text-text">{userClass || 'Not added yet'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/70 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">School</p>
                    <p className="text-sm font-medium text-text">{school || 'Not added yet'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/50 bg-surface/70 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-text">Personal Details</h2>
                  <p className="mt-1 text-sm text-text-secondary">Keep your profile fresh so we can support you better.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Secure account
                </div>
              </div>

              <form onSubmit={handleUpdate} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition focus:ring-2 ${errors.name ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'}`} />
                    {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text">Email</label>
                    <input type="text" value={logIn.email} readOnly className="w-full cursor-not-allowed rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary outline-none" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text">Age</label>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition focus:ring-2 ${errors.age ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'}`} />
                    {errors.age && <p className="mt-1 text-xs text-error">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text">Phone Number</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition focus:ring-2 ${errors.number ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'}`} />
                    {errors.number && <p className="mt-1 text-xs text-error">{errors.number}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text">Class</label>
                  <input type="text" value={userClass} onChange={(e) => setUserClass(e.target.value)} className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text">School / College</label>
                  <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50">
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                  <button type="button" onClick={() => { api.get('/auth/logout').finally(() => dispatch(clearUser())) }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-error/20 bg-error/5 px-5 py-3 text-sm font-semibold text-error transition-all duration-200 hover:bg-error/10">
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile;
