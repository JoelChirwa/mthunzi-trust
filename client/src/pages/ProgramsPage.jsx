import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LazyImage from "../components/LazyImage";
import Footer from "../components/Footer";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/programs");
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Programs - Mthunzi Trust"
        description="Discover Mthunzi Trust's comprehensive programs: Environmental Conservation, Climate Justice, Education, Health & SRHR, Entrepreneurship, and Water & Sanitation. Making a difference in Malawi."
        keywords="Mthunzi Trust programs, environmental conservation Malawi, youth education, SRHR programs, entrepreneurship training, water and sanitation"
        url="https://www.mthunzitrust.org/programs"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Our Programs
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Driving sustainable change through comprehensive, community-led
            initiatives.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Holistic Development
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Mthunzi Trust, we believe in a holistic approach to development.
            Our programs are interconnected, addressing the root causes of
            poverty and inequality. By integrating environmental conservation,
            education, health, and economic empowerment, we create lasting
            impact in the communities we serve.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading programs...</p>
            </div>
          ) : programs.length > 0 ? (
            programs.map((program, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={program._id}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${program.color} opacity-20 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>
                      <LazyImage
                        src={`${program.image}`}
                        alt={program.title}
                        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="text-3xl font-bold text-gray-900">
                      {program.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} mr-2`}
                        ></span>
                        Key Initiatives
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {program.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-600 text-sm"
                          >
                            <ArrowRight className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500">
              No programs found.
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-teal-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-teal-100 mb-10">
            Your support can help us expand these programs and reach more
            communities. Whether you volunteer your time or make a donation, you
            are part of the solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="px-8 py-4 bg-white text-teal-900 rounded-full font-bold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Involved
            </Link>
            <Link
              to="/donate"
              className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-teal-500"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramsPage;
