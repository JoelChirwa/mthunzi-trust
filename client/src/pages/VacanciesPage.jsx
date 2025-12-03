import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/vacancies");
      const data = await response.json();
      if (data.vacancies) {
        // Filter only active vacancies
        const activeVacancies = data.vacancies.filter((v) => v.isActive);
        setVacancies(activeVacancies);
      }
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Career Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Join our team and help us make a lasting impact in our communities.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="text-center py-12 text-gray-600">
            Loading opportunities...
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Openings Currently
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We don't have any open positions at the moment, but please check
              back later or follow us on social media for updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {vacancies.map((vacancy, index) => (
              <motion.div
                key={vacancy._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-8 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {vacancy.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                        💼 {vacancy.type}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                        📍 {vacancy.location}
                      </span>
                      {vacancy.deadline && (
                        <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                          ⏰ Deadline:{" "}
                          {new Date(vacancy.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/apply?vacancy=${vacancy._id}`}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>

                <div className="prose max-w-none text-gray-600 mb-6">
                  <p>{vacancy.description}</p>
                </div>

                {vacancy.requirements && vacancy.requirements.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Requirements:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {vacancy.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesPage;
