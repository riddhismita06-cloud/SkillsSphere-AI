import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";

const LEVEL_OPTIONS = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior Level", label: "Senior Level" },
  { value: "Lead/Manager", label: "Lead/Manager" },
  { value: "Executive", label: "Executive" },
];

const JobPostingForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    location: initialData.location || "",
    level: initialData.level || "",
    description: initialData.description || "",
    skills: initialData.skills || "",
    experience: initialData.experience || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.skills) newErrors.skills = "Required skills are required";
    if (!formData.experience) newErrors.experience = "Experience details are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="title"
          label="Job Title"
          placeholder="e.g. Senior Software Engineer"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        <Input
          id="location"
          label="Location"
          placeholder="e.g. New York, NY (Remote)"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          id="level"
          label="Job Level"
          options={LEVEL_OPTIONS}
          value={formData.level}
          onChange={handleChange}
          error={errors.level}
          required
        />
        <Input
          id="experience"
          label="Experience Required"
          placeholder="e.g. 5+ years in React & Node.js"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-gray-300">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          className={`w-full rounded-lg border bg-slate-800 px-3.5 py-2.5 text-sm text-white caret-white placeholder:text-gray-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            errors.description 
              ? "border-red-400 focus:ring-red-400 focus:border-red-400" 
              : "border-slate-600 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-500"
          }`}
          placeholder="Describe the role, responsibilities, and team..."
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            {errors.description}
          </p>
        )}
      </div>

      <Input
        id="skills"
        label="Required Skills (Comma separated)"
        placeholder="e.g. React, TypeScript, Node.js, AWS"
        value={formData.skills}
        onChange={handleChange}
        error={errors.skills}
        helperText="These skills will be used to match candidates."
        required
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="px-8 bg-blue-600 hover:bg-blue-500"
        >
          {initialData.id ? "Update Job Posting" : "Create Job Posting"}
        </Button>
      </div>
    </form>
  );
};

JobPostingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default JobPostingForm;
