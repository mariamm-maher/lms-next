import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import CourseCard from '@/components/teacher/CourseCard';
import { TeacherCourse } from '@/types/teacher';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

async function getTeacherCourses(teacherId: number): Promise<TeacherCourse[]> {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return [];

  const courses = await prisma.course.findMany({
    where: { teacherId: teacherProfile.id },
    include: {
      enrollments: true,
      reviews: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    level: course.level,
    thumbnail: course.thumbnail,
    isPublished: course.isPublished,
    totalLessons: course.totalLessons,
    totalDuration: course.totalDuration,
    enrollmentCount: course.enrollments.length,
    averageRating:
      course.reviews.length > 0
        ? course.reviews.reduce((sum, r) => sum + r.rating, 0) /
          course.reviews.length
        : 0,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  }));
}

export default async function TeacherCoursesPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || '0');
  const courses = await getTeacherCourses(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and create your courses
          </p>
        </div>
        <Link
          href="/teacher/courses/add"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Course</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start creating your first course to share your knowledge with students.
            </p>
            <Link
              href="/teacher/courses/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Your First Course</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
