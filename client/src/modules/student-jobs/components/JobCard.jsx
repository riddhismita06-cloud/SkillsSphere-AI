import React, { useState } from "react";
import PropTypes from "prop-types";
import { 
  MapPin, 
  IndianRupee, 
  Clock, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import Button from "../../../shared/components/Button";

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatLocation = (loc) => {
    if (!loc) return "Remote";
    return `${loc.city}, ${loc.state}`;
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Not disclosed";
    return `₹${min?.toLocaleString()} - ₹${max?.toLocaleString()}`;
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
  };

  return (
    <div 
      className={`group transition-all duration-300 border backdrop-blur-md rounded-2xl overflow-hidden ${
        isExpanded 
          ? "bg-slate-900/80 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]" 
          : "bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60"
      }`}
    >
      <div 
        className="p-6 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Company Logo Placeholder */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Briefcase size={28} className="text-blue-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {job.title || job.designation}
                </h3>
                <p className="text-slate-400 font-medium mt-0.5">
                  {job.company || "SkillSphere Partner"}
                </p>
              </div>
              <div className="text-slate-500 group-hover:text-blue-400 transition-colors">
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-slate-500" />
                {formatLocation(job.location)}
              </div>
              <div className="flex items-center gap-1.5">
                <IndianRupee size={16} className="text-slate-500" />
                {formatSalary(job.minSalary, job.maxSalary)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-slate-500" />
                {getTimeAgo(job.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] border-t border-white/5" : "max-h-0"
        }`}
      >
        <div className="p-8 bg-slate-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                  Job Description
                </h4>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {job.description || "No detailed description provided for this position."}
                </p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 size={16} className="text-green-400 mt-1 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-slate-200 mb-4">
                  Quick Details
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Job Type</span>
                    <span className="text-slate-200 font-medium">{job.type || "Full-time"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Level</span>
                    <span className="text-slate-200 font-medium">{job.experienceLevel || "Mid-Level"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Openings</span>
                    <span className="text-slate-200 font-medium">{job.openings || 1} Positions</span>
                  </div>
                </div>
                
                <Button 
                  fullWidth 
                  className="mt-6 bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-2"
                >
                  Apply for this position
                  <ExternalLink size={16} />
                </Button>
              </div>

              <p className="text-[11px] text-slate-500 text-center px-4">
                By clicking apply, you agree to share your SkillSphere profile with the recruiter for this position.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    designation: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    minSalary: PropTypes.number,
    maxSalary: PropTypes.number,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    experienceLevel: PropTypes.string,
    openings: PropTypes.number,
  }).isRequired,
};

export default JobCard;
