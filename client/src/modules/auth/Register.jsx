import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

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

  return (
    <div className="register-page">
      <div className="container">
        {/* Background glow */}
        <div className="circle blue"></div>
        <div className="circle purple"></div>

        <form className="card" onSubmit={handleSubmit}>
          <h2 className="title">Create Account</h2>

          {/* Name */}
          <div className="inputBox">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

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

          {/* Confirm Password */}
          <div className="inputBox">
            <input
              type="password"
              id="confirmPassword"
              placeholder=" "
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <label>Confirm Password</label>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          {/* Role Selector */}
          <div className="inputBox">
            <select id="role" value={form.role} onChange={handleRoleChange}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="recruiter">Recruiter</option>
            </select>
            <label className="select-label">I am a</label>
          </div>

          {/* Button */}
          <button type="submit" className="btn">
            Sign Up
          </button>

          {/* Footer */}
          <p className="footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
