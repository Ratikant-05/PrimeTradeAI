import React from "react";
import GetAllPosts from "./GetAllPosts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast.success("Logout Successfully")
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <GetAllPosts />
      </main>
    </div>
  );
};

export default Dashboard;
