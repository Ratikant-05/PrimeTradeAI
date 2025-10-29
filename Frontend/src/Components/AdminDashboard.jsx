import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://primetradeai-20gz.onrender.com/post/getAllPosts", {
          withCredentials: true
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        toast.error("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://primetradeai-20gz.onrender.com/post/delete/${id}`, {
        withCredentials: true
      });
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete post.");
    }
  };

  const handleAddPost = () => {
    navigate("/addPost");
  };

  const handleLogout = () => {
    navigate("/");
    toast.success("Logout Successful")
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={handleAddPost}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Post
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">All Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {post.content}
                  </p>
                  <p className="text-sm text-gray-400">By {post.author}</p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
