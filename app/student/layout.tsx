"use client";

import { usePathname } from "next/navigation";
import StudentNavigation from "./components/StudentNavigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Extract the current section from the pathname
  const getActiveSection = () => {
    if (pathname.includes("/browse-teachers")) return "browse-teachers";
    if (pathname.includes("/explore-courses")) return "explore-courses";
    if (pathname.includes("/exams-quizzes")) return "exams-quizzes";
    if (pathname.includes("/ai-assistant")) return "ai-assistant";
    if (pathname.includes("/profile")) return "profile";
    return "browse-teachers";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Educational Icons */}
        <div className="absolute top-20 left-10 opacity-15 rotate-12 animate-bounce">
          <svg
            className="w-12 h-12 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 opacity-15 -rotate-12 animate-pulse">
          <svg
            className="w-10 h-10 text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
          </svg>
        </div>
        <div className="absolute top-60 left-1/4 opacity-20 animate-bounce delay-1000">
          <svg
            className="w-8 h-8 text-orange-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-1/5 opacity-15 animate-bounce delay-700">
          <svg
            className="w-9 h-9 text-pink-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" />
          </svg>
        </div>
        <div className="absolute bottom-60 right-10 opacity-20 rotate-45 animate-pulse">
          <svg
            className="w-10 h-10 text-green-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 7H18V6C18 5.45 17.55 5 17 5H7C6.45 5 6 5.45 6 6V7H5C4.45 7 4 7.45 4 8S4.45 9 5 9H6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V9H19C19.55 9 20 8.55 20 8S19.55 7 19 7Z" />
          </svg>
        </div>

        {/* Soft Background Shapes */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-pink-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10">
        <StudentNavigation activeSection={getActiveSection()} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
