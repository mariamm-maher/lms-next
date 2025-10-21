import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/teacher/courses - Get all courses for the logged-in teacher
export async function GET() {
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

    const courses = await prisma.course.findMany({
      where: { teacherId: teacherProfile.id },
      include: {
        enrollments: true,
        reviews: true,
        lessons: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const coursesWithStats = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      level: course.level,
      thumbnail: course.thumbnail,
      isPublished: course.isPublished,
      totalLessons: course.lessons.length,
      totalDuration: course.totalDuration,
      enrollmentCount: course.enrollments.length,
      averageRating:
        course.reviews.length > 0
          ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length
          : 0,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    }));

    return NextResponse.json(coursesWithStats);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/teacher/courses - Create a new course
export async function POST(request: Request) {
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

    const body = await request.json();

    const course = await prisma.course.create({
      data: {
        teacherId: teacherProfile.id,
        title: body.title,
        description: body.description,
        price: body.price || 0,
        category: body.category,
        level: body.level,
        duration: body.duration,
        thumbnail: body.thumbnail,
        videoUrl: body.videoUrl,
        language: body.language || 'English',
        tags: body.tags || [],
        requirements: body.requirements || [],
        objectives: body.objectives || [],
        isPublished: body.isPublished || false,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
