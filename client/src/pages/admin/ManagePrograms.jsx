import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LazyImage from "../../components/LazyImage";

const ManagePrograms = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/programs/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setPrograms(data.programs);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/programs/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setPrograms(programs.filter((program) => program._id !== id));
        } else {
          alert("Failed to delete program");
        }
      } catch (error) {
        console.error("Error deleting program:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Programs
            </h1>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your programs
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
              to="/admin/programs/create"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add New Program
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {programs.map((program) => (
                <li key={program._id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden mr-4">
                        <LazyImage
                          src={`http://localhost:4000${program.image}`}
                          alt={program.title}
                          className="h-16 w-16 object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-medium text-teal-600 truncate">
                          {program.title}
                        </h3>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate max-w-md">
                            {program.description}
                          </span>
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              program.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {program.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className="text-xs text-gray-400">
                            Order: {program.order}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <Link
                        to={`/admin/programs/edit/${program._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(program._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {programs.length === 0 && (
                <li className="px-4 py-8 text-center text-gray-500">
                  No programs found.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePrograms;
