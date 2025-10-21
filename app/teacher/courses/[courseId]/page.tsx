import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { BookOpen, Users, Clock, DollarSign, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCourseDetails(courseId: number, teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return null;

  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      teacherId: teacherProfile.id,
    },
    include: {
      lessons: {
        orderBy: { orderIndex: 'asc' },
      },
      enrollments: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      },
      assignments: true,
      quizzes: true,
      reviews: true,
    },
  });

  return course;
}

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await auth();
  const userId = parseInt(session?.user?.id || '0');
  const courseId = parseInt(params.courseId);

  const course = await getCourseDetails(courseId, userId);

  if (!course) {
    notFound();
  }

  const averageRating =
    course.reviews.length > 0
      ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {course.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.isPublished
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {course.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
          <p className="text-gray-600">{course.description}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/teacher/courses/${courseId}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {course.enrollments.length}
          </p>
          <p className="text-sm text-gray-600">Students Enrolled</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {course.lessons.length}
          </p>
          <p className="text-sm text-gray-600">Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {course.totalDuration || 0} min
          </p>
          <p className="text-sm text-gray-600">Total Duration</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${course.price}</p>
          <p className="text-sm text-gray-600">Price</p>
        </div>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Lessons */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Lessons</h2>
              <Link
                href={`/teacher/courses/${courseId}/lessons/add`}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lesson</span>
              </Link>
            </div>

            {course.lessons.length > 0 ? (
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {lesson.duration ? `${lesson.duration} min` : 'No duration set'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          lesson.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {lesson.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No lessons yet</p>
                <Link
                  href={`/teacher/courses/${courseId}/lessons/add`}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Lesson</span>
                </Link>
              </div>
            )}
          </div>

          {/* Enrolled Students */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Enrolled Students
            </h2>
            {course.enrollments.length > 0 ? (
              <div className="space-y-3">
                {course.enrollments.slice(0, 5).map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {enrollment.student.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {enrollment.student.user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Progress: {enrollment.progress.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        enrollment.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </div>
                ))}
                {course.enrollments.length > 5 && (
                  <p className="text-center text-sm text-gray-600 pt-2">
                    And {course.enrollments.length - 5} more students...
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No students enrolled yet
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Course Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900">
                  {course.category || 'Uncategorized'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-semibold text-gray-900">
                  {course.level || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Language</p>
                <p className="font-semibold text-gray-900">{course.language}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">
                  {course.duration || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="font-semibold text-gray-900">
                  ⭐ {averageRating.toFixed(1)} ({course.reviews.length} reviews)
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href={`/teacher/assignments`}
                className="block w-full px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 rounded-lg hover:shadow-md transition-all text-center font-medium"
              >
                Create Assignment
              </Link>
              <Link
                href={`/teacher/quizzes/create`}
                className="block w-full px-4 py-2 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:shadow-md transition-all text-center font-medium"
              >
                Create Quiz
              </Link>
              <Link
                href={`/teacher/courses/${courseId}/lessons/add`}
                className="block w-full px-4 py-2 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 rounded-lg hover:shadow-md transition-all text-center font-medium"
              >
                Add Lesson
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
