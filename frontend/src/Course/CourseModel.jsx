import { useEffect, useState } from 'react';
import api from "../config/api";
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react"

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
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-64 skeleton rounded-xl mb-6" />
        <div className="space-y-3">
          <div className="h-8 skeleton rounded w-1/2" />
          <div className="h-4 skeleton rounded w-full" />
          <div className="h-4 skeleton rounded w-3/4" />
        </div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="pt-24 pb-12 text-center">
      <p className="text-error text-lg">Course not found.</p>
      <NavLink to="/course" className="mt-4 inline-block px-4 py-2 rounded-lg bg-primary text-white font-semibold">Back to Courses</NavLink>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-10 mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={course.image} alt={course.title} className="w-full h-[350px] sm:h-[450px] object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-text-secondary leading-relaxed mb-6">{course.description}</p>
            <div className="flex items-center gap-4 mb-6">
              {course.oldPrice && <span className="text-text-muted line-through">NPR {course.oldPrice}</span>}
              <span className="text-3xl font-bold text-primary">NPR {course.newPrice}</span>
              {course.discount && <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">{course.discount} OFF</span>}
            </div>
            <NavLink to={`/course/${course.title}/enroll`} className="self-start px-6 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/20">
              Enroll Now
            </NavLink>
          </div>
        </motion.div>

        {course.features?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 p-6 rounded-xl bg-white border border-border">
            <h2 className="text-xl font-bold mb-4">Why Choose This Course?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    {f.icon && <img src={f.icon} alt="" className="w-4 h-4" />}
                  </div>
                  <span className="text-sm text-text-secondary">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {course.subjects?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 p-6 rounded-xl bg-white border border-border">
            <h2 className="text-xl font-bold mb-4">Subjects Covered</h2>
            <div className="flex flex-wrap gap-2">
              {course.subjects.map((s, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium">{s}</span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <NavLink to={course.materialsLink || '#'} className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors">Access Course Materials</NavLink>
          <NavLink to="/mock" className="px-6 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary-light transition-colors">Access Mock Tests</NavLink>
        </div>
      </div>
    </div>
  );
};

export default CourseModel;
