import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StayUpdated from "../components/StayUpdated";

const GetInvolvedPage = () => {
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
            Get Involved
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Join us in making a difference. There are many ways you can
            contribute to our mission.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-teal-600 flex items-center justify-center">
              <span className="text-6xl">💝</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Donate</h3>
              <p className="text-gray-600 mb-6 flex-1">
                Contribute to our work through cash or in-kind support. Your
                generosity helps us reach more communities and create lasting
                impact.
              </p>
              <Link
                to="/donate"
                className="block w-full text-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>

          {/* Partner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-blue-600 flex items-center justify-center">
              <span className="text-6xl">🤝</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partner With Us
              </h3>
              <p className="text-gray-600 mb-6 flex-1">
                You partner with us to achieve shared goals. Together, we can
                leverage our strengths to create sustainable solutions for those
                in need.
              </p>
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Become a Partner
              </Link>
            </div>
          </motion.div>

          {/* Work With Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-orange-500 flex items-center justify-center">
              <span className="text-6xl">👥</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Work With Us
              </h3>
              <p className="text-gray-600 mb-6 flex-1">
                Join our team or see available vacancies. We are always looking
                for passionate individuals to help us drive our mission forward.
              </p>
              <Link
                to="/vacancies"
                className="block w-full text-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                View Vacancies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stay Updated Section */}
      <StayUpdated />
    </div>
  );
};

export default GetInvolvedPage;
