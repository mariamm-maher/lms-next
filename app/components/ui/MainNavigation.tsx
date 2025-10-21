"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function MainNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "#features", label: "Features", icon: "✨" },
    { href: "#testimonials", label: "Testimonials", icon: "💬" },
    { href: "#about", label: "About", icon: "ℹ️" },
  ];

  const portalLinks = [
    {
      href: "/student",
      label: "Student Portal",
      icon: "👨‍🎓",
      color: "from-blue-500 to-indigo-600",
    },
    {
      href: "/teacher",
      label: "Teacher Portal",
      icon: "👨‍🏫",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-purple-100"
          : "bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <span className="text-3xl relative transform group-hover:scale-110 transition-transform duration-300">
                🎓
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                EduLearn
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Learn. Grow. Excel.</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 flex items-center space-x-2 group"
              >
                <span className="transform group-hover:scale-125 transition-transform">
                  {link.icon}
                </span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Portal & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Portal Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                <span>🚪</span>
                <span>Portals</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-purple-100 overflow-hidden animate-fadeIn">
                  {portalLinks.map((portal) => (
                    <Link
                      key={portal.href}
                      href={portal.href}
                      className="block p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${portal.color} flex items-center justify-center text-white text-xl shadow-lg transform group-hover:scale-110 transition-transform`}
                        >
                          {portal.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                            {portal.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {portal.label.includes("Student")
                              ? "Browse & Learn"
                              : "Teach & Manage"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* Quick Actions */}
                  <div className="border-t border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-3">
                    <Link
                      href="/signup"
                      className="block text-center text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      New here? Create an account →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:bg-purple-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sign In</span>
              </Button>
            </Link>

            {/* Get Started Button */}
            <Link href="/signup">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Get Started</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-100 animate-slideDown">
            {/* Mobile Nav Links */}
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Portal Links */}
            <div className="space-y-2 mb-4 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Access Portals
              </p>
              {portalLinks.map((portal) => (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 hover:shadow-md transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${portal.color} flex items-center justify-center text-white text-xl shadow-lg`}
                  >
                    {portal.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {portal.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {portal.label.includes("Student")
                        ? "Browse & Learn"
                        : "Teach & Manage"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-2 px-4">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
