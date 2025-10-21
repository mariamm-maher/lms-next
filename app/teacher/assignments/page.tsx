import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FileText, Plus, Calendar, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getTeacherAssignments(teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return [];

  const assignments = await prisma.assignment.findMany({
    where: { teacherId: teacherProfile.id },
    include: {
      course: true,
      submissions: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return assignments;
}

export default async function TeacherAssignmentsPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const assignments = await getTeacherAssignments(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Assignments
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage course assignments
          </p>
        </div>
        <Link
          href="/teacher/assignments/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Assignment</span>
        </Link>
      </div>

      {/* Assignments List */}
      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const totalSubmissions = assignment.submissions.length;
            const gradedSubmissions = assignment.submissions.filter(
              (s) => s.status === "GRADED"
            ).length;
            const pendingSubmissions = assignment.submissions.filter(
              (s) => s.status === "SUBMITTED"
            ).length;

            const isOverdue = new Date(assignment.dueDate) < new Date();

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {assignment.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {assignment.course.title}
                        </span>
                        {isOverdue && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">
                        {assignment.maxPoints} pts
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Total Submissions
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {totalSubmissions}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Pending
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        {pendingSubmissions}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Graded
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {gradedSubmissions}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/teacher/assignments/${assignment.id}/submissions`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-center font-medium"
                    >
                      View Submissions
                    </Link>
                    <Link
                      href={`/teacher/assignments/${assignment.id}/edit`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No assignments yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first assignment to assess student learning.
            </p>
            <Link
              href="/teacher/assignments/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Assignment</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
