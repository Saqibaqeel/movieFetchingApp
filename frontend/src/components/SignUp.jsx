import React, { useState } from "react";
import useAuth from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { Signup, isSignUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await Signup(formData);
      setFormData({ fullName: "", email: "", password: "" });
      navigate("/login");
      
    } catch (error) {
      console.error("Error during sign up:", error);

    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSignUp}>
            {isSignUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
