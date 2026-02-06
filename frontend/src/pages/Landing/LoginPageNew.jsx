import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import bgImage from "../../assets/repair-bg.png";
import axiosInstance from "../../Services/axiosInstance";
import {
  HandleMessageUIError,
  HandleMessageUISuccess,
} from "../../utils/toastConfig";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        if (response.data.role === "technician") {
          navigate("/technician/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        HandleMessageUIError(),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#0d3d43" }}
      >
        ← Back
      </button>

      <div className="w-full max-w-md rounded-xl shadow-lg bg-white/80 backdrop-blur-md border border-white/30 p-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="text-teal-600 font-semibold ml-1 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
