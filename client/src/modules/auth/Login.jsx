import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(form);
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
          noValidate
        >
          <h2 className="text-center text-white mb-[24px] text-2xl font-semibold">
            Welcome Back
          </h2>

          <div className="flex flex-col gap-4 mb-5">
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-[14px] text-slate-400 mb-4 px-1">
            <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer">
              <input
                id="remember-me"
                type="checkbox"
                className="accent-blue-500 rounded focus:ring-2 focus:ring-blue-500"
              />
              Remember me
            </label>
            <span className="text-blue-400 cursor-pointer hover:underline">
              Forgot ?
            </span>
          </div>

          {/* Button */}
          <Button 
            type="submit"
            fullWidth
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 border-none font-bold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
          >
            Login
          </Button>

          {/* Footer */}
          <p className="text-center mt-5 text-slate-400 text-[14px]">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;