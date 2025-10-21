import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Books */}
        <div className="absolute top-20 left-10 opacity-20 rotate-12 animate-bounce">
          <svg
            className="w-16 h-16 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            <path d="M19 15L20.09 17.26L24 18L20.09 18.74L19 21L17.91 18.74L14 18L17.91 17.26L19 15Z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 opacity-20 -rotate-12 animate-pulse">
          <svg
            className="w-12 h-12 text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
            <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" />
          </svg>
        </div>

        {/* Rockets and Stars */}
        <div className="absolute top-60 left-1/4 opacity-30 animate-bounce delay-1000">
          <svg
            className="w-10 h-10 text-orange-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.5 2C8.67 2 8 2.67 8 3.5V5.5C8 6.33 8.67 7 9.5 7S11 6.33 11 5.5V3.5C11 2.67 10.33 2 9.5 2ZM2 9.5C2 10.33 2.67 11 3.5 11H5.5C6.33 11 7 10.33 7 9.5S6.33 8 5.5 8H3.5C2.67 8 2 8.67 2 9.5ZM20.5 8C19.67 8 19 8.67 19 9.5S19.67 11 20.5 11H22.5C23.33 11 24 10.33 24 9.5S23.33 8 22.5 8H20.5ZM9.5 17C8.67 17 8 17.67 8 18.5V20.5C8 21.33 8.67 22 9.5 22S11 21.33 11 20.5V18.5C11 17.67 10.33 17 9.5 17Z" />
          </svg>
        </div>
        <div className="absolute top-32 right-1/3 opacity-25 animate-pulse delay-500">
          <svg
            className="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-1/5 opacity-20 animate-bounce delay-700">
          <svg
            className="w-10 h-10 text-pink-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {/* School supplies */}
        <div className="absolute bottom-60 right-10 opacity-25 rotate-45 animate-pulse">
          <svg
            className="w-12 h-12 text-green-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 24H2L12 2L22 24ZM4.5 22H19.5L12 6.5L4.5 22Z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-16 opacity-20 -rotate-45 animate-bounce delay-300">
          <svg
            className="w-10 h-10 text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 7H18V6C18 5.45 17.55 5 17 5H7C6.45 5 6 5.45 6 6V7H5C4.45 7 4 7.45 4 8S4.45 9 5 9H6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V9H19C19.55 9 20 8.55 20 8S19.55 7 19 7ZM16 18H8V9H16V18Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 opacity-30 rotate-12 animate-pulse delay-1200">
          <svg
            className="w-8 h-8 text-teal-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.5 8C10.88 8 12 6.88 12 5.5S10.88 3 9.5 3 7 4.12 7 5.5 8.12 8 9.5 8ZM6.5 11C5.67 11 5 11.67 5 12.5S5.67 14 6.5 14 8 13.33 8 12.5 7.33 11 6.5 11ZM12 16C10.34 16 9 17.34 9 19S10.34 22 12 22 15 20.66 15 19 13.66 16 12 16Z" />
          </svg>
        </div>

        {/* Planets */}
        <div className="absolute top-1/3 right-16 opacity-25 animate-spin-slow">
          <svg
            className="w-10 h-10 text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 opacity-20 animate-pulse delay-800">
          <svg
            className="w-8 h-8 text-emerald-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z" />
          </svg>
        </div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-purple-600">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
          </svg>
          SmartLearn
        </div>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Mascot */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <svg
              className="w-24 h-24 text-purple-600 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.28 5 13.26 5H10.74C9.72 5 8.76 5.06 7.83 5.17L10.5 2.5L9 1L3 7V9C3 10.1 3.9 11 5 11V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V11C20.1 11 21 10.1 21 9ZM7 20V9H17V20H7Z" />
            </svg>
          </div>
          <div className="mt-2 text-lg text-purple-600 font-medium">
            Hi there! I&apos;m Ollie, your learning buddy!
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 animate-float">
              <img
                src="/Learning-amico.svg"
                alt="Learning icon"
                className="w-full h-auto"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
              Welcome to SmartLearn!
            </h1>
            <div className="w-16 h-16 animate-float delay-500">
              <img
                src="/Learning-amico.svg"
                alt="Learning icon"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-xl md:text-2xl text-gray-700 font-medium">
            Where learning meets fun
            <svg
              className="w-6 h-6 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
            </svg>
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Join thousands of students on an amazing learning adventure filled
            with games, badges, and awesome discoveries!
          </p>
        </div>

        {/* Welcome Hero Section with Happy Student */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-16 border border-purple-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Happy Student Illustration */}
            <div className="flex justify-center">
              <div className="w-full max-w-md animate-float">
                <img
                  src="/Happy student-amico.svg"
                  alt="Happy student learning"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                🎉 Ready to Transform Your Learning Journey?
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Discover interactive lessons that make complex topics simple
                  and fun
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  Level up your skills with gamified challenges and rewards
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </span>
                  Connect with fellow learners and brilliant teachers worldwide
                </p>
              </div>
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                  Your adventure starts here!
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Hero Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-16 border border-green-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Teacher Message */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                👩‍🏫 Inspire the Next Generation of Learners!
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14L8 10L9.41 8.59L12 11.17L14.59 8.59L16 10L12 14Z" />
                    </svg>
                  </span>
                  Create engaging courses that captivate and inspire students
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
                    </svg>
                  </span>
                  Track student progress with powerful analytics and insights
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-teal-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12S12 10.2 12 8S13.8 4 16 4ZM4 8C4 10.2 5.8 12 8 12S12 10.2 12 8S10.2 4 8 4S4 5.8 4 8Z" />
                    </svg>
                  </span>
                  Build a community of motivated learners around your expertise
                </p>
              </div>
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
                  </svg>
                  Start teaching today!
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Teacher Illustration */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="w-full max-w-md animate-float delay-1000">
                <img
                  src="/Teacher-amico.svg"
                  alt="Teacher inspiring students"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-indigo-200 to-blue-300 p-8 rounded-3xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Join our community of learners and start your journey today!
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
