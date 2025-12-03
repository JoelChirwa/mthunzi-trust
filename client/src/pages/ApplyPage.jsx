import React from "react";
import { motion } from "framer-motion";
import ApplicationForm from "../components/ApplicationForm";

const ApplyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Same as Vacancies Page */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Application Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Submit your application for an open vacancy. Only one application
            per vacancy per email is allowed.
          </motion.p>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ApplicationForm />
      </div>
    </div>
  );
};

export default ApplyPage;
