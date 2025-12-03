import React from "react";
import {
  GraduationCap,
  Briefcase,
  Sprout,
  HeartHandshake,
  Scale,
  Droplets,
} from "lucide-react";

const Programs = () => {
  const programs = [
    {
      icon: Sprout,
      title: "Environmental Conservation",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Scale,
      title: "Climate Justice Advocacy",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      icon: GraduationCap,
      title: "Inclusive and Equitable Education",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: HeartHandshake,
      title: "Health & SRHR",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      icon: Briefcase,
      title: "Entrepreneurship & Livelihoods",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Droplets,
      title: "Water and Sanitation",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  return (
    <section id="programs" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Focus Areas
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            We are dedicated to driving impactful change through these key
            strategic areas, empowering communities and fostering sustainable
            development.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-teal-200 transform hover:-translate-y-2"
              >
                {/* Decorative gradient overlay */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}`}
                ></div>

                {/* Card Content */}
                <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${program.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-10 h-10 ${program.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {program.title}
                  </h3>
                </div>

                {/* Background Pattern */}
                <div
                  className={`absolute bottom-0 right-0 w-32 h-32 ${program.bgColor} rounded-tl-full opacity-10 -mb-10 -mr-10 group-hover:opacity-20 transition-opacity`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
