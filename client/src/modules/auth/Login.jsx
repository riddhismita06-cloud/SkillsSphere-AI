import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(form);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] overflow-hidden relative">
      <div className="relative z-10 w-full max-w-[350px]">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[120px] -top-[150px] -left-[150px] -z-10 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-[120px] -bottom-[120px] -right-[120px] -z-10 animate-pulse"></div>

        <form
          className="p-[30px] rounded-[20px] backdrop-blur-[20px] bg-slate-900/70 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-[fadeIn_0.8s_ease]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-white mb-[24px] text-2xl font-semibold">
            Welcome Back
          </h2>

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
              type="password"
              id="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              className="peer w-full p-3 rounded-lg bg-transparent border border-white/20 text-white outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:text-blue-400">
              Password
            </label>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs -mt-2 mb-3">{errors.password}</p>
          )}

          {/* Options */}
          <div className="flex justify-between items-center text-[14px] text-slate-400 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" /> Remember me
            </label>
            <span className="text-blue-400 cursor-pointer hover:underline">
              Forgot ?
            </span>
          </div>

          {/* Button */}
          <button className="w-full mt-2 p-3 rounded-xl border-none bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-[15px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            Login
          </button>

          {/* Footer */}
          <p className="text-center mt-4 text-slate-400 text-[14px]">
            Don’t have an account?{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;