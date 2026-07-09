import api from '../config/api'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useContent } from '../context/ContentContext'
import { MOCK } from '../config/site'
import { motion } from "motion/react"
import ErrorState from '../Components/ErrorState'
import { AlertTriangle } from 'lucide-react'

const Mock = () => {
  const content = useContent();
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const getdata = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/api/mock/get?page=${page}&limit=${itemsPerPage}`)
      setResults(data.data.rows)
      setTotalPages(data.data.totalPages)
    } catch {
      setError('Failed to load mock results');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getdata(currentPage) }, [currentPage]);

  if (error) return (
    <ErrorState
      title="Failed to Load Mock Results"
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
          className="mb-8 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-6 sm:p-7 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary shadow-sm border border-primary/10 mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4" />
                  <path d="M15 11h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4" />
                  <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                  <path d="M12 17v2" />
                </svg>
                Mock Practice Hub
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-text">{content.mock_heading || MOCK.heading}</h1>
              <p className="text-text-secondary max-w-2xl text-sm sm:text-base">{content.mock_subtitle || MOCK.subtitle}</p>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm border border-border/60">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-secondary">
                <path d="M5 7h14" />
                <path d="M5 12h14" />
                <path d="M5 17h9" />
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
                  <div className="h-3 skeleton rounded w-16 mb-2" />
                  <div className="h-5 skeleton rounded w-3/4 mb-3" />
                  <div className="h-3 skeleton rounded w-full mb-2" />
                  <div className="h-3 skeleton rounded w-5/6 mb-4" />
                  <div className="h-10 skeleton rounded-lg w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No mock results found yet.</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 content-start">
              {results.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-xl border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-36 overflow-hidden">
                    <img src={result.Img || MOCK.placeholderImage} alt={result.Title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-text-muted font-medium mb-1">Week {result.Week}</div>
                    <h3 className="font-semibold mb-2 line-clamp-1">{result.Title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{result.Description || 'View the full mock result details.'}</p>
                    <NavLink to={`/mock/${result.id}`} className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-white text-sm font-semibold shadow-sm hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/20 hover:scale-[1.02] transition-all duration-200">
                      {content.mock_viewButton || MOCK.viewButton}
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
  )
}

export default Mock
