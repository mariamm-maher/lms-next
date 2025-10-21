"use client";

import Link from "next/link";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface RecommendedCourse {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  students: number;
  thumbnail: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  description: string;
  tags: string[];
}

interface RecommendedCoursesProps {
  recommendedCourses: RecommendedCourse[];
}

export default function RecommendedCourses({
  recommendedCourses,
}: RecommendedCoursesProps) {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 mb-2">
            <span>✨</span>
            <span>Recommended for You</span>
          </h2>
          <p className="text-sm text-gray-600">
            Based on your interests and learning goals
          </p>
        </div>
        <Link href="/student/explore-courses">
          <Button variant="primary" size="sm">
            Explore More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start space-x-4 mb-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                {course.thumbnail}
              </div>

              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {course.level}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-purple-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="text-base">{course.instructorAvatar}</span>
                  <span className="truncate">{course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats & Price */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>👥</span>
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-600">
                  ${course.price}
                </span>
              </div>
            </div>

            {/* Enroll Button */}
            <Link href="/student/explore-courses">
              <Button
                variant="primary"
                className="w-full mt-4 shadow-lg hover:shadow-xl"
              >
                Enroll Now
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* View More Link */}
      <div className="text-center mt-6">
        <Link href="/student/explore-courses">
          <Button
            variant="outline"
            size="sm"
            className="bg-white hover:bg-purple-50"
          >
            View All Recommended Courses ({recommendedCourses.length}+)
          </Button>
        </Link>
      </div>
    </Card>
  );
}
