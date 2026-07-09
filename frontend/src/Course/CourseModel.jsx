import { useEffect, useState } from 'react';
import api from "../config/api";
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react";
import ErrorState from '../Components/ErrorState';
import { 
  BookMarked, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Zap, 
  Check, 
  Lock, 
  Unlock, 
  BookOpen, 
  GraduationCap, 
  FileDown, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Badge } from '../Components/ui/badge';

const CourseModel = () => {
  const { model } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/course/${encodeURIComponent(model)}`)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, [model]);

  if (loading) return (
    <div className="pt-28 pb-16 min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.04),_transparent_50%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-6 skeleton rounded w-32 mb-8 animate-pulse bg-slate-200" />
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 h-96 skeleton rounded-3xl animate-pulse bg-slate-200" />
          <div className="lg:col-span-4 h-96 skeleton rounded-3xl animate-pulse bg-slate-200" />
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.04),_transparent_55%)] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <NavLink 
            to="/course" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Courses
          </NavLink>
        </motion.div>

        {/* Course Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="overflow-hidden border-slate-100 shadow-2xl shadow-slate-100/70 bg-white/90 backdrop-blur-sm rounded-3xl">
              
              {/* Cover Image */}
              <div className="relative h-64 sm:h-[380px] overflow-hidden bg-slate-100">
                <motion.img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <Badge className="bg-secondary text-white hover:bg-secondary border-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                    {course.discount ? `${course.discount} Off` : 'Entrance Prep'}
                  </Badge>
                </div>
              </div>

              {/* Main Info */}
              <CardContent className="p-6 sm:p-10 space-y-6">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    {course.title}
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Features list */}
                {course.features?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-secondary" /> What you will get
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {course.features.map((f, i) => (
                        <div key={i} className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                          {f.icon ? (
                            <img src={f.icon} alt="" className="w-5 h-5 shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-primary" />
                            </div>
                          )}
                          <span className="text-xs sm:text-sm font-semibold text-slate-600">{f.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subjects */}
                {course.subjects?.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" /> Subjects Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((s, i) => (
                        <Badge key={i} variant="outline" className="px-3.5 py-1 text-slate-600 border-slate-200 bg-white font-medium text-xs rounded-full">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Materials Security Section */}
            <Card className="border-slate-100 shadow-2xl shadow-slate-100/70 bg-white/95 rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  {course.isEnrolled ? (
                    <Unlock className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                  Course Learning Materials
                </CardTitle>
                <CardDescription>
                  {course.isEnrolled 
                    ? "Welcome back! You have active enrollment access to these files." 
                    : "Premium contents like entrance files and revision documents are locked."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                {course.isEnrolled ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Enrollment Active</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Below are your learning portals and study guides.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all space-y-2 bg-slate-50/40">
                        <h5 className="font-bold text-slate-800 text-sm">Official Study Portal</h5>
                        <p className="text-xs text-slate-400">Contains class PDFs, video lectures, and revision keys.</p>
                        <a 
                          href={course.materialsLink}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline pt-1"
                        >
                          Access Materials <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {course.mockTestLink && (
                        <div className="p-4 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all space-y-2 bg-slate-50/40">
                          <h5 className="font-bold text-slate-800 text-sm">Weekly Simulation Tests</h5>
                          <p className="text-xs text-slate-400">Complete weekly mock tests and view your scoring rank.</p>
                          <NavLink 
                            to={course.mockTestLink}
                            className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline pt-1"
                          >
                            Go to Mock Tests <ArrowRight className="w-3 h-3" />
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 px-4 space-y-4">
                    <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                      <h4 className="text-base font-bold text-slate-800">Materials Locked</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        To unlock the study syllabus, past questions sheets, and recorded class links, please complete your enrollment process.
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block relative group rounded-xl"
                    >
                      <div className="absolute inset-0 bg-secondary opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300 rounded-xl" />
                      <Button asChild className="relative bg-secondary hover:bg-secondary/90 text-white rounded-xl px-6 py-5 text-sm font-bold shadow-lg shadow-secondary/15 flex items-center justify-center gap-1.5 border-none">
                        <NavLink to={`/course/${course.title}/enroll`}>
                          Enroll Now to Unlock
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </NavLink>
                      </Button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Purchase Details */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl">
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
                  <Star className="w-5 h-5 text-secondary" /> Course Plan
                </h3>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Enrollment Fee</span>
                    <div className="text-right">
                      {course.oldPrice && (
                        <span className="text-xs text-slate-400 line-through block">NPR {course.oldPrice}</span>
                      )}
                      <span className="font-extrabold text-primary text-lg">NPR {course.newPrice}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Status</span>
                    {course.isEnrolled ? (
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 font-bold">Active Member</Badge>
                    ) : (
                      <Badge variant="outline" className="border-slate-200 text-slate-500 font-semibold">Not Enrolled</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {course.isEnrolled ? (
                    <Button className="w-full bg-slate-900 text-white rounded-xl py-5" disabled>
                      Enrolled
                    </Button>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group rounded-xl"
                    >
                      {/* Subtly glowing backglow matching theme primary */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300 rounded-xl" />
                      <Button className="relative w-full bg-gradient-to-r from-primary to-primary-light text-white rounded-xl py-5 font-bold shadow-lg shadow-primary/15 flex items-center justify-center gap-1.5 border-none" asChild>
                        <NavLink to={`/course/${course.title}/enroll`}>
                          Enroll in Course
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </NavLink>
                      </Button>
                    </motion.div>
                  )}
                  
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl py-5 font-semibold" asChild>
                    <NavLink to="/course">Browse Others</NavLink>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Assistance Alert */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                <BookOpen size={160} />
              </div>
              <div className="relative z-10 space-y-4">
                <h4 className="text-base font-bold tracking-tight">Accessing materials?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you have already paid but details are still locked, it may take up to 24 hours for manual verification. Feel free to contact administration for immediate support.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white border-none rounded-xl text-xs py-4 px-4 w-full sm:w-auto" asChild>
                  <NavLink to="/contact">Contact Support</NavLink>
                </Button>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseModel;
