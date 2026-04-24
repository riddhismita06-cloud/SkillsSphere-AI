import React from "react";
import PropTypes from "prop-types";
import Button from "../../../shared/components/Button";

const JobPostingCard = ({ job, onViewStats, onEdit }) => {
  const { title, location, level, createdAt, status } = job;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur hover:border-blue-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
            <span>{location}</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>{level}</span>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === "active" 
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
            : "bg-slate-800 text-slate-400 border border-slate-700"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <span className="text-xs text-slate-500">
          Posted on {formatDate(createdAt)}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(job)} className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Edit
          </Button>
          <Button variant="primary" size="sm" onClick={() => onViewStats(job)} className="bg-blue-600 hover:bg-blue-500">
            View Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

JobPostingCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onViewStats: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default JobPostingCard;
