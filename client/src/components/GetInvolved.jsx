import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users } from "lucide-react";

const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-20 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Get Involved
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join us in making a difference in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work With Us Card */}
          <Link
            to="/get-involved"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-bl-full opacity-50"></div>

            <div className="relative p-8 md:p-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Users className="w-8 h-8" />
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Work With Us
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join our team or explore partnership opportunities. We're always
                looking for passionate individuals and organizations to
                collaborate with.
              </p>

              <div className="mt-6 inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                Explore Opportunities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Donate Card */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(5,100,45,0.90), rgba(16,185,129,0.85)), url('https://images.unsplash.com/photo-1517817748493-7a6f6f5a8b2f?auto=format&fit=crop&w=1200&q=60')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-900/20 to-transparent"></div>

            <div className="relative p-8 md:p-10 text-white h-full flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6">
                  <Heart className="w-8 h-8" fill="currentColor" />
                </div>

                <h4 className="text-2xl md:text-3xl font-bold mb-4">
                  Make a Donation
                </h4>

                <blockquote className="text-lg md:text-xl leading-relaxed font-light mb-6 italic border-l-4 border-white/50 pl-4">
                  "Your gift today plants hope for tomorrow. Every act of giving
                  changes a life."
                </blockquote>
              </div>

              <div>
                <Link to="/donate">
                  <button className="bg-white text-teal-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-teal-50 hover:shadow-xl transition-all text-lg group inline-flex items-center">
                    Donate Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
