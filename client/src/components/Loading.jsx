import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-teal-900 to-blue-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Modern Spinner Container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer Orbital Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-400 border-r-teal-400 animate-spin-fast opacity-75"></div>

          {/* Middle Orbital Ring */}
          <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400 animate-spin-reverse opacity-75"></div>

          {/* Inner Glow Ring */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-teal-500/30 to-blue-500/30 blur-md animate-pulse"></div>

          {/* Core Ring */}
          <div className="absolute inset-6 rounded-full border-2 border-white/40 animate-pulse-slow"></div>

          {/* Center Logo/Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 via-blue-400 to-purple-500 rounded-lg rotate-45 animate-float shadow-lg shadow-teal-500/50"></div>
              <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-teal-400 via-blue-400 to-purple-500 rounded-lg rotate-45 animate-ping opacity-75"></div>
            </div>
          </div>

          {/* Orbiting Dots */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"></div>
          </div>
          <div className="absolute inset-0 animate-spin-reverse-slow">
            <div className="absolute bottom-0 left-1/2 -ml-1.5 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          </div>
        </div>

        {/* Loading Text with Gradient */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce-dot">.</span>
              <span className="animate-bounce-dot animation-delay-200">.</span>
              <span className="animate-bounce-dot animation-delay-400">.</span>
            </span>
          </h2>
          <p className="text-gray-300 text-sm font-light tracking-wide animate-fade-in">
            Preparing your experience
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden mt-6">
            <div className="h-full bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 animate-progress-bar rounded-full"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Enhanced Spinning Animations */
        @keyframes spin-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-fast {
          animation: spin-fast 1s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 4s linear infinite;
        }

        /* Floating Animation */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-10px) rotate(45deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Pulse Slow */
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        /* Bouncing Dots */
        @keyframes bounce-dot {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce-dot {
          display: inline-block;
          animation: bounce-dot 1.4s infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        /* Gradient Shift */
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradient-shift 3s ease infinite;
        }

        /* Fade In */
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }

        /* Progress Bar */
        @keyframes progress-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-progress-bar {
          animation: progress-bar 2s ease-in-out infinite;
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          background: radial-gradient(
            circle,
            rgba(56, 189, 248, 0.8) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation: float-particle 8s ease-in-out infinite;
        }

        .particle-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation: float-particle 10s ease-in-out infinite reverse;
        }

        .particle-3 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 20%;
          animation: float-particle 7s ease-in-out infinite;
          background: radial-gradient(
            circle,
            rgba(45, 212, 191, 0.6) 0%,
            transparent 70%
          );
        }

        .particle-4 {
          width: 120px;
          height: 120px;
          top: 30%;
          right: 25%;
          animation: float-particle 9s ease-in-out infinite;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.5) 0%,
            transparent 70%
          );
        }

        .particle-5 {
          width: 90px;
          height: 90px;
          bottom: 30%;
          right: 40%;
          animation: float-particle 11s ease-in-out infinite reverse;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.7) 0%,
            transparent 70%
          );
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.6;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
