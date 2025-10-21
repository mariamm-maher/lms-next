import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

// GET /api/courses → Get all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: { teacher: true, lessons: true },
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST /api/courses → Create a new course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      teacherId,
      thumbnail,
      price,
      category,
      level,
      duration,
      videoUrl,
      language,
      tags,
      requirements,
      objectives,
      isPublished,
    } = body;

    if (!title || !teacherId)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const newCourse = await prisma.course.create({
      data: {
        teacherId,
        title,
        description,
        price: price || 0,
        category,
        level,
        duration,
        thumbnail,
        videoUrl,
        language: language || "English",
        tags: tags || [],
        requirements: requirements || [],
        objectives: objectives || [],
        isPublished: isPublished || false,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
