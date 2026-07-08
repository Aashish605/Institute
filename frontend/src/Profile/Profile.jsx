import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUser } from '../Redux/Auth/AuthSlice'
import { useEffect, useState } from 'react'
import api from '../config/api'
import { toast } from 'react-toastify'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from "motion/react"

function Profile() {
  useDocumentTitle('Profile')
  const dispatch = useDispatch();
  const logIn = useSelector((state) => state.auth.user)
  const [name, setname] = useState(logIn?.displayName || '')
  const [contact, setContact] = useState(logIn?.contact || '')
  const [number, setNumber] = useState(logIn?.number || '')
  const [userClass, setUserClass] = useState(logIn?.class || '')
  const [loading, setLoading] = useState(false);

  const updated = !!(logIn?.number && logIn?.class);

  useEffect(() => {
    setname(logIn?.displayName || '');
    setContact(logIn?.contact || '');
    setNumber(logIn?.number || '');
    setUserClass(logIn?.class || '');
  }, [logIn?.displayName, logIn?.contact, logIn?.number, logIn?.class]);

  if (!logIn) return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <p className="text-xl text-text-muted">Not logged in</p>
    </div>
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/auth/update', { name, contact, number, class: userClass });
      if (res.data.user) {
        dispatch(setUser(res.data.user));
        toast.success('Profile updated!');
      } else {
        toast.error('Update failed');
      }
    } catch {
      toast.error('Update failed');
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <div className="flex flex-col items-center mb-8">
              <img src={logIn.photo?.trim() ? logIn.photo : "/profile.jpg"} alt="" className="w-24 h-24 rounded-full object-cover shadow-sm mb-4" />
              <h1 className="text-2xl font-bold">{logIn.displayName}</h1>
              <p className="text-sm text-text-muted">{logIn.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={name} onChange={e => setname(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="text" value={logIn.email} readOnly className="w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-surface cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact</label>
                <input type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="text" value={number} onChange={e => setNumber(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class</label>
                <input type="text" value={userClass} onChange={e => setUserClass(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 text-sm">
                  {loading ? 'Updating...' : updated ? 'Profile Up to Date' : 'Update Profile'}
                </button>
                <button type="button" onClick={() => { api.get('/auth/logout').finally(() => dispatch(clearUser())) }}
                  className="px-6 py-2.5 rounded-lg border border-error text-error font-semibold hover:bg-error/5 transition-colors text-sm">
                  Log Out
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
