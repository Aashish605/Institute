import { useEffect, useState } from 'react';
import api from "../config/api";
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react"
import ErrorState from '../Components/ErrorState';
import { BookMarked, ArrowLeft, Star, Zap, Check } from 'lucide-react';

const CourseModel = () => {
  const { model } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/course/${encodeURIComponent(model)}`)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, [model]);

  if (loading) return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-12 skeleton rounded-lg w-32 mb-8" />
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="h-96 skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 skeleton rounded-lg w-3/4" />
            <div className="h-4 skeleton rounded-lg w-full" />
            <div className="h-4 skeleton rounded-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!course) return (
    <ErrorState
      title="Course Not Found"
      message="The course you're looking for doesn't exist or has been removed. Browse our other courses instead."
      showHome={true}
      icon={BookMarked}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <NavLink 
            to="/course" 
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </NavLink>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-10 items-center mb-16"
        >
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <motion.img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-lg text-text-secondary leading-relaxed">{course.description}</p>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-4 py-6 border-y border-border/50">
              <div>
                {course.oldPrice && (
                  <span className="text-sm text-text-muted line-through block mb-1">NPR {course.oldPrice}</span>
                )}
                <span className="text-4xl font-bold text-primary">NPR {course.newPrice}</span>
              </div>
              {course.discount && (
                <motion.div
                  className="ml-auto px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-secondary font-bold">{course.discount} OFF</span>
                </motion.div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <NavLink 
                  to={`/course/${course.title}/enroll`}
                  className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-secondary to-secondary-light text-white font-bold text-center hover:shadow-lg transition-all duration-300"
                >
                  Enroll Now
                </NavLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={course.materialsLink || undefined}
                  target={course.materialsLink ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={!course.materialsLink}
                  className={`block px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 ${
                    course.materialsLink 
                      ? 'border-2 border-primary hover:border-primary/60 text-text hover:bg-primary/5'
                      : 'border-2 border-border text-text-muted cursor-not-allowed bg-surface'
                  }`}
                >
                  Materials
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        {course.features?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Zap className="w-8 h-8 text-secondary" />
              Why Choose This Course?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">{f.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Subjects Section */}
        {course.subjects?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Star className="w-8 h-8 text-primary" />
              Subjects Covered
            </h2>
            <div className="flex flex-wrap gap-3">
              {course.subjects.map((s, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 text-primary font-medium hover:border-primary/60 transition-colors cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-text-secondary text-sm mb-6">Ready to practice?</p>
          <NavLink 
            to="/mock"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Zap className="w-4 h-4" />
            Access Mock Tests
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseModel;
