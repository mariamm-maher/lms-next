import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/courses/:id → Get a specific course
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(params.id) },
      include: { teacher: true, lessons: true },
    });

    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 });

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

// PUT /api/courses/:id → Update a course
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, imageUrl } = body;

    const updatedCourse = await prisma.course.update({
      where: { id: Number(params.id) },
      data: { title, description, imageUrl },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/:id → Delete a course
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
