"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student";

  // Choose illustration based on role
  const getIllustration = () => {
    if (role === "teacher") {
      return {
        src: "/undraw_professor_d7zn.svg",
        alt: "Join as a teacher",
        title: "Inspire the Next Generation!",
        subtitle: "Share your knowledge and make a difference",
      };
    }
    return {
      src: "/Student stress-rafiki.svg",
      alt: "Join as a student",
      title: "Start Your Learning Adventure!",
      subtitle: "Discover new skills and unlock your potential",
    };
  };

  const illustration = getIllustration();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden md:flex justify-center order-2 md:order-1">
            <div className="w-full max-w-lg animate-float">
              <Image
                src={illustration.src}
                alt={illustration.alt}
                width={400}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>          {/* Right Side - Signup Form */}
          <div className="flex flex-col justify-center order-1 md:order-2 mt-8">
            {/* Form Container */}
            {children}

            {/* Footer Links */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
           
              <Link
                href="/"
                className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
