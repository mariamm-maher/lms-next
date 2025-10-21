"use client";

import Link from "next/link";
import { useState } from "react";

const navigationItems = [
  {
    id: "home",
    label: "Home",
    path: "/student",
  },
  {
    id: "my-learning",
    label: "Learning Hub",
    path: "/student/explore-courses",
  },
  {
    id: "explore-tutors",
    label: "Explore Tutors",
    path: "/student/browse-teachers",
  },
  {
    id: "profile",
    label: "Profile",
    path: "/student/profile",
    badge: "1",
  },
];

interface StudentNavigationProps {
  activeSection?: string;
}

export default function StudentNavigation({
  activeSection = "home",
}: StudentNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/student" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                trenning
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link key={item.id} href={item.path}>
                  <div
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {activeSection === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Ask AI Button */}
            <Link href="/student/ai-assistant">
              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Ask AI</span>
              </button>
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <Link href="/student/exams-quizzes">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </Link>

            {/* Messages */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>

            {/* User Profile */}
            <Link href="/student/profile">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  AI
                </div>
                <div className="hidden xl:block">
                  <div className="text-sm font-semibold text-gray-900">
                    Adit Irwa
                  </div>
                  <div className="text-xs text-gray-500">Jr UI/UX D</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`px-3 py-2 text-xs font-medium ${
                  activeSection === item.id
                    ? "text-purple-600"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
