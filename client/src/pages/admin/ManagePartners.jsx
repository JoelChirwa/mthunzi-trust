import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ManagePartners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/partners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.partners) {
        setPartners(data.partners);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this partner?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/partners/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setPartners(partners.filter((partner) => partner._id !== id));
        } else {
          alert("Failed to delete partner");
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Partners
            </h1>
            <p className="text-gray-600 mt-1">
              Add, edit, and manage your organization partners
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
              to="/admin/partners/create"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add Partner
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-32 h-32 object-contain mb-4"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mb-4 rounded-lg">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium mb-2">
                      {partner.partnershipType}
                    </p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mb-2"
                      >
                        Visit Website
                      </a>
                    )}
                    <span
                      className={`mt-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        partner.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {partner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center space-x-4">
                    <Link
                      to={`/admin/partners/edit/${partner._id}`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(partner._id)}
                      className="text-red-600 hover:text-red-900 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {partners.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No partners found. Add your first partner!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePartners;
