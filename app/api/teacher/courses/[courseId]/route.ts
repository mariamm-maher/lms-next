import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/teacher/courses/[courseId] - Get a single course
export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = parseInt(params.courseId);
    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacherProfile.id,
      },
      include: {
        lessons: true,
        enrollments: true,
        reviews: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/teacher/courses/[courseId] - Update a course
export async function PUT(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = parseInt(params.courseId);
    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    // Verify ownership
    const existingCourse = await prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacherProfile.id,
      },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const body = await request.json();

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        category: body.category,
        level: body.level,
        duration: body.duration,
        thumbnail: body.thumbnail,
        videoUrl: body.videoUrl,
        language: body.language,
        tags: body.tags,
        requirements: body.requirements,
        objectives: body.objectives,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/teacher/courses/[courseId] - Delete a course
export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = parseInt(params.courseId);
    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });
    }

    // Verify ownership
    const existingCourse = await prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacherProfile.id,
      },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
