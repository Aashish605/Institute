import api from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react"

const NoticeModel = () => {
  const { model } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/notice/get/${model}`)
      .then(res => setNotice(res.data))
      .catch(() => setNotice(null))
      .finally(() => setLoading(false))
  }, [model]);

  if (loading) return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-8 skeleton rounded w-1/2 mb-4" />
        <div className="h-80 skeleton rounded-xl mb-4" />
      </div>
    </div>
  );

  if (!notice) return (
    <div className="pt-24 pb-12 text-center">
      <p className="text-error text-lg">Notice not found.</p>
      <NavLink to="/notice" className="mt-4 inline-block px-4 py-2 rounded-lg bg-primary text-white font-semibold">Back to Notices</NavLink>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <NavLink to="/notice" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Notices
          </NavLink>
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{notice.Title}</h1>
              <div className="text-text-muted text-sm">{new Date(notice.createdAt).toLocaleDateString()}</div>
            </div>
            {notice.Description && <p className="text-text-secondary text-center mb-6">{notice.Description}</p>}
            <img src={notice.Img} alt={notice.Title} className="w-full rounded-xl shadow-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NoticeModel
