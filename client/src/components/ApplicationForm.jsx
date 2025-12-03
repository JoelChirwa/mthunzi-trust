import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Paperclip, Upload } from "lucide-react";

const ApplicationForm = () => {
  const [vacancies, setVacancies] = useState([]);
  const [form, setForm] = useState({
    vacancy: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
  });
  const [files, setFiles] = useState({
    coverLetter: null,
    cv: null,
    certificates: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const res = await fetch("/api/vacancies");
      const data = await res.json();
      if (data.vacancies)
        setVacancies(data.vacancies.filter((v) => v.isActive));
      // If a vacancy id is in the query params, preselect it
      const params = new URLSearchParams(location.search);
      const qVac = params.get("vacancy");
      if (qVac && data.vacancies) {
        const exists = data.vacancies.find((v) => v._id === qVac && v.isActive);
        if (exists) setForm((prev) => ({ ...prev, vacancy: qVac }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === "certificates") {
      setFiles((prev) => ({ ...prev, [name]: Array.from(selectedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.vacancy)
      return setMessage({ type: "error", text: "Please select a vacancy." });
    if (!files.coverLetter)
      return setMessage({
        type: "error",
        text: "Please upload your Cover Letter.",
      });
    if (!files.cv)
      return setMessage({ type: "error", text: "Please upload your CV." });
    if (files.certificates.length === 0)
      return setMessage({
        type: "error",
        text: "Please upload at least one certificate.",
      });

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    if (files.coverLetter) fd.append("coverLetter", files.coverLetter);
    if (files.cv) fd.append("cv", files.cv);
    if (files.certificates.length > 0) {
      files.certificates.forEach((file) => fd.append("certificates", file));
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/applications", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage({
          type: "success",
          text: "Application submitted successfully.",
        });
        setForm({
          vacancy: "",
          name: "",
          email: "",
          phone: "",
          dob: "",
          location: "",
        });
        setFiles({ coverLetter: null, cv: null, certificates: [] });
        // Reset file inputs manually
        document
          .querySelectorAll('input[type="file"]')
          .forEach((input) => (input.value = ""));
      } else {
        setMessage({
          type: "error",
          text: res.data.message || "Submission failed",
        });
      }
    } catch (err) {
      const text = err.response?.data?.message || err.message;
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        Apply for a Vacancy
      </h3>

      {message && (
        <div
          className={`${
            message.type === "error"
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
          } p-4 rounded-lg border mb-6 flex items-center`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vacancy <span className="text-red-500">*</span>
          </label>
          <select
            name="vacancy"
            value={form.vacancy}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
          >
            <option value="">Select vacancy</option>
            {vacancies.map((v) => (
              <option key={v._id} value={v._id}>
                {v.title} — {v.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-5">
          {/* Cover Letter Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter Upload <span className="text-red-500">*</span>{" "}
              <span className="text-gray-500 font-normal">(pdf/doc only)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                name="coverLetter"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                required
              />
              <Paperclip className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CV <span className="text-red-500">*</span>{" "}
              <span className="text-gray-500 font-normal">(pdf/doc)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                required
              />
              <Paperclip className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Certificates Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificates <span className="text-red-500">*</span>{" "}
              <span className="text-gray-500 font-normal">
                (can upload more than one) (pdf/doc/jpg/png)
              </span>
            </label>
            <div className="relative">
              <input
                type="file"
                name="certificates"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                required
              />
              <Paperclip className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {files.certificates.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {files.certificates.length} file(s) selected
              </div>
            )}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            } transition-all duration-200`}
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
                Submitting Application...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplicationForm;
