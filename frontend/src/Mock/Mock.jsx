import api from '../config/api'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useContent } from '../context/ContentContext'
import { MOCK } from '../config/site'
import { motion } from "motion/react"

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
    <div className="pt-24 pb-12 text-center">
      <p className="text-error text-lg mb-4">{error}</p>
      <button onClick={() => getdata(currentPage)} className="px-4 py-2 rounded-lg bg-primary text-white font-semibold">Retry</button>
    </div>
  )

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 flex-1 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{content.mock_heading || MOCK.heading}</h1>
          <p className="text-text-secondary max-w-xl mx-auto">{content.mock_subtitle || MOCK.subtitle}</p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-border">
                <div className="h-40 skeleton" />
                <div className="p-5 space-y-2">
                  <div className="h-4 skeleton rounded w-1/3" />
                  <div className="h-5 skeleton rounded w-2/3" />
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
                  <div className="h-40 overflow-hidden">
                    <img src={MOCK.placeholderImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-text-muted font-medium mb-1">Week {result.Week}</div>
                    <h3 className="font-semibold mb-3 line-clamp-1">{result.Title}</h3>
                    <NavLink to={`/mock/${result.id}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-white text-sm font-semibold hover:bg-secondary-dark transition-colors">
                      {content.mock_viewButton || MOCK.viewButton}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
