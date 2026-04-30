import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

const CURRENCY_OPTIONS = [
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
];

const JobPostingForm = ({ onSubmit, initialData = {}, isLoading = false, fieldErrors = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    skills: initialData.skills || "",
    status: initialData.status || "draft",
    location: {
      city: initialData.location?.city || "",
      state: initialData.location?.state || "",
      country: initialData.location?.country || "India",
      remote: initialData.location?.remote || false,
    },
    salary: {
      min: initialData.salary?.min || "",
      max: initialData.salary?.max || "",
      currency: initialData.salary?.currency || "INR",
      isNegotiable: initialData.salary?.isNegotiable || false,
    },
  });

  const [errors, setErrors] = useState({});

  // Merge local validation errors with backend field errors
  const allErrors = { ...errors, ...fieldErrors };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
    if (errors[`location.${field}`]) {
      setErrors((prev) => ({ ...prev, [`location.${field}`]: null }));
    }
  };

  const handleSalaryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      salary: { ...prev.salary, [field]: value },
    }));
    if (errors[`salary.${field}`]) {
      setErrors((prev) => ({ ...prev, [`salary.${field}`]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.skills) newErrors.skills = "Required skills are required";

    // Location validation
    if (!formData.location.city) newErrors["location.city"] = "City is required";
    if (!formData.location.state) newErrors["location.state"] = "State is required";
    if (!formData.location.country) newErrors["location.country"] = "Country is required";

    // Salary validation
    if (!formData.salary.min) newErrors["salary.min"] = "Minimum salary is required";
    if (!formData.salary.max) newErrors["salary.max"] = "Maximum salary is required";
    if (formData.salary.min && formData.salary.max && Number(formData.salary.min) > Number(formData.salary.max)) {
      newErrors["salary.max"] = "Maximum salary must be greater than minimum";
    }

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
          error={allErrors.title}
          required
        />
        <Select
          id="status"
          label="Status"
          options={STATUS_OPTIONS}
          value={formData.status}
          onChange={handleChange}
          error={allErrors.status}
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
            allErrors.description
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-slate-600 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-500"
          }`}
          placeholder="Describe the role, responsibilities, and team..."
          value={formData.description}
          onChange={handleChange}
        />
        {allErrors.description && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            {allErrors.description}
          </p>
        )}
      </div>

      <Input
        id="skills"
        label="Required Skills (Comma separated)"
        placeholder="e.g. React, TypeScript, Node.js, AWS"
        value={formData.skills}
        onChange={handleChange}
        error={allErrors.skills}
        helperText="These skills will be used to match candidates."
        required
      />

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="location.city"
            label="City"
            placeholder="e.g. Mumbai"
            value={formData.location.city}
            onChange={(e) => handleLocationChange("city", e.target.value)}
            error={allErrors["location.city"]}
            required
          />
          <Input
            id="location.state"
            label="State"
            placeholder="e.g. Maharashtra"
            value={formData.location.state}
            onChange={(e) => handleLocationChange("state", e.target.value)}
            error={allErrors["location.state"]}
            required
          />
          <Input
            id="location.country"
            label="Country"
            placeholder="e.g. India"
            value={formData.location.country}
            onChange={(e) => handleLocationChange("country", e.target.value)}
            error={allErrors["location.country"]}
            required
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="location.remote"
            checked={formData.location.remote}
            onChange={(e) => handleLocationChange("remote", e.target.checked)}
            className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="location.remote" className="text-sm text-gray-300">
            Remote position
          </label>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Salary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="salary.min"
            label="Minimum"
            type="number"
            placeholder="e.g. 500000"
            value={formData.salary.min}
            onChange={(e) => handleSalaryChange("min", e.target.value)}
            error={allErrors["salary.min"]}
            required
          />
          <Input
            id="salary.max"
            label="Maximum"
            type="number"
            placeholder="e.g. 1000000"
            value={formData.salary.max}
            onChange={(e) => handleSalaryChange("max", e.target.value)}
            error={allErrors["salary.max"]}
            required
          />
          <Select
            id="salary.currency"
            label="Currency"
            options={CURRENCY_OPTIONS}
            value={formData.salary.currency}
            onChange={(e) => handleSalaryChange("currency", e.target.value)}
            error={allErrors["salary.currency"]}
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="salary.isNegotiable"
            checked={formData.salary.isNegotiable}
            onChange={(e) => handleSalaryChange("isNegotiable", e.target.checked)}
            className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="salary.isNegotiable" className="text-sm text-gray-300">
            Salary is negotiable
          </label>
        </div>
      </div>

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
  fieldErrors: PropTypes.object,
};

export default JobPostingForm;
