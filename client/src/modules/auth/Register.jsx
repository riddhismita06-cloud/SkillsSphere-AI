import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] overflow-hidden relative p-5 box-border">
      <div className="relative z-10 w-full max-w-[380px]">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[120px] -top-[150px] -left-[150px] -z-10 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-[120px] -bottom-[120px] -right-[120px] -z-10 animate-pulse"></div>

        <form
          className="p-6 sm:p-[30px] rounded-[20px] backdrop-blur-[20px] bg-slate-900/70 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-[fadeIn_0.8s_ease]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-white mb-[24px] text-2xl font-semibold">
            Create Account
          </h2>

          {/* Name */}
          <div className="relative mb-5">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              className="peer w-full p-3 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-blue-400">
              Full Name
            </label>
          </div>
          {errors.name && (
            <p className="text-red-400 text-xs -mt-2 mb-3">{errors.name}</p>
          )}

          {/* Email */}
          <div className="relative mb-5">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              className="peer w-full p-3 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-blue-400">
              Email
            </label>
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs -mt-2 mb-3">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              className="peer w-full p-3 pr-10 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-blue-400">
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors bg-transparent border-none p-0 flex items-center justify-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs -mt-2 mb-3">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative mb-5">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder=" "
              value={form.confirmPassword}
              onChange={handleChange}
              className="peer w-full p-3 pr-10 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-blue-400">
              Confirm Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors bg-transparent border-none p-0 flex items-center justify-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs -mt-2 mb-3">
              {errors.confirmPassword}
            </p>
          )}

          {/* Role Selector */}
          <div className="relative mb-5">
            <select
              id="role"
              value={form.role}
              onChange={handleRoleChange}
              className="peer w-full p-3 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors appearance-none"
            >
              <option value="student" className="bg-slate-900 text-white">
                Student
              </option>
              <option value="tutor" className="bg-slate-900 text-white">
                Tutor
              </option>
              <option value="recruiter" className="bg-slate-900 text-white">
                Recruiter
              </option>
            </select>
            {/* Custom dropdown arrow icon since appearance-none removed the default one */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
            <label className="absolute left-3 -top-2 text-[12px] text-blue-400 transition-all pointer-events-none">
              I am a
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 p-3 rounded-xl border-none bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-[15px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-center mt-4 text-slate-400 text-[14px]">
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
