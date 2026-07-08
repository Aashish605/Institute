import api from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react"

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
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-8 skeleton rounded w-1/2 mb-4" />
        <div className="h-80 skeleton rounded-xl mb-4" />
      </div>
    </div>
  );

  if (!mock) return (
    <div className="pt-24 pb-12 text-center">
      <p className="text-error text-lg">Result not found.</p>
      <NavLink to="/mock" className="mt-4 inline-block px-4 py-2 rounded-lg bg-primary text-white font-semibold">Back to Results</NavLink>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <NavLink to="/mock" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Results
          </NavLink>
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{mock.Title}</h1>
              <div className="text-text-muted text-sm">Week {mock.Week} | {new Date(mock.createdAt).toLocaleDateString()}</div>
            </div>
            {mock.Description && <p className="text-text-secondary text-center mb-6">{mock.Description}</p>}
            <img src={mock.Img} alt={mock.Title} className="w-full rounded-xl shadow-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MockModel;
