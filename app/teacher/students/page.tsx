import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { StudentProgress } from "@/types/teacher";
import { Search, User, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getStudentProgress(
  teacherId: number
): Promise<StudentProgress[]> {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return [];

  const enrollments = await prisma.enrollment.findMany({
    where: {
      course: {
        teacherId: teacherProfile.id,
      },
    },
    include: {
      student: {
        include: {
          user: true,
          submissions: {
            where: {
              assignment: {
                teacherId: teacherProfile.id,
              },
              grade: { not: null },
            },
          },
          progress: {
            where: {
              lesson: {
                course: {
                  teacherId: teacherProfile.id,
                },
              },
            },
          },
        },
      },
      course: {
        include: {
          lessons: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return enrollments.map((enrollment) => {
    const completedLessons = enrollment.student.progress.filter(
      (p) => p.isCompleted
    ).length;

    const averageGrade =
      enrollment.student.submissions.length > 0
        ? enrollment.student.submissions.reduce(
            (sum, s) => sum + (s.grade || 0),
            0
          ) / enrollment.student.submissions.length
        : undefined;

    return {
      id: enrollment.id,
      studentId: enrollment.student.id,
      studentName: enrollment.student.user.name,
      studentEmail: enrollment.student.user.email,
      studentPhoto: enrollment.student.photoUrl || undefined,
      courseId: enrollment.course.id,
      courseName: enrollment.course.title,
      progress: enrollment.progress,
      enrolledAt: enrollment.createdAt.toISOString(),
      completedLessons,
      totalLessons: enrollment.course.lessons.length,
      averageGrade,
    };
  });
}

export default async function TeacherStudentsPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const students = await getStudentProgress(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Students
        </h1>
        <p className="text-gray-600 mt-1">
          Track student progress across your courses
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="all">All Courses</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      {students.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Avg Grade
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Enrolled
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.studentPhoto ? (
                            <img
                              src={student.studentPhoto}
                              alt={student.studentName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {student.studentName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.studentEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                        <span className="text-gray-900">
                          {student.courseName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {student.completedLessons}/{student.totalLessons}{" "}
                            lessons
                          </span>
                          <span className="font-semibold text-indigo-600">
                            {student.progress.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {student.averageGrade !== undefined ? (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-gray-900">
                            {student.averageGrade.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(student.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/teacher/students/${student.studentId}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No students yet
            </h3>
            <p className="text-gray-600">
              Students will appear here once they enroll in your courses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
