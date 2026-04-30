import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";
import Navbar from "../../../shared/landing/Navbar";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import { createJobPosting } from "../services/jobPostingService";

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

const CreateJobPostingPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // Form state - flat structure for UI simplicity
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    status: "draft",
    city: "",
    state: "",
    country: "India",
    remote: false,
    salaryMin: "",
    salaryMax: "",
    currency: "INR",
    isNegotiable: false,
  });

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  /**
   * Map backend validation errors to flat field names for display
   */
  const mapBackendErrors = (errors = {}) => {
    return {
      title: errors.title,
      description: errors.description,
      skills: errors.skills,
      status: errors.status,
      city: errors["location.city"] || errors.city,
      state: errors["location.state"] || errors.state,
      country: errors["location.country"] || errors.country,
      remote: errors["location.remote"] || errors.remote,
      salaryMin: errors["salary.min"] || errors.salaryMin,
      salaryMax: errors["salary.max"] || errors.salaryMax,
      currency: errors["salary.currency"] || errors.currency,
      isNegotiable: errors["salary.isNegotiable"] || errors.isNegotiable,
    };
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user edits
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Job title is required";
    if (!formData.description.trim()) errors.description = "Job description is required";
    if (!formData.skills.trim()) errors.skills = "At least one skill is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.salaryMin) errors.salaryMin = "Minimum salary is required";
    if (!formData.salaryMax) errors.salaryMax = "Maximum salary is required";
    if (formData.salaryMin && formData.salaryMax && Number(formData.salaryMin) > Number(formData.salaryMax)) {
      errors.salaryMax = "Maximum salary must be greater than minimum";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Clear previous errors
    setSubmitError("");
    setFormErrors({});
    setIsSubmitting(true);

    // Build nested payload matching backend schema
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean),
      status: formData.status,
      location: {
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim() || "India",
        remote: formData.remote,
      },
      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        currency: formData.currency.trim().toUpperCase() || "INR",
        isNegotiable: formData.isNegotiable,
      },
    };

    try {
      await createJobPosting(payload, token);
      navigate("/recruiter/jobs");
    } catch (error) {
      setSubmitError(error.message || "Failed to create job posting. Please try again.");
      // Handle field-level validation errors from backend
      if (error.errors && Object.keys(error.errors).length > 0) {
        setFormErrors(mapBackendErrors(error.errors));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] p-3 sm:p-5 pt-20 sm:pt-28 text-slate-100">
      <Navbar />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-8">
        <Link 
          to="/recruiter/jobs" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors w-fit group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Jobs</span>
        </Link>

        <div className="flex flex-col gap-1 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Briefcase size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Create Job Posting</h1>
          </div>
          <p className="text-slate-400 mt-2">
            Fill in the details below to post a new job. We'll use this information to recommend the best candidates.
          </p>
        </div>

        {submitError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            <p>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur space-y-6">
          {/* Title and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="title"
              label="Job Title"
              placeholder="e.g. Senior Software Engineer"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={formErrors.title}
              required
            />
            <Select
              id="status"
              label="Status"
              options={STATUS_OPTIONS}
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              error={formErrors.status}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-gray-300">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              className={`w-full rounded-lg border bg-slate-800 px-3.5 py-2.5 text-sm text-white caret-white placeholder:text-gray-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                formErrors.description
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-slate-600 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-500"
              }`}
              placeholder="Describe the role, responsibilities, and team..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {formErrors.description && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                {formErrors.description}
              </p>
            )}
          </div>

          {/* Skills */}
          <Input
            id="skills"
            label="Required Skills (Comma separated)"
            placeholder="e.g. React, TypeScript, Node.js, AWS"
            value={formData.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            error={formErrors.skills}
            helperText="These skills will be used to match candidates."
            required
          />

          {/* Location */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="city"
                label="City"
                placeholder="e.g. Mumbai"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={formErrors.city}
                required
              />
              <Input
                id="state"
                label="State"
                placeholder="e.g. Maharashtra"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                error={formErrors.state}
                required
              />
              <Input
                id="country"
                label="Country"
                placeholder="e.g. India"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                error={formErrors.country}
                required
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="remote"
                checked={formData.remote}
                onChange={(e) => handleChange("remote", e.target.checked)}
                className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remote" className="text-sm text-gray-300">
                Remote position
              </label>
            </div>
          </div>

          {/* Salary */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Salary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="salaryMin"
                label="Minimum"
                type="number"
                placeholder="e.g. 500000"
                value={formData.salaryMin}
                onChange={(e) => handleChange("salaryMin", e.target.value)}
                error={formErrors.salaryMin}
                required
              />
              <Input
                id="salaryMax"
                label="Maximum"
                type="number"
                placeholder="e.g. 1000000"
                value={formData.salaryMax}
                onChange={(e) => handleChange("salaryMax", e.target.value)}
                error={formErrors.salaryMax}
                required
              />
              <Select
                id="currency"
                label="Currency"
                options={CURRENCY_OPTIONS}
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                error={formErrors.currency}
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="isNegotiable"
                checked={formData.isNegotiable}
                onChange={(e) => handleChange("isNegotiable", e.target.checked)}
                className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isNegotiable" className="text-sm text-gray-300">
                Salary is negotiable
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="px-8 bg-blue-600 hover:bg-blue-500"
            >
              Create Job Posting
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateJobPostingPage;
