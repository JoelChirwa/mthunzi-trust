import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  X,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About Us", href: "/about", isRoute: true },
    { name: "Programs", href: "/#programs", isRoute: false },
    { name: "Get Involved", href: "/#get-involved", isRoute: false },
    { name: "Contact", href: "/#contact", isRoute: false },
  ];

  const programs = [
    { name: "Education Programs", href: "#programs" },
    { name: "Entrepreneurship", href: "#programs" },
    { name: "Environmental Sustainability", href: "#programs" },
    { name: "SRHR & Health", href: "#programs" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61553498614261",
      label: "Facebook",
    },
    {
      icon: X,
      href: "https://x.com/MthunziTrust/status/1977639024069316884?t=ezrtOV9r-I-U9wi8VzmfsQ&s=19",
      label: "X",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/mthunzitrust?igsh=MXZ1NzIxNHUxcmh3Nw==",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/mthunzi-trust/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Mthunzi Trust Logo"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-bold">
                Mthunzi<span className="text-teal-400">Trust</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering youth and communities through education,
              entrepreneurship, environmental sustainability, and SRHR.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">Lilongwe, Malawi</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">+265 996 654 088</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">
                  info@mthunzitrust.org
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/admin/dashboard" target="_blank">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Mthunzi Trust. All rights reserved.
              </p>
            </Link>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
