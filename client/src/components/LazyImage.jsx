import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderColor = "bg-gray-200",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {isLoading && (
        <div
          className={`absolute inset-0 ${placeholderColor} animate-pulse`}
        ></div>
      )}

      {/* Actual Image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleImageLoad}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
