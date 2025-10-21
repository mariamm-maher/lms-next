"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Eye, EyeOff, AlertCircle, Loader2, Mail, Github } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Signing you in...");
    try {
      console.log("=== LOGIN DEBUG START ===");
      console.log("Attempting login with:", { email: formData.email });

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log("=== SIGNIN RESULT ===");
      console.log("Full SignIn result:", JSON.stringify(result, null, 2));
      console.log("SignIn result properties:");
      console.log("- error:", result?.error);
      console.log("- ok:", result?.ok);
      console.log("- status:", result?.status);
      console.log("- url:", result?.url);

      if (result?.error) {
        console.error("SignIn failed with error:", result.error);
        throw new Error("Invalid credentials");
      }

      console.log("=== GETTING SESSION ===");
      // Get session to determine user role
      const session = await getSession();
      console.log("Raw session object:", session);
      console.log("Session JSON:", JSON.stringify(session, null, 2));

      if (session) {
        console.log("=== SESSION BREAKDOWN ===");
        console.log("Session exists:", !!session);
        console.log("Session user:", session.user);
        console.log("Session user properties:");
        if (session.user) {
          console.log("- id:", session.user.id);
          console.log("- name:", session.user.name);
          console.log("- email:", session.user.email);
          console.log("- role:", session.user.role);
          console.log("- image:", session.user.image);
        }
        console.log("Session expires:", session.expires);
      } else {
        console.log("Session is null or undefined!");
      }

      const userRole = session?.user?.role;
      console.log("Extracted user role:", userRole);

      // Success toast
      toast.success(`Welcome back, ${session?.user?.name || "User"}!`, {
        id: loadingToast,
      }); // Small delay to show success message before redirect
      setTimeout(() => {
        console.log("Redirecting based on role:", userRole);
        if (userRole === "STUDENT") {
          console.log("Redirecting to /student");
          router.push("/student");
        } else if (userRole === "TEACHER") {
          console.log("Redirecting to /teacher");
          router.push("/teacher");
        } else {
          console.log("Redirecting to / (default)");
          router.push("/");
        }
      }, 1000);
    } catch (err: unknown) {
      // Error toast
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      console.error("Login error details:", err);
      setError(errorMessage);
      toast.error(errorMessage, {
        id: loadingToast,
      });
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="w-full space-y-8">
      <div className="bg-white/90 backdrop-blur-sm py-8 px-6 shadow-xl rounded-xl border border-white/20">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {" "}
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Email address
            </label>{" "}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Password
            </label>{" "}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>{" "}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-purple-300 rounded transition-all"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>{" "}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {" "}
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>{" "}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {" "}
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
