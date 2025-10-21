"use client";

import Link from "next/link";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface Course {
  id: number;
  title: string;
  teacher: string;
  teacherAvatar: string;
  progress: number;
  lastLesson: string;
  nextLesson: string;
  thumbnail: string;
}

interface ContinueLearningProps {
  currentCourse: Course;
}

export default function ContinueLearning({
  currentCourse,
}: ContinueLearningProps) {
  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
            {currentCourse.thumbnail}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <span>Continue Learning</span>
              <span className="text-sm">📚</span>
            </h2>
            <p className="text-sm text-gray-600">Pick up where you left off</p>
          </div>
        </div>
        <Link href="/student/explore-courses">
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:text-purple-700"
          >
            View All Courses →
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {currentCourse.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <span className="text-lg">{currentCourse.teacherAvatar}</span>
              <span>with {currentCourse.teacher}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>📖</span>
                <span>Last: {currentCourse.lastLesson}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>▶️</span>
                <span>Next: {currentCourse.nextLesson}</span>
              </div>
            </div>
          </div>
          <Link href="/student/explore-courses">
            <Button variant="primary" className="shadow-lg hover:shadow-xl">
              Continue Course
            </Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Course Progress</span>
            <span className="font-bold text-purple-600">
              {currentCourse.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${currentCourse.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {Math.round((100 - currentCourse.progress) / 10)} lessons remaining
          </p>
        </div>
      </div>
    </Card>
  );
}
