import api from "../config/api";
import { useEffect, useState, useMemo } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from "motion/react"
import CourseCard, { CourseCardSkeleton } from '../Components/CourseCard'
import ErrorState from '../Components/ErrorState'
import { BookOpen } from 'lucide-react'

const Course = () => {
  useDocumentTitle('Courses')
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/api/course')
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, []);

  const filtered = useMemo(() => {
    if (!course || !search) return course;
    return course.filter(c =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [course, search]);

  if (!course) return (
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

        {course.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-md mx-auto mb-10">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <CourseCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filtered || []).map((c, i) => (
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
            {filtered && filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted text-lg">No courses match your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Course
