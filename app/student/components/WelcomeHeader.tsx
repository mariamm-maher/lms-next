"use client";

import Card from "../../components/ui/Card";
import Image from "next/image";

interface WelcomeHeaderProps {
  name: string;
  greeting: string;
  stats: {
    studyStreak: number;
    coursesInProgress: number;
    averageGrade: number;
  };
}

export default function WelcomeHeader({
  name,
  greeting,
  stats,
}: WelcomeHeaderProps) {
  return (
    <Card className="bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 text-white border-none shadow-2xl overflow-hidden relative">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 left-10 text-6xl animate-float">📚</div>
        <div
          className="absolute top-20 right-20 text-5xl animate-float"
          style={{ animationDelay: "1s" }}
        >
          🎓
        </div>
        <div
          className="absolute bottom-10 left-1/4 text-4xl animate-float"
          style={{ animationDelay: "2s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 right-1/3 text-5xl animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          📖
        </div>
      </div>

      <div className="relative z-10 py-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          {/* Left Section - User Info with Photo */}
          <div className="flex items-center space-x-6">
            {/* User Photo */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/Happy student-amico.svg"
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-4 border-white rounded-full animate-pulse"></div>
            </div>

            {/* User Details */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-purple-100 text-sm font-medium">
                  {greeting}
                </p>
                <span className="text-2xl animate-bounce">👋</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
                Welcome back, {name}!
              </h1>
              <p className="text-purple-100 text-lg">
                Ready to continue your learning journey?
              </p>
            </div>
          </div>

          {/* Right Section - Stats Grid */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {/* Study Streak */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-white/20">
              <div className="text-4xl lg:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-yellow-200 to-orange-300">
                {stats.studyStreak}
              </div>
              <div className="text-purple-100 text-xs lg:text-sm font-medium mb-1">
                Day Streak
              </div>
              <div className="text-2xl">🔥</div>
              <div className="mt-2 text-xs text-purple-200">Keep it up!</div>
            </div>

            {/* Active Courses */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-white/20">
              <div className="text-4xl lg:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-blue-200 to-cyan-300">
                {stats.coursesInProgress}
              </div>
              <div className="text-purple-100 text-xs lg:text-sm font-medium mb-1">
                Active Courses
              </div>
              <div className="text-2xl">📚</div>
              <div className="mt-2 text-xs text-purple-200">In progress</div>
            </div>

            {/* Average Grade */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-white/20">
              <div className="text-4xl lg:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-green-200 to-emerald-300">
                {stats.averageGrade}%
              </div>
              <div className="text-purple-100 text-xs lg:text-sm font-medium mb-1">
                Avg Grade
              </div>
              <div className="text-2xl">⭐</div>
              <div className="mt-2 text-xs text-purple-200">Excellent!</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
