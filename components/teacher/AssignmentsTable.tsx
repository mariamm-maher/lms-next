'use client';

import { SubmissionWithStudent } from '@/types/teacher';
import { User, Calendar, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AssignmentsTableProps {
  submissions: SubmissionWithStudent[];
}

export default function AssignmentsTable({ submissions }: AssignmentsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'GRADED':
        return 'bg-green-100 text-green-700';
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-700';
      case 'LATE':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Student
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Assignment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Submitted
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Grade
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {submission.studentPhoto ? (
                        <img
                          src={submission.studentPhoto}
                          alt={submission.studentName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {submission.studentName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {submission.studentEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="text-gray-900">
                      {submission.assignmentTitle}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      submission.status
                    )}`}
                  >
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {submission.grade !== null && submission.grade !== undefined ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-gray-900">
                        {submission.grade}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not graded</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/teacher/assignments/submissions/${submission.id}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    {submission.status === 'GRADED' ? 'View' : 'Grade'} →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
