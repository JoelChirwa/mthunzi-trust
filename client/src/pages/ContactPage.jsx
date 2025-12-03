import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear status when user starts typing again
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us - Mthunzi Trust"
        description="Get in touch with Mthunzi Trust. We'd love to hear from you about our programs, partnerships, or volunteering opportunities. Contact us today."
        keywords="Contact Mthunzi Trust, get in touch, Malawi NGO contact, reach us, partnership inquiries"
        url="https://www.mthunzitrust.org/contact"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Get in touch with us today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-green-800 font-semibold">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700 text-sm mt-1">
                  Thank you for reaching out. We've received your message and
                  will get back to you within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-red-800 font-semibold">
                  Oops! Something went wrong
                </h3>
                <p className="text-red-700 text-sm mt-1">
                  We couldn't send your message. Please try again or contact us
                  directly at info@mthunzitrust.org
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Have questions about our programs, want to volunteer, or
                interested in partnering with us? We're here to help and would
                be delighted to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Our Offices
                  </h3>
                  <p className="text-gray-600">
                    Lilongwe & Blantyre
                    <br />
                    Malawi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    +265 996 654 088 LL
                    <br />
                    +265 884 691 730 BT
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    info@mthunzitrust.org
                    <br />
                    contact@mthunzitrust.org
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Working Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 4:00 PM
                    <br />
                    Saturday: 8:00 AM - 12:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-64">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <MapPin className="w-12 h-12 mb-2" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                      placeholder="+265..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white transition-all shadow-lg ${
                    isSubmitting
                      ? "bg-teal-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl transform hover:-translate-y-0.5"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                  {isSubmitting ? (
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
