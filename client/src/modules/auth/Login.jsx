import React, { useState } from "react";
import "./login.css";

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
    /*  LOGIN PAGE WRAPPER (IMPORTANT) */
    <div className="login-page">

      <div className="container">
        {/* Background glow */}
        <div className="circle blue"></div>
        <div className="circle purple"></div>

        <form className="card" onSubmit={handleSubmit}>
          <h2 className="title">Welcome Back </h2>

          {/* Email */}
          <div className="inputBox">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          {/* Password */}
          <div className="inputBox">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          {/* Options */}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot ?</span>
          </div>

          {/* Button */}
          <button className="btn">Login</button>

          {/* Footer */}
          <p className="footer">
            Don’t have an account? <span>Sign up</span>
          </p>
        </form>
      </div>

    </div>
  );
};

export default Login;