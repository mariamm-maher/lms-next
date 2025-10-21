import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/teacher/submissions - Get all submissions for the teacher
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');

    const submissions = await prisma.assignmentSubmission.findMany({
      where: {
        assignment: {
          teacherId: teacherProfile.id,
        },
        ...(assignmentId && { assignmentId: parseInt(assignmentId) }),
      },
      include: {
        assignment: true,
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    const submissionsWithDetails = submissions.map((submission) => ({
      id: submission.id,
      assignmentId: submission.assignmentId,
      assignmentTitle: submission.assignment.title,
      studentId: submission.studentId,
      studentName: submission.student.user.name,
      studentEmail: submission.student.user.email,
      studentPhoto: submission.student.photoUrl,
      content: submission.content,
      attachments: submission.attachments,
      status: submission.status,
      grade: submission.grade,
      feedback: submission.feedback,
      submittedAt: submission.submittedAt.toISOString(),
      gradedAt: submission.gradedAt?.toISOString(),
    }));

    return NextResponse.json(submissionsWithDetails);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
