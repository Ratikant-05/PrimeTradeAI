import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async() => {
    const response = await axios.post('http://localhost:4444/auth/logout',{}, {withCredentials:true})
    console.log(response.data)
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Dashboard!
      </h1>
      <p className="text-gray-600 mb-6">
        This is a simple dashboard page. You can put stats, charts, or other content here.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
