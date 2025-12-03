import React, { useState } from "react";
import { Heart, CreditCard, User, Building2 } from "lucide-react";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const DonatePage = () => {
  const [donorType, setDonorType] = useState("individual");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Donate - Mthunzi Trust"
        description="Support Mthunzi Trust's mission to empower communities in Malawi. Your donation helps fund education, environmental conservation, health programs, and economic empowerment initiatives."
        keywords="Donate Mthunzi Trust, support Malawi NGO, charity donation, help communities Malawi, donate now"
        url="https://www.mthunzitrust.org/donate"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Donate today for a great cause
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your generous donation is highly appreciated.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-teal-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart
                  className="w-6 h-6 text-teal-500 mr-2"
                  fill="currentColor"
                />
                Why Donate?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We are inspired by those individuals who feel an urgency for
                change, which is why we work hard to encourage, empower and
                learn from their efforts to do the right thing.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Your contribution directly supports our programs in
                environmental conservation, education, health, and economic
                empowerment, creating a lasting impact in the communities we
                serve.
              </p>
            </div>

            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-xl font-bold text-teal-900 mb-4">
                Bank Details
              </h3>
              <div className="space-y-2 text-teal-800">
                <p>
                  <span className="font-semibold">Bank Name:</span> NBS Bank
                </p>
                <p>
                  <span className="font-semibold">Account Name:</span> Mthunzi
                  Trust
                </p>
                <p>
                  <span className="font-semibold"> USD Account Number:</span>{" "}
                  25031801
                </p>
                <p>
                  <span className="font-semibold">MWK Account Number:</span>{" "}
                  24966161
                </p>
                <p>
                  <span className="font-semibold">Branch:</span> Capital City
                  Branch
                </p>
                <p>
                  <span className="font-semibold">Swift Code:</span> NBSTMMWMW
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Make a Donation
              </h2>

              <form className="space-y-6">
                {/* Donor Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am donating as an:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDonorType("individual")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-xl transition-all ${
                        donorType === "individual"
                          ? "border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Individual
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonorType("organisation")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-xl transition-all ${
                        donorType === "organisation"
                          ? "border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Building2 className="w-5 h-5 mr-2" />
                      Organisation
                    </button>
                  </div>
                </div>

                {/* Dynamic Fields based on Donor Type */}
                {donorType === "individual" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                          placeholder="Doe"
                        />
                      </div>
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone No.
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                          placeholder="+265..."
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                        placeholder="Your address"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="orgName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Organisation Name
                      </label>
                      <input
                        type="text"
                        id="orgName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                        placeholder="Organisation Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactPerson"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                        placeholder="Contact Person Name"
                      />
                    </div>

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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                        placeholder="org@example.com"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="note"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional Note
                  </label>
                  <textarea
                    id="note"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    placeholder="Any message you'd like to add..."
                  ></textarea>
                </div>

                {/* Donation Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How much would you like to donate?
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">MWK</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Donate Now
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

export default DonatePage;
