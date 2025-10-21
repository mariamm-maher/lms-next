import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// PUT /api/teacher/submissions/[submissionId] - Grade a submission
export async function PUT(
  request: Request,
  { params }: { params: { submissionId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const submissionId = parseInt(params.submissionId);
    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    // Verify submission belongs to teacher's assignment
    const submission = await prisma.assignmentSubmission.findFirst({
      where: {
        id: submissionId,
        assignment: {
          teacherId: teacherProfile.id,
        },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const body = await request.json();

    const updatedSubmission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        grade: body.grade,
        feedback: body.feedback,
        status: 'GRADED',
        gradedAt: new Date(),
      },
    });

    return NextResponse.json(updatedSubmission);
  } catch (error) {
    console.error('Error grading submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
