import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4444/post/getAllPosts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run once when component loads
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading posts...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found 😔</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-300 rounded p-4 mb-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 my-2">{post.content}</p>
            <p className="text-sm text-gray-500">By {post.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default GetAllPosts;
