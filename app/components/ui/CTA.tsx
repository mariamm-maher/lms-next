import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function CTA() {
  return (
    <div className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative order-2 lg:order-1">
            <Image
              src="/undraw_professor_d7zn.svg"
              alt="Get Started"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Right Side - Content */}
          <div className="text-white space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-purple-100">
              Join thousands of students and educators who are already using
              EduLearn to achieve their educational goals. Get started today -
              it's free!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100"
                >
                  <span className="flex items-center space-x-2">
                    <span>🚀</span>
                    <span>Get Started Free</span>
                  </span>
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  <span className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Sign In</span>
                  </span>
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span className="text-purple-100">Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span className="text-purple-100">No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
