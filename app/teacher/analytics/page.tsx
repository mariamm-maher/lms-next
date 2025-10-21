import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getAnalyticsData(teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
    include: {
      courses: {
        include: {
          enrollments: true,
          reviews: true,
        },
      },
    },
  });

  if (!teacherProfile) {
    return {
      totalEnrollments: 0,
      completionRate: 0,
      averageRating: 0,
      totalRevenue: 0,
      courseStats: [],
    };
  }

  const totalEnrollments = teacherProfile.courses.reduce(
    (sum, course) => sum + course.enrollments.length,
    0
  );

  const completedEnrollments = teacherProfile.courses.reduce(
    (sum, course) =>
      sum + course.enrollments.filter((e) => e.status === "COMPLETED").length,
    0
  );

  const completionRate =
    totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;

  const allReviews = teacherProfile.courses.flatMap((course) => course.reviews);
  const averageRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

  const payments = await prisma.payment.findMany({
    where: {
      status: "COMPLETED",
      courseId: {
        in: teacherProfile.courses.map((c) => c.id),
      },
    },
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const courseStats = teacherProfile.courses.map((course) => ({
    id: course.id,
    title: course.title,
    enrollments: course.enrollments.length,
    completionRate:
      course.enrollments.length > 0
        ? (course.enrollments.filter((e) => e.status === "COMPLETED").length /
            course.enrollments.length) *
          100
        : 0,
    averageRating:
      course.reviews.length > 0
        ? course.reviews.reduce((sum, r) => sum + r.rating, 0) /
          course.reviews.length
        : 0,
  }));

  return {
    totalEnrollments,
    completionRate,
    averageRating,
    totalRevenue,
    courseStats,
  };
}

export default async function TeacherAnalyticsPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const analytics = await getAnalyticsData(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Track your teaching performance and student engagement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics.totalEnrollments}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics.completionRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Average Rating</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics.averageRating.toFixed(1)} / 5
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">
            ${analytics.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Course Performance
        </h2>
        {analytics.courseStats.length > 0 ? (
          <div className="space-y-4">
            {analytics.courseStats.map((course) => (
              <div
                key={course.id}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      {course.enrollments} students
                    </span>
                    <span className="text-yellow-600 font-semibold">
                      ⭐ {course.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-indigo-600">
                      {course.completionRate.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No course data available
          </p>
        )}
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Weekly Active Students
          </h2>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-gray-500">
              Chart placeholder - integrate with recharts
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Revenue by Month
          </h2>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <p className="text-gray-500">
              Chart placeholder - integrate with recharts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
