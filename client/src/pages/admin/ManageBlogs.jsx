import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ManageBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog._id !== id));
        } else {
          alert("Failed to delete blog post");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <Link
              to="/admin/blog/create"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Create New Post
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <li key={blog._id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-teal-600 truncate">
                        {blog.title}
                      </h3>
                      <p className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="truncate">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="mx-2">&bull;</span>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.isPublished
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </span>
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <Link
                        to={`/admin/blog/edit/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {blogs.length === 0 && (
                <li className="px-4 py-8 text-center text-gray-500">
                  No blog posts found.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;
