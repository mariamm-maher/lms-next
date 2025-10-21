import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

// GET /api/teacher/assignments - Get all assignments for the teacher
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    const assignments = await prisma.assignment.findMany({
      where: {
        teacherId: teacherProfile.id,
        ...(courseId && { courseId: parseInt(courseId) }),
      },
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

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/teacher/assignments - Create a new assignment
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

    const assignment = await prisma.assignment.create({
      data: {
        courseId: body.courseId,
        teacherId: teacherProfile.id,
        title: body.title,
        description: body.description,
        instructions: body.instructions,
        dueDate: new Date(body.dueDate),
        maxPoints: body.maxPoints || 100,
        attachments: body.attachments || [],
        allowLateSubmission: body.allowLateSubmission || false,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
