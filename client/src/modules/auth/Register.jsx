import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import Button from "../../shared/components/Button";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // Clear error for this field when user types
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Registration data ready (no backend call as per requirements)
      console.log("Register payload:", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
    }
  };

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "tutor", label: "Tutor" },
    { value: "recruiter", label: "Recruiter" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] overflow-hidden relative p-5 box-border">
      <div className="relative z-10 w-full max-w-[380px]">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[120px] -top-[150px] -left-[150px] -z-10 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-[120px] -bottom-[120px] -right-[120px] -z-10 animate-pulse"></div>

        <form
          className="p-6 sm:p-[30px] rounded-[20px] backdrop-blur-[20px] bg-slate-900/70 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-[fadeIn_0.8s_ease]"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="text-center text-white mb-[24px] text-2xl font-semibold">
            Create Account
          </h2>

          <div className="flex flex-col gap-4 mb-5">
            <Input
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Select
              id="role"
              label="I am a"
              value={form.role}
              onChange={handleRoleChange}
              options={roleOptions}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 border-none font-bold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
          >
            Sign Up
          </Button>

          {/* Footer */}
          <p className="text-center mt-5 text-slate-400 text-[14px]">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
