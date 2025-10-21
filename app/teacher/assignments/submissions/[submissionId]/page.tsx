import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, User, Calendar, FileText, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import GradeSubmissionForm from "@/components/teacher/GradeSubmissionForm";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getSubmissionDetails(submissionId: number, teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return null;

  const submission = await prisma.assignmentSubmission.findFirst({
    where: {
      id: submissionId,
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
      student: {
        include: {
          user: true,
        },
      },
    },
  });

  return submission;
}

export default async function GradeSubmissionPage({
  params,
}: {
  params: { submissionId: string };
}) {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const submissionId = parseInt(params.submissionId);

  const submission = await getSubmissionDetails(submissionId, userId);

  if (!submission) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GRADED":
        return "bg-green-100 text-green-700";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-700";
      case "LATE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/teacher/assignments"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Grade Submission
          </h1>
          <p className="text-gray-600 mt-1">{submission.assignment.title}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
            submission.status
          )}`}
        >
          {submission.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Submission Content
            </h2>

            {submission.content ? (
              <div className="prose max-w-none">
                <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {submission.content}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No text content submitted</p>
            )}

            {/* Attachments */}
            {submission.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Attachments ({submission.attachments.length})
                </h3>
                <div className="space-y-2">
                  {submission.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg hover:shadow-md transition-all"
                    >
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <span className="flex-1 text-sm text-gray-900 truncate">
                        {attachment}
                      </span>
                      <Download className="w-4 h-4 text-indigo-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Grade & Feedback */}
          {submission.status === "GRADED" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Current Grade
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grade</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {submission.grade}%
                  </p>
                </div>
                {submission.feedback && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Feedback</p>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {submission.feedback}
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  Graded on: {new Date(submission.gradedAt!).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Grade Form */}
          <GradeSubmissionForm
            submissionId={submission.id}
            currentGrade={submission.grade || undefined}
            currentFeedback={submission.feedback || undefined}
            maxPoints={submission.assignment.maxPoints}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Student Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {submission.student.photoUrl ? (
                    <img
                      src={submission.student.photoUrl}
                      alt={submission.student.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {submission.student.user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {submission.student.user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Assignment Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-semibold text-gray-900">
                  {submission.assignment.course.title}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="font-semibold text-gray-900">
                    {new Date(submission.assignment.dueDate).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="font-semibold text-gray-900">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Maximum Points</p>
                <p className="font-semibold text-gray-900">
                  {submission.assignment.maxPoints}
                </p>
              </div>
            </div>
          </div>

          {/* Assignment Instructions */}
          {submission.assignment.instructions && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Instructions
              </h2>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {submission.assignment.instructions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
