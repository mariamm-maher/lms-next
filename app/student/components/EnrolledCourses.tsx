"use client";

import Link from "next/link";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface EnrolledCourse {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  progress: number;
  thumbnail: string;
  category: string;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  dueDate: string;
}

interface EnrolledCoursesProps {
  enrolledCourses: EnrolledCourse[];
}

export default function EnrolledCourses({
  enrolledCourses,
}: EnrolledCoursesProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <span>📚</span>
          <span>My Enrolled Courses</span>
          <span className="text-sm font-normal text-gray-500">
            ({enrolledCourses.length} courses)
          </span>
        </h2>
        <Link href="/student/explore-courses">
          <Button variant="outline" size="sm">
            View All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-purple-300 rounded-xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform">
                {course.thumbnail}
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Due{" "}
                  {new Date(course.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {course.title}
            </h3>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <span className="text-lg">{course.instructorAvatar}</span>
              <span className="truncate">{course.instructor}</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>
                  {course.completedLessons} / {course.totalLessons} lessons
                </span>
                <span className="font-bold text-purple-600">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Next Lesson */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mb-4">
              <p className="text-xs text-purple-600 font-medium mb-1">
                Next Lesson:
              </p>
              <p className="text-sm text-gray-800 font-medium line-clamp-1">
                {course.nextLesson}
              </p>
            </div>

            {/* Action Button */}
            <Link href="/student/explore-courses">
              <Button variant="primary" size="sm" className="w-full">
                Continue Learning
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
