import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ClipboardList, Plus, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

async function getTeacherQuizzes(teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) return [];

  const quizzes = await prisma.quiz.findMany({
    where: { teacherId: teacherProfile.id },
    include: {
      course: true,
      attempts: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      },
      questions: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return quizzes;
}

export default async function TeacherQuizzesPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || '0');
  const quizzes = await getTeacherQuizzes(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Quizzes
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage course quizzes
          </p>
        </div>
        <Link
          href="/teacher/quizzes/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Quiz</span>
        </Link>
      </div>

      {/* Quizzes Grid */}
      {quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const totalAttempts = quiz.attempts.length;
            const passedAttempts = quiz.attempts.filter(
              (a) => a.score >= quiz.passingScore
            ).length;
            const averageScore =
              totalAttempts > 0
                ? quiz.attempts.reduce((sum, a) => sum + a.score, 0) /
                  totalAttempts
                : 0;

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-indigo-600">
                      {quiz.questions.length} questions
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {quiz.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {quiz.course.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-2xl font-bold text-blue-600">
                        {totalAttempts}
                      </p>
                      <p className="text-xs text-gray-600">Attempts</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <BarChart className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <p className="text-2xl font-bold text-green-600">
                        {averageScore.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-600">Avg Score</p>
                    </div>
                  </div>

                  {/* Pass Rate */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Pass Rate</span>
                      <span className="font-semibold text-indigo-600">
                        {totalAttempts > 0
                          ? ((passedAttempts / totalAttempts) * 100).toFixed(0)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            totalAttempts > 0
                              ? (passedAttempts / totalAttempts) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    href={`/teacher/quizzes/${quiz.id}`}
                    className="block w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-center font-medium"
                  >
                    View Results
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first quiz to test student knowledge.
            </p>
            <Link
              href="/teacher/quizzes/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Quiz</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
