import api from '../config/api'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useContent } from '../context/ContentContext'
import { NOTICE } from '../config/site'
import { motion } from "motion/react"
import ErrorState from '../Components/ErrorState'
import { AlertTriangle } from 'lucide-react'

const Notice = () => {
  const content = useContent();
  const [notices, setNotices] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const getdata = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/api/notice/get?page=${page}&limit=${itemsPerPage}`)
      setNotices(data.data.rows)
      setTotalPages(data.data.totalPages)
    } catch {
      setError('Failed to load notices');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getdata(currentPage) }, [currentPage]);

  if (error) return (
    <ErrorState
      title="Failed to Load Notices"
      message={error}
      onRetry={() => getdata(currentPage)}
      showHome={true}
      icon={AlertTriangle}
    />
  )

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8 rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/10 via-white to-primary/10 p-6 sm:p-7 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-secondary shadow-sm border border-secondary/10 mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  <path d="M8 7h8" />
                  <path d="M8 12h8" />
                  <path d="M8 17h5" />
                </svg>
                Latest Announcements
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-text">{content.notice_heading || NOTICE.heading}</h1>
              <p className="text-text-secondary max-w-2xl text-sm sm:text-base">Stay updated with the newest notices and important campus updates.</p>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm border border-border/60">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-primary">
                <path d="M6 8h12" />
                <path d="M6 12h8" />
                <path d="M6 16h5" />
              </svg>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-border">
                <div className="h-36 skeleton" />
                <div className="p-5">
                  <div className="h-5 skeleton rounded w-3/4 mb-3" />
                  <div className="h-3 skeleton rounded w-full mb-2" />
                  <div className="h-3 skeleton rounded w-5/6 mb-4" />
                  <div className="h-10 skeleton rounded-lg w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No notices found.</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 content-start">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-xl border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-36 overflow-hidden">
                    <img src={notice.Img} alt={notice.Title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 line-clamp-1">{notice.Title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{notice.Description}</p>
                    <NavLink to={`/notice/${notice.id}`} className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-white text-sm font-semibold shadow-sm hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/20 hover:scale-[1.02] transition-all duration-200">
                      {content.notice_viewButton || NOTICE.viewButton}
                      <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-surface transition-colors disabled:opacity-30">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-primary text-white' : 'border border-border hover:bg-surface'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-surface transition-colors disabled:opacity-30">
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice
