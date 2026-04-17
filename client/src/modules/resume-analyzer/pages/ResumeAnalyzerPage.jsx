import React, { useState } from "react";
import DragDropUpload from "../components/DragDropUpload";
import AnalysisResult from "../components/AnalysisResult";
import { analyzeResume } from "../services/resumeService";
import { Loader2 } from "lucide-react";
import Navbar from "../../../shared/landing_components/Navbar";
import Button from "../../../shared/landing_components/Button";

const ResumeAnalyzerPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setSelectedFile(file);
    setError(null);
    try {
      const data = await analyzeResume(file);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalyzer = () => {
    setResult(null);
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-main font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 pb-12 px-4 sm:px-6 lg:px-8 space-y-8 animate-slide-up">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
            <span className="text-gradient">Resume</span> Analyzer
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered insights to optimize your professional profile for top recruiters.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="mt-12 bg-surface border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                <p className="text-2xl font-heading font-medium text-text-main">Analyzing your resume...</p>
                <p className="text-text-muted mt-2 italic">Scanning for skills, impact, and ATS optimization</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl border border-red-500/20 mb-8 max-w-md mx-auto">
                  {error}
                </div>
                <Button variant="primary" size="lg" onClick={resetAnalyzer}>
                  Try Again
                </Button>
              </div>
            ) : result ? (
              <AnalysisResult 
                result={result} 
                file={selectedFile} 
                onReset={resetAnalyzer} 
              />
            ) : (
              <DragDropUpload onFileUpload={handleFileUpload} />
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {[
            { title: "ATS Check", desc: "See how well you bypass Applicant Tracking Systems." },
            { title: "Smart Suggestions", desc: "Actionable tips to improve your resume impact." },
            { title: "Keyword Gap", desc: "Identify missing industry-standard technology tags." }
          ].map((item, id) => (
            <div key={id} className="p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 transition-all group">
              <h4 className="font-heading font-bold text-text-main mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
