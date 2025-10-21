"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  AlertCircle,
  GraduationCap,
  Github,
  Loader2,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role") || "student";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    role: role,
  });
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update form role when URL parameter changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: role }));
  }, [role]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords don't match!";
      setValidationError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setValidationError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!formData.agreeToTerms) {
      const errorMsg = "You must agree to the terms and conditions";
      setValidationError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Creating your account...");
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const userRole = formData.role === "teacher" ? "TEACHER" : "STUDENT";

      // Debug logging
      console.log("Form data role:", formData.role);
      console.log("Calculated user role:", userRole);

      const requestBody = {
        name: fullName,
        email: formData.email,
        password: formData.password,
        role: userRole,
      };

      console.log("Sending registration request:", requestBody);

      // Register user via API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success toast
      toast.success(
        `Welcome, ${fullName}! Your account has been created successfully. Please sign in to continue.`,
        {
          id: loadingToast,
        }
      );

      // Small delay to show success message before redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      // Error toast
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage, {
        id: loadingToast,
      });
      console.error("Registration failed:", err);
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
          {/* Error Messages */}
          {validationError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-800 font-medium">
                  {validationError}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <Link
              href="/signup?role=student"
              className={`transition-colors ${
                role === "student"
                  ? "text-purple-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Student Account
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/signup?role=teacher"
              className={`transition-colors ${
                role === "teacher"
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Teacher Account
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                First name
              </label>{" "}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300"
                  placeholder="Your first name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Last name
              </label>{" "}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300"
                  placeholder="Your last name"
                />
              </div>
            </div>
          </div>
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
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300 pr-12"
                placeholder="Create a strong password"
              />{" "}
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
            <p className="mt-2 text-xs text-purple-600 font-medium">
              Must be at least 8 characters long
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-black transition-all duration-200 hover:border-purple-300 pr-12"
                placeholder="Confirm your password"
              />{" "}
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>{" "}
          {/* Terms and Conditions */}
          <div className="flex items-center">
            <div className="relative">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              {formData.agreeToTerms && (
                <CheckCircle2 className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
              )}
            </div>
            <label
              htmlFor="agreeToTerms"
              className="ml-3 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating account...
                </span>
              ) : (
                <>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Create your SmartLearn account
                </>
              )}
            </button>
          </div>
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
