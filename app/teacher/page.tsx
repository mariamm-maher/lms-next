import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import DashboardStats from '@/components/teacher/DashboardStats';
import { DashboardStatsData } from '@/types/teacher';
import { BookOpen, FileText, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import DashboardHeader from '@/components/teacher/DashboardHeader';

async function getRecentSubmissions(teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return [];

  const submissions = await prisma.assignmentSubmission.findMany({
    where: {
      assignment: {
        teacherId: teacherProfile.id,
      },
      status: 'SUBMITTED',
    },
    include: {
      assignment: true,
      student: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      submittedAt: 'desc',
    },
    take: 5,
  });

  return submissions;
}

async function getDashboardStats(teacherId: number): Promise<DashboardStatsData> {
  // Get teacher profile
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
    include: {
      courses: {
        include: {
          enrollments: true,
          reviews: true,
        },
      },
      assignments: {
        include: {
          submissions: true,
        },
      },
    },
  });

  if (!teacherProfile) {
    return {
      totalStudents: 0,
      activeCourses: 0,
      totalRevenue: 0,
      averageGrade: 0,
      pendingSubmissions: 0,
      completionRate: 0,
    };
  }

  const totalStudents = await prisma.enrollment.count({
    where: {
      course: {
        teacherId: teacherProfile.id,
      },
    },
  });

  const activeCourses = teacherProfile.courses.filter((c) => c.isPublished).length;

  const payments = await prisma.payment.findMany({
    where: {
      status: 'COMPLETED',
      courseId: {
        in: teacherProfile.courses.map((c) => c.id),
      },
    },
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const allSubmissions = teacherProfile.assignments.flatMap((a) => a.submissions);
  const gradedSubmissions = allSubmissions.filter((s) => s.grade !== null);
  const averageGrade =
    gradedSubmissions.length > 0
      ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) /
        gradedSubmissions.length
      : 0;

  const pendingSubmissions = allSubmissions.filter((s) => s.status === 'SUBMITTED').length;

  const completedEnrollments = await prisma.enrollment.count({
    where: {
      course: {
        teacherId: teacherProfile.id,
      },
      status: 'COMPLETED',
    },
  });

  const completionRate =
    totalStudents > 0 ? (completedEnrollments / totalStudents) * 100 : 0;

  return {
    totalStudents,
    activeCourses,
    totalRevenue,
    averageGrade,
    pendingSubmissions,
    completionRate,
  };
}

export default async function TeacherDashboard() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || '0');

  const stats = await getDashboardStats(userId);
  const recentSubmissions = await getRecentSubmissions(userId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Quick Actions - Control Hub */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Quick Actions
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/teacher/courses/add"
              className="group relative bg-white/80 backdrop-blur-md rounded-xl p-5 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 border border-indigo-100 hover:border-indigo-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Add Course</p>
                  <p className="text-xs text-gray-600">Create new course</p>
                </div>
              </div>
            </Link>

            <Link
              href="/teacher/assignments"
              className="group relative bg-white/80 backdrop-blur-md rounded-xl p-5 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-green-100 hover:border-green-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Assignments</p>
                  <p className="text-xs text-gray-600">Manage & grade</p>
                </div>
              </div>
            </Link>

            <Link
              href="/teacher/students"
              className="group relative bg-white/80 backdrop-blur-md rounded-xl p-5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-blue-100 hover:border-blue-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Students</p>
                  <p className="text-xs text-gray-600">View progress</p>
                </div>
              </div>
            </Link>

            <Link
              href="/teacher/analytics"
              className="group relative bg-white/80 backdrop-blur-md rounded-xl p-5 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border border-orange-100 hover:border-orange-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Analytics</p>
                  <p className="text-xs text-gray-600">View insights</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Recent Submissions
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          
          {recentSubmissions.length > 0 ? (
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <div
                  key={submission.id}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border border-gray-200/50 hover:border-purple-300/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Student Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {submission.student.user.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 mb-1">
                          {submission.student.user.name}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {submission.assignment.title}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </div>
                      
                      <Link
                        href={`/teacher/assignments/submissions/${submission.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg font-medium text-sm group-hover:scale-105"
                      >
                        Grade →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No pending submissions</p>
              <p className="text-sm text-gray-400 mt-1">All caught up! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
