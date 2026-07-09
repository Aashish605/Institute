import api from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react";
import ErrorState from '../Components/ErrorState';
import { FileText, ArrowLeft, Calendar, Sparkles, Megaphone, BellRing, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Badge } from '../Components/ui/badge';

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
    <div className="pt-28 pb-16 min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.04),_transparent_50%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-6 skeleton rounded w-32 mb-8 animate-pulse bg-slate-200" />
        <div className="h-96 skeleton rounded-3xl mb-8 animate-pulse bg-slate-200" />
        <div className="space-y-4">
          <div className="h-8 skeleton rounded w-3/4 animate-pulse bg-slate-200" />
          <div className="h-4 skeleton rounded w-full animate-pulse bg-slate-200" />
          <div className="h-4 skeleton rounded w-2/3 animate-pulse bg-slate-200" />
        </div>
      </div>
    </div>
  );

  if (!notice) return (
    <ErrorState
      title="Notice Not Found"
      message="The notice you're looking for doesn't exist. Check out other notices instead."
      showHome={true}
      icon={FileText}
    />
  );

  const formattedDate = new Date(notice.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notice.Title,
        text: notice.Description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
            to="/notice" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Notices
          </NavLink>
        </motion.div>

        {/* Notice Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Notice Details */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="overflow-hidden border-slate-100 shadow-2xl shadow-slate-100/70 bg-white/90 backdrop-blur-sm rounded-3xl">
              
              {/* Cover Banner */}
              <div className="relative h-64 sm:h-[400px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <motion.img 
                  src={notice.Img} 
                  alt={notice.Title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Badge/Date overlay on cover */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/95 text-primary hover:bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow">
                    Announcement
                  </Badge>
                </div>
              </div>

              {/* Notice Body */}
              <CardContent className="p-6 sm:p-10 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>Published on {formattedDate}</span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    {notice.Title}
                  </h1>
                </div>

                <hr className="border-slate-100" />

                {notice.Description && (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {notice.Description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Card */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl">
              <div className="p-6 space-y-5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
                  <BellRing className="w-5 h-5 text-secondary" /> Actions
                </h3>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Date</span>
                    <span className="font-semibold text-slate-700">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Category</span>
                    <span className="font-semibold text-slate-700">General</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/20 text-white rounded-xl py-5" asChild>
                    <NavLink to="/notice">
                      View All Notices
                    </NavLink>
                  </Button>
                  
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl py-5 gap-2" onClick={handleShare}>
                    <Share2 className="w-4 h-4" /> Share Announcement
                  </Button>
                </div>
              </div>
            </Card>

            {/* Newsletter/Alert Box */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                <Megaphone size={160} />
              </div>
              <div className="relative z-10 space-y-4">
                <h4 className="text-base font-bold tracking-tight">Stay Updated</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Important academic schedules, term dates, and exam announcements are updated weekly. Keep checking back so you don't miss anything.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white border-none rounded-xl text-xs py-4 px-4 w-full sm:w-auto animate-pulse" asChild>
                  <NavLink to="/contact">Contact Info</NavLink>
                </Button>
              </div>
            </Card>

          </div>

        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary text-sm mb-4 font-medium">Looking for something else?</p>
          <NavLink 
            to="/notice"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface hover:bg-surface-alt border border-border text-text-secondary hover:text-text font-medium transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            Browse Academic Announcements
          </NavLink>
        </motion.div>

      </div>
    </div>
  );
};

export default NoticeModel;
