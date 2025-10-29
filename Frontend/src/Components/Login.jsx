import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://primetradeai-20gz.onrender.com/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const user = response.data.existingUser;

      console.log(response.data.message + " as " + user.name);

      setMessage(response.data.message);
      setError("");
      setIsAdmin(user.isAdmin);

      navigate("/dashboard"); // redirect to dashboard
    } catch (error) {
      console.log(error.response);
      setError("email or password incorrect");
      setMessage("");
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
      setMessage(response.data.message);
      setIsAdmin(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to logout. Please try again.";
      setError(errorMessage);
      setMessage("");
    }
  };

  const goToAdminPanel = () => {
    navigate("/admin"); // redirect to admin panel route
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
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-600 hover:underline"
          >
            Sign up
          </button>
        </p>

        {isAdmin && (
          <>
            <p className="mt-4 text-center text-sm text-red-600 font-semibold">
              Admin user logged in
            </p>
            <button
              onClick={goToAdminPanel}
              className="mt-2 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
            >
              Go to Admin Panel
            </button>
          </>
        )}

        {message && (
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
