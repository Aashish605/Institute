import api from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from "motion/react";
import ErrorState from '../Components/ErrorState';
import { Clipboard, ArrowLeft, Calendar, FileText, Table, Download, Loader, ExternalLink, Sparkles, Award } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Badge } from '../Components/ui/badge';

const MockModel = () => {
  const { model } = useParams();
  const [mock, setMock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excelRows, setExcelRows] = useState([]);
  const [excelCols, setExcelCols] = useState([]);
  const [parsing, setParsing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.get(`/api/mock/get/${model}`)
      .then(res => setMock(res.data))
      .catch(() => setMock(null))
      .finally(() => setLoading(false))
  }, [model]);

  useEffect(() => {
    if (!mock || mock.FileType !== 'xlsx' || !mock.FileUrl) return;
    setParsing(true);
    fetch(mock.FileUrl)
      .then(res => res.arrayBuffer())
      .then(buf => {
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (data.length > 0) {
          setExcelCols(data[0]);
          setExcelRows(data.slice(1));
        }
      })
      .catch(() => {})
      .finally(() => setParsing(false));
  }, [mock?.FileUrl, mock?.FileType]);

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

  const isImage = mock.FileType === 'image';
  const isPdf = mock.FileType === 'pdf';
  const isXlsx = mock.FileType === 'xlsx';

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 900;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#004e8f';
    ctx.fillRect(0, 0, canvas.width, 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(mock.Title, canvas.width / 2, 70);
    ctx.fillStyle = '#f7921d';
    ctx.font = '16px Arial';
    ctx.fillText(formattedDate + '  |  Week ' + mock.Week, canvas.width / 2, 100);
    ctx.fillStyle = '#333333';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    const wrapText = (text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      for (const word of words) {
        const testLine = line + word + ' ';
        if (ctx.measureText(testLine).width > maxWidth && line) {
          ctx.fillText(line.trim(), x, y);
          line = word + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, y);
    };
    if (mock.Description) wrapText(mock.Description, 60, 180, canvas.width - 120, 30);
    const link = document.createElement('a');
    link.download = `${mock.Title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleDownloadFile = () => {
    const link = document.createElement('a');
    link.href = mock.FileUrl;
    link.download = `${mock.Title.replace(/[^a-zA-Z0-9]/g, '_')}.${isPdf ? 'pdf' : isXlsx ? 'xlsx' : 'jpg'}`;
    link.click();
  };

  const filteredRows = excelRows.filter(row => 
    row.some(cell => String(cell).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.04),_transparent_55%)] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <NavLink
            to="/mock"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Mock Results
          </NavLink>
        </motion.div>

        {/* Main Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Document View */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="overflow-hidden border-slate-100 shadow-2xl shadow-slate-100/70 bg-white/90 backdrop-blur-sm rounded-3xl">
              
              {/* Premium Header/Cover */}
              <div className="relative p-6 sm:p-10 bg-slate-950 text-white overflow-hidden">
                {/* Decorative gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(247,146,29,0.15),_transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,78,143,0.25),_transparent_50%)]" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-white/10 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      Week {mock.Week}
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/25 backdrop-blur-sm px-3 py-1 text-xs">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-secondary inline" />
                      {formattedDate}
                    </Badge>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                    {mock.Title}
                  </h1>

                  {mock.Description && (
                    <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
                      {mock.Description}
                    </p>
                  )}
                </div>
              </div>

              <CardContent className="p-6 sm:p-10 space-y-8">
                
                {/* Preview Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Result Sheet Preview
                  </h3>
                  
                  {/* File preview states */}
                  {isImage && (
                    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 group shadow-inner">
                      <img
                        src={mock.FileUrl}
                        alt={mock.Title}
                        className="w-full h-auto object-cover max-h-[500px] rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a 
                          href={mock.FileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-slate-100 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" /> View Full Image
                        </a>
                      </div>
                    </div>
                  )}

                  {isPdf && (
                    <div className="rounded-2xl border border-rose-100 bg-rose-50/30 p-8 text-center flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 mb-2">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-800">PDF Report Document</h4>
                        <p className="text-xs text-slate-500 mt-1">Ready to view or print offline</p>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl">
                          <a href={mock.FileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" /> Open PDF
                          </a>
                        </Button>
                        <Button variant="outline" onClick={handleDownloadFile} className="border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl">
                          <Download className="w-4 h-4 mr-2" /> Download File
                        </Button>
                      </div>
                    </div>
                  )}

                  {isXlsx && (
                    <div className="space-y-4">
                      {parsing ? (
                        <div className="flex flex-col items-center justify-center py-16 space-y-3">
                          <Loader className="animate-spin h-8 w-8 text-primary" />
                          <span className="text-sm font-medium text-slate-500">Loading parsed table...</span>
                        </div>
                      ) : excelCols.length > 0 ? (
                        <div className="space-y-4">
                          {/* Search & Filter within Excel */}
                          <div className="flex items-center justify-between gap-4">
                            <input
                              type="text"
                              placeholder="Search results (e.g. Rank, Name, Score)..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full max-w-sm rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:bg-white"
                            />
                            <Button variant="outline" size="sm" onClick={handleDownloadFile} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl whitespace-nowrap flex">
                              <Download className="w-4 h-4 mr-2" /> Download (.xlsx)
                            </Button>
                          </div>

                          {/* Render Excel Rows */}
                          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-inner">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead>
                                <tr className="bg-slate-900 text-white">
                                  {excelCols.map((col, i) => (
                                    <th key={i} className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {filteredRows.length > 0 ? (
                                  filteredRows.map((row, ri) => (
                                    <tr key={ri} className="hover:bg-slate-50/80 transition-colors">
                                      {excelCols.map((_, ci) => (
                                        <td key={ci} className="px-5 py-3 text-slate-600 font-medium whitespace-nowrap">{row[ci] ?? ''}</td>
                                      ))}
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={excelCols.length} className="px-5 py-8 text-center text-slate-400">
                                      No matches found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-8 text-center flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                            <Table className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-800">Excel Spreadsheet</h4>
                            <p className="text-xs text-slate-500 mt-1">Download to view ranks & full scoresheet</p>
                          </div>
                          <Button onClick={handleDownloadFile} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                            <Download className="w-4 h-4 mr-2" /> Download Excel Sheet
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Column: Quick Stats & Side Options */}
          <div className="lg:col-span-4 space-y-6">
            
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl">
              <CardHeader className="border-b border-slate-50 pb-5">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" /> Mock Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Published Date</span>
                    <span className="font-semibold text-slate-700">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">Test Period</span>
                    <span className="font-semibold text-slate-700">Week {mock.Week}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-400">File Format</span>
                    <span className="font-semibold uppercase text-slate-700">{mock.FileType}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/20 text-white rounded-xl py-5" asChild>
                    <NavLink to="/mock">
                      Browse All Results
                    </NavLink>
                  </Button>
                  
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl py-5" onClick={handleDownload}>
                    Shareable Card (PNG)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                <Award size={180} />
              </div>
              <div className="relative z-10 space-y-4">
                <h4 className="text-base font-bold tracking-tight">Need additional guidance?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join our online counseling session or contact the administration to review your answer sheets in detail.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white border-none rounded-xl text-xs py-4 px-4 w-full sm:w-auto" asChild>
                  <NavLink to="/contact">Get in Touch</NavLink>
                </Button>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MockModel;
