import api from "../config/api";
import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from "motion/react"
import CourseCard, { CourseCardSkeleton } from '../Components/CourseCard'
import ErrorState from '../Components/ErrorState'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

const Course = () => {
  useDocumentTitle('Courses')
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 6;

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('page', page)
    params.set('limit', LIMIT)
    if (search.trim()) params.set('search', search)
    api.get(`/api/course?${params}`)
      .then(res => {
        setCourses(res.data.courses)
        setTotalPages(res.data.totalPages)
      })
      .catch(() => setCourses(null))
      .finally(() => setLoading(false))
  }, [page, search]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!courses) return (
    <ErrorState
      title="Failed to Load Courses"
      message="We couldn't load the courses at the moment. Please check your connection and try again."
      onRetry={() => window.location.reload()}
      showHome={true}
      icon={BookOpen}
    />
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Explore Our Courses</h1>
          <p className="text-text-secondary max-w-xl mx-auto">Transform your future with our expert-led, comprehensive courses</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-md mx-auto mb-10">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <CourseCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(courses || []).map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <CourseCard course={c} index={i} />
                </motion.div>
              ))}
            </div>
            {courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted text-lg">No courses match your search.</p>
              </div>
            )}
            {totalPages > 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 mt-12">
                <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => goToPage(p)} className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${p === page ? 'bg-primary text-white shadow-md shadow-primary/20' : 'border border-border text-text-secondary hover:bg-surface'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Course
