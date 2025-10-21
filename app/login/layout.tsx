import Image from "next/image";
import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-lg animate-float">
              <Image
                src="/undraw_login_weas.svg"
                alt="Welcome back to learning"
                width={400}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center">
            {/* Header */}

            {/* Form Container */}
            {children}

            {/* Footer Links */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Sign up here
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
