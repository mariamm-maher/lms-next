import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  User,
  Mail,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getStudentDetails(studentId: number, teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return null;

  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
    include: {
      user: true,
      enrollments: {
        where: {
          course: {
            teacherId: teacherProfile.id,
          },
        },
        include: {
          course: {
            include: {
              lessons: true,
            },
          },
        },
      },
      submissions: {
        where: {
          assignment: {
            teacherId: teacherProfile.id,
          },
        },
        include: {
          assignment: {
            include: {
              course: true,
            },
          },
        },
        orderBy: {
          submittedAt: "desc",
        },
      },
      quizAttempts: {
        where: {
          quiz: {
            teacherId: teacherProfile.id,
          },
        },
        include: {
          quiz: {
            include: {
              course: true,
            },
          },
        },
        orderBy: {
          attemptedAt: "desc",
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
  });

  return student;
}

export default async function StudentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const studentId = parseInt(params.id);

  const student = await getStudentDetails(studentId, userId);

  if (!student) {
    notFound();
  }

  // Calculate stats
  const totalEnrollments = student.enrollments.length;
  const completedLessons = student.progress.filter((p) => p.isCompleted).length;
  const totalLessons = student.enrollments.reduce(
    (sum, e) => sum + e.course.lessons.length,
    0
  );
  const overallProgress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const gradedSubmissions = student.submissions.filter((s) => s.grade !== null);
  const averageGrade =
    gradedSubmissions.length > 0
      ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) /
        gradedSubmissions.length
      : 0;

  const quizAverage =
    student.quizAttempts.length > 0
      ? student.quizAttempts.reduce((sum, a) => sum + a.score, 0) /
        student.quizAttempts.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/teacher/students"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Student Profile
          </h1>
          <p className="text-gray-600 mt-1">Detailed performance overview</p>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
            {student.photoUrl ? (
              <img
                src={student.photoUrl}
                alt={student.user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {student.user.name}
            </h2>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{student.user.email}</span>
              </div>
              {student.level && (
                <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {student.level}
                </div>
              )}
            </div>
            {student.bio && <p className="text-gray-700 mb-3">{student.bio}</p>}
            {student.interests && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Interests:</p>
                <p className="text-gray-900">{student.interests}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
          <p className="text-sm text-gray-600">Enrolled Courses</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overallProgress.toFixed(0)}%
          </p>
          <p className="text-sm text-gray-600">Overall Progress</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {averageGrade.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Assignment Avg</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {quizAverage.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Quiz Average</p>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Course Progress
        </h2>
        {student.enrollments.length > 0 ? (
          <div className="space-y-4">
            {student.enrollments.map((enrollment) => {
              const completedInCourse = student.progress.filter(
                (p) =>
                  p.isCompleted &&
                  enrollment.course.lessons.some((l) => l.id === p.lessonId)
              ).length;

              return (
                <div
                  key={enrollment.id}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {enrollment.course.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        enrollment.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : enrollment.status === "ACTIVE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {completedInCourse}/{enrollment.course.lessons.length}{" "}
                        lessons completed
                      </span>
                      <span className="font-semibold text-indigo-600">
                        {enrollment.progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Enrolled:{" "}
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Not enrolled in any of your courses
          </p>
        )}
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Submissions
        </h2>
        {student.submissions.length > 0 ? (
          <div className="space-y-3">
            {student.submissions.slice(0, 5).map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {submission.assignment.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {submission.assignment.course.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted:{" "}
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  {submission.grade !== null ? (
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {submission.grade}%
                      </p>
                      <p className="text-xs text-gray-500">Graded</p>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No submissions yet</p>
        )}
      </div>

      {/* Quiz Attempts */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz Attempts</h2>
        {student.quizAttempts.length > 0 ? (
          <div className="space-y-3">
            {student.quizAttempts.slice(0, 5).map((attempt) => (
              <div
                key={attempt.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {attempt.quiz.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {attempt.quiz.course.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Attempted:{" "}
                    {new Date(attempt.attemptedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-2xl font-bold ${
                      attempt.score >= attempt.quiz.passingScore
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {attempt.score.toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {attempt.score >= attempt.quiz.passingScore
                      ? "Passed"
                      : "Failed"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No quiz attempts yet</p>
        )}
      </div>
    </div>
  );
}
