import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, AlertCircle, Sparkles, FileText, Download, Eye } from "lucide-react";
import Button from "../../../shared/landing_components/Button";

const AnalysisResult = ({ result, file, onReset }) => {
  const { score, suggestions, missing_keywords } = result;
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf'))) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Determine score color/gradient class
  const getScoreStyles = (s) => {
    if (s >= 80) return "text-secondary"; // Emerald
    if (s >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const isPDF = file?.type === "application/pdf" || file?.name.toLowerCase().endsWith('.pdf');
  
  const getFileExtension = () => {
    if (file?.name.endsWith(".docx")) return "DOCX";
    if (file?.name.endsWith(".pdf")) return "PDF";
    return file?.type?.split("/")[1]?.toUpperCase() || "FILE";
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* File Status Pill */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-5 py-2 bg-secondary/10 border border-secondary/20 rounded-full shadow-lg backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <p className="text-xs font-bold text-secondary tracking-wide uppercase">
            {file?.name || "Resume"} Analyzed
          </p>
        </div>
      </div>

      {/* Header / Score Section */}
      <div className="bg-surface/80 border border-border rounded-[2rem] p-8 flex flex-col md:row items-center justify-between gap-8 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 shadow-inner">
            <Sparkles className="w-10 h-10 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-text-main">Global Insight Analysis</h2>
            <p className="text-text-muted text-sm mt-1">AI-driven evaluation across 50+ industry parameters.</p>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center bg-dark-bg/40 p-6 rounded-[1.5rem] border border-border/50 min-w-[140px] shadow-2xl">
          <span className={`text-6xl font-heading font-black tracking-tighter ${getScoreStyles(score)}`}>
            {score}%
          </span>
          <span className="text-[10px] font-black uppercase text-text-muted mt-2 tracking-[0.25em]">
            Trust Score
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Suggestions & Keywords */}
        <div className="lg:col-span-7 space-y-8 flex flex-col">
          {/* Suggestions Section */}
          <div className="bg-surface/50 border border-border rounded-[2rem] p-8 shadow-xl flex-1 hover:border-border/80 transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-main">Strategic Improvements</h3>
            </div>
            <ul className="space-y-5">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-1.5 bg-primary/10 border border-primary/20 rounded-md p-0.5 group-hover:bg-primary/20 transition-all">
                    <ChevronRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-text-main text-[15px] leading-relaxed group-hover:text-white transition-colors">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Keywords Section */}
          <div className="bg-surface/50 border border-border rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-main">Keyword Intelligence</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {missing_keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/5 border border-primary/20 hover:border-primary/50 text-primary-hover font-bold rounded-xl text-xs transition-all hover:bg-primary/10 cursor-default shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-6 italic opacity-80 leading-relaxed">
              * Integrating these keywords naturally into your experience can boost ATS rankings.
            </p>
          </div>
        </div>

        {/* Right Column: Document Preview */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="bg-surface/50 border border-border rounded-[2rem] p-6 flex flex-col h-full min-h-[550px] shadow-xl">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-heading font-bold text-text-main">Document Viewer</h3>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-black tracking-widest uppercase">
                {getFileExtension()}
              </span>
            </div>

            <div className="flex-1 bg-dark-bg/60 rounded-[1.25rem] border border-border/50 overflow-hidden relative group shadow-2xl min-h-[400px]">
              {isPDF && previewUrl ? (
                <iframe
                  src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Resume Preview"
                  className="w-full h-full border-none invert-[0.05]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                  <div className="p-8 bg-surface border border-border rounded-3xl mb-6 shadow-2xl relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
                    <FileText className="w-20 h-20 text-primary/40 relative z-10 transition-transform group-hover/icon:scale-110" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-base font-heading font-bold text-text-main truncate max-w-[240px] mx-auto">
                      {file?.name}
                    </p>
                    <p className="text-xs text-text-muted max-w-[260px] mx-auto leading-relaxed px-4">
                      Enhanced preview is dynamic for <span className="text-primary font-bold">PDF documents</span>. 
                      You can manage your file using the download options.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[4px]">
                 <a 
                   href={previewUrl || "#"} 
                   download={file?.name}
                   className="transform hover:scale-105 transition-transform"
                 >
                   <Button variant="primary" size="lg">
                     <Download className="w-5 h-5 mr-3" />
                     Download Portfolio
                   </Button>
                 </a>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <p className="text-[10px] text-text-muted font-black uppercase tracking-wider">
                  Verified Analysis
                </p>
              </div>
              <p className="text-[10px] text-text-muted font-bold px-2 py-1 bg-surface border border-border rounded-md">
                {(file?.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="group flex flex-col items-center gap-3 transition-all duration-300"
        >
          <div className="p-4 bg-surface border border-border rounded-2xl group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-xl group-hover:shadow-primary/10">
            <Eye className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-text-muted group-hover:text-primary transition-colors">
            New Scan
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
