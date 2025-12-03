import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ManageVacancies = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/vacancies");
      const data = await response.json();
      if (data.vacancies) {
        setVacancies(data.vacancies);
      }
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this vacancy?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/vacancies/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setVacancies(vacancies.filter((vacancy) => vacancy._id !== id));
        } else {
          alert("Failed to delete vacancy");
        }
      } catch (error) {
        console.error("Error deleting vacancy:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Vacancies
            </h1>
            <p className="text-gray-600 mt-1">
              Add, edit, and manage job openings
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
              to="/admin/vacancies/create"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
            >
              Post Vacancy
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid gap-6">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {vacancy.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vacancy.type}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vacancy.location}
                    </span>
                    {vacancy.deadline && (
                      <span className="bg-red-50 text-red-600 px-2 py-1 rounded">
                        Deadline:{" "}
                        {new Date(vacancy.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      vacancy.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {vacancy.isActive ? "Active" : "Closed"}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/vacancies/edit/${vacancy._id}`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium text-sm px-3 py-1 border border-indigo-100 rounded hover:bg-indigo-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(vacancy._id)}
                      className="text-red-600 hover:text-red-900 font-medium text-sm px-3 py-1 border border-red-100 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {vacancies.length === 0 && (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
                No vacancies found. Post your first job opening!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVacancies;
