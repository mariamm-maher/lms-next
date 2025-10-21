import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

// POST /api/teacher/lessons - Create a new lesson
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Verify course ownership
    const course = await prisma.course.findFirst({
      where: {
        id: body.courseId,
        teacherId: teacherProfile.id,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const lesson = await prisma.lesson.create({
      data: {
        courseId: body.courseId,
        title: body.title,
        description: body.description,
        content: body.content,
        videoUrl: body.videoUrl,
        duration: body.duration,
        orderIndex: body.orderIndex,
        resources: body.resources || [],
        isPublished: body.isPublished || false,
      },
    });

    // Update course total lessons count
    await prisma.course.update({
      where: { id: body.courseId },
      data: {
        totalLessons: {
          increment: 1,
        },
        totalDuration: {
          increment: body.duration || 0,
        },
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
