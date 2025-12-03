import React, { useState, useEffect } from "react";
import LazyImage from "./LazyImage";
import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.webp";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: "Welcome to Mthunzi Trust",
      subtitle: "The Umbrella of Hope",
      buttonText: "Learn More",
      buttonLink: "#about",
    },
    {
      image: hero2,
      title: "Our Mission",
      description:
        "To empower youth and communities through education, entrepreneurship, environmental sustainability, and sexual and reproductive health rights (SRHR), fostering holistic and sustainable development in Malawi.",
      buttonText: "Get Involved",
      buttonLink: "#get-involved",
    },
  ];

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[65vh] sm:h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <LazyImage
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
          </div>

          {/* Content - Centered */}
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight animate-fade-in">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-teal-400 font-semibold mb-6 sm:mb-8 animate-fade-in-delay-1">
                    {slide.subtitle}
                  </p>
                )}

                {slide.description && (
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-1">
                    {slide.description}
                  </p>
                )}

                <a
                  href={slide.buttonLink}
                  className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-teal-600 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-2xl hover:shadow-teal-600/50 hover:scale-105 animate-fade-in-delay-2"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-teal-500 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
