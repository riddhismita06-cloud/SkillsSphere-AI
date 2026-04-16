import React, { useState } from "react";
import DragDropUpload from "../components/DragDropUpload";
import AnalysisResult from "../components/AnalysisResult";
import { analyzeResume } from "../services/resumeService";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-[#0d1117] text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Resume Analyzer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload your resume and get instant insights to improve your chances of landing your dream job.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="mt-12 bg-dark-bg/30 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-xl font-medium text-gray-300">Analyzing your resume...</p>
                <p className="text-sm text-gray-500 mt-2 italic">Scanning for keywords and improvements</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20 mb-6">
                  {error}
                </div>
                <button
                  onClick={resetAnalyzer}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
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
            <div key={id} className="p-5 bg-dark-bg/20 border border-gray-800/80 rounded-2xl hover:border-gray-700 transition-all">
              <h4 className="font-bold text-gray-200 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
