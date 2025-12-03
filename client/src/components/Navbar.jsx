import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Mthunzi Trust Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full"
              />
              <span
                className={`text-xl sm:text-2xl font-bold tracking-tight ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Mthunzi<span className="text-teal-600">Trust</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-teal-600 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-teal-600 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              to="/donate"
              className="px-5 py-2.5 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-600/30"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none ${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-teal-600`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="pt-4">
              <Link
                to="/donate"
                className="block w-full text-center px-5 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all shadow-md"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
