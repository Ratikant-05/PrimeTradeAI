import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAdminChange = (e) => setIsAdmin(e.target.checked);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://primetradeai-20gz.onrender.com/auth/login",
        { email, password, isAdmin },
        { withCredentials: true }
      );

      const user = response.data.existingUser;
      setMessage(response.data.message);
      toast.success("Login Successful")
      if (user.isAdmin) {
        navigate("/adminDashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.response);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError("");
      const response = await axios.post(
        "https://primetradeai-20gz.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logout Successfully");
      setMessage(response.data.message);
      setIsAdmin(false);
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to logout. Please try again.";
      setError(errorMessage);
      setMessage("");
    }
  };

  const goToAdminPanel = async () => {
    try {
      setError("");
      setLoading(true);
      
      const res = await axios.post(`https://primetradeai-20gz.onrender.com/auth/login`, { email, password }, { withCredentials: true });
      
      const user = res.data.existingUser.isAdmin;

      if (user === true) {
        navigate("/adminDashboard");
      } else {
        toast.error("You are not an Admin");
      }
    } catch (error) {
      console.error("Admin verification error:", error.response);
      toast.error("Failed to verify admin status. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={handleAdminChange}
              disabled={loading}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-700">I am an Admin</label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition text-white ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            disabled={loading}
            className="text-indigo-600 hover:underline"
          >
            Sign up
          </button>
        </p>

        {isAdmin && !loading && (
          <button
            onClick={goToAdminPanel}
            className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            Go to Admin Panel
          </button>
        )}

        {message && !loading && (
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
