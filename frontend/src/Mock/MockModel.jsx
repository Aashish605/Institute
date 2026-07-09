import api from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react"
import ErrorState from '../Components/ErrorState';
import { Clipboard, ArrowLeft, Calendar } from 'lucide-react';

const MockModel = () => {
  const { model } = useParams();
  const [mock, setMock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/mock/get/${model}`)
      .then(res => setMock(res.data))
      .catch(() => setMock(null))
      .finally(() => setLoading(false))
  }, [model]);

  if (loading) return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-12 skeleton rounded-lg w-32 mb-8" />
        <div className="h-96 skeleton rounded-2xl mb-8" />
        <div className="space-y-4">
          <div className="h-8 skeleton rounded-lg w-3/4" />
          <div className="h-4 skeleton rounded-lg w-full" />
          <div className="h-4 skeleton rounded-lg w-full" />
          <div className="h-4 skeleton rounded-lg w-2/3" />
        </div>
      </div>
    </div>
  );

  if (!mock) return (
    <ErrorState
      title="Mock Result Not Found"
      message="The mock result you're looking for doesn't exist. Try browsing all mock results instead."
      showHome={true}
      icon={Clipboard}
    />
  );

  const formattedDate = new Date(mock.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Back Button */}
          <NavLink 
            to="/mock" 
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors mb-8 hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mock Results
          </NavLink>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
        >
          {/* Hero Image Section */}
          <div className="relative h-96 sm:h-[480px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
            <motion.img 
              src={mock.Img} 
              alt={mock.Title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Title & Metadata Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">{formattedDate}</span>
                  </motion.div>
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-medium text-white">Week {mock.Week}</span>
                  </motion.div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  {mock.Title}
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Description */}
              {mock.Description && (
                <div>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {mock.Description}
                  </p>
                </div>
              )}

              {/* Meta Information */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Published</p>
                  <p className="text-sm font-medium text-text">{formattedDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Week</p>
                  <p className="text-sm font-medium text-text">Week {mock.Week}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">ID</p>
                  <p className="text-sm font-medium text-text font-mono">{mock.id}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <NavLink 
                    to="/mock"
                    className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-center hover:shadow-lg transition-all duration-300"
                  >
                    View All Mock Results
                  </NavLink>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-primary/30 hover:border-primary/60 text-text font-semibold hover:bg-primary/5 transition-all duration-300"
                  >
                    Print Results
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Mock Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">Want to practice more mock tests?</p>
          <NavLink 
            to="/mock"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface hover:bg-surface-alt border border-border text-text-secondary hover:text-text font-medium transition-all duration-300"
          >
            <Clipboard className="w-4 h-4" />
            Browse All Mock Results
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default MockModel;
