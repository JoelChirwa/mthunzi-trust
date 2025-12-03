import React, { useState, useEffect, useRef } from "react";
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
import aboutImage from "../assets/about.webp";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericEnd = parseInt(end.replace(/,/g, ""));
    const increment = numericEnd / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <span ref={counterRef}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const About = () => {
  const navigate = useNavigate();
  const impactStats = [
    { number: "5000", suffix: "+", label: "Youth Empowered" },
    { number: "50", suffix: "+", label: "Communities Reached" },
    { number: "10000", suffix: "+", label: "Trees Planted" },
    { number: "100", suffix: "+", label: "Entrepreneurs Supported" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6 opacity-0 animate-[fadeIn_0.8s_ease-in_0.2s_forwards]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                About <span className="gradient-text">Mthunzi Trust</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Mthunzi Trust is a youth led and youth focused dedicated to
                harnessing the power of youth to create positive change in
                Malawi through education, entrepreneurship, environmental
                sustainability, entrepreneurship and sexual and reproductive
                health rights. Mthunzi Trust uses advocacy, capacity building,
                community engagement and policy influence to drive impactful
                change. Our work is community driven, participatoty and inline
                with Malawi vision 2063.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="pt-4 opacity-0 animate-[fadeIn_0.8s_ease-in_0.4s_forwards]">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-teal-600 animate-pulse" />
                Our Impact
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {impactStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-in_forwards]"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold gradient-text mb-2">
                      <CountUp
                        end={stat.number}
                        duration={2000}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="animate-slide-in-right opacity-0 animate-[fadeIn_0.8s_ease-in_0.3s_forwards]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <LazyImage
                src={aboutImage}
                alt="Mthunzi Trust Community Impact"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Want to Help Button */}
            <div className="mt-10 text-center opacity-0 animate-[fadeInUp_0.6s_ease-in_0.5s_forwards]">
              <button
                onClick={() => navigate("/donate")}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-teal-600 rounded-full shadow-lg hover:bg-teal-700 hover:shadow-teal-600/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Want to help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
