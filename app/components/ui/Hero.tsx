import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                  🎓 Welcome to the Future of Learning
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  EduLearn
                </span>
                <br />
                <span className="text-gray-800">
                  Your Gateway to
                  <br />
                  Smart Education
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                A modern Learning Management System that connects teachers and
                students in an interactive, AI-powered environment. Experience
                education reimagined for the digital age.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/student">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span className="flex items-center space-x-2">
                    <span>👨‍🎓</span>
                    <span>Student Portal</span>
                  </span>
                </Button>
              </Link>
              <Link href="/teacher">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span className="flex items-center space-x-2">
                    <span>👨‍🏫</span>
                    <span>Teacher Portal</span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-purple-600">5K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">200+</div>
                <div className="text-sm text-gray-600">Expert Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-gray-600">Courses Available</div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/Learning-amico.svg"
                alt="Learning Illustration"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
