import React, { useState } from "react";
import { Mail, Bell, Check } from "lucide-react";
import axios from "axios";

const StayUpdated = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      return setMessage({
        type: "error",
        text: "Please enter your email address",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/subscribers/subscribe", {
        email,
        name,
        jobPostings: true,
        blogUpdates: true,
      });

      if (res.data.success) {
        setMessage({ type: "success", text: res.data.message });
        setEmail("");
        setName("");
      } else {
        setMessage({ type: "error", text: res.data.message });
      }
    } catch (err) {
      const text =
        err.response?.data?.message || "Subscription failed. Please try again.";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 to-blue-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-500/20 p-4 rounded-full">
              <Bell className="w-8 h-8 text-teal-300" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Subscribe to receive notifications about new job postings and blog
            updates from Mthunzi Trust
          </p>
        </div>

        {message && (
          <div
            className={`${
              message.type === "error"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-green-100 text-green-700 border-green-300"
            } p-4 rounded-lg border mb-6 max-w-xl mx-auto flex items-center`}
          >
            {message.type === "success" && <Check className="w-5 h-5 mr-2" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="space-y-4">
              {/* Name Field (Optional) */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-teal-100 mb-2"
                >
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="subscribe-email"
                  className="block text-sm font-medium text-teal-100 mb-2"
                >
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-teal-300" />
                  <input
                    type="email"
                    id="subscribe-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Subscription Preferences */}
              <div className="bg-teal-800/30 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-teal-100 mb-2">
                  You'll receive updates about:
                </p>
                <div className="flex items-center text-teal-100 text-sm">
                  <Check className="w-4 h-4 mr-2 text-teal-300" />
                  New Job Postings
                </div>
                <div className="flex items-center text-teal-100 text-sm">
                  <Check className="w-4 h-4 mr-2 text-teal-300" />
                  Blog Updates & News
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
                  loading
                    ? "bg-teal-500/50 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-400 hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </>
                )}
              </button>

              <p className="text-xs text-teal-200 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StayUpdated;
