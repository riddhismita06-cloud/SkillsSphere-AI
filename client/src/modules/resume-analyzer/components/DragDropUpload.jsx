import React, { useCallback, useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import Button from "../../../shared/components/Button";

const DragDropUpload = ({ onFileUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handlePaste = useCallback(
    (e) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const file = items[i].getAsFile();
          setSelectedFile(file);
          onFileUpload(file);
          break;
        }
      }
    },
    [onFileUpload]
  );

  return (
    <div
      tabIndex="0"
      className={`relative w-full p-10 border-2 border-dashed rounded-2xl transition-all duration-500 ease-out flex flex-col items-center justify-center space-y-4 focus:outline-none focus:ring-2 focus:ring-primary/40 outline-none ${
        isDragActive
          ? "border-primary bg-primary/10 scale-[1.03] shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          : "border-gray-700 bg-dark-bg/60 hover:bg-dark-bg/80 hover:border-gray-500"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? "bg-primary/20" : "bg-primary/10"}`}>
        <UploadCloud className={`w-12 h-12 transition-transform duration-300 ${isDragActive ? "scale-110 text-primary" : "text-primary/80"}`} />
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-xl font-semibold text-gray-100 italic">
          Drag & Drop your resume here
        </p>
        <p className="text-sm text-gray-400">
          Supported formats: <span className="text-gray-300 font-medium">PDF, DOCX</span>
        </p>
        <p className="text-xs text-primary/60 pt-1 font-medium animate-pulse">
          Or press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300 mx-0.5">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300 mx-0.5">V</kbd> to paste
        </p>
      </div>

      <div className="my-2 flex items-center justify-center space-x-4 w-full px-16">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em]">
          OR
        </span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <div className="relative group">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInput}
          title="Browse file"
        />
        <Button 
          variant="primary" 
          className="shadow-lg shadow-primary/10 group-hover:shadow-primary/30 group-hover:-translate-y-0.5 transition-all duration-300"
        >
          Browse Files
        </Button>
      </div>

      {selectedFile && (
        <div className="mt-6 flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <p className="text-xs font-semibold text-green-400 truncate max-w-[200px]">
            {selectedFile.name} uploaded
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
