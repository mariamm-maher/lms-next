import { NextRequest, NextResponse } from "next/server";
import {
  requireAuth,
  AuthenticationError,
  AuthorizationError,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

// GET /api/profile - Get user profile (authenticated users only)
export async function GET(request: NextRequest) {
  try {
    // Require authentication (any authenticated user can access their profile)
    const user = await requireAuth(request);

    // Get full profile data including relationships
    const fullProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        studentProfile: true,
        teacherProfile: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnail: true,
                level: true,
                status: true,
              },
            },
          },
        },
        teacherCourses: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            level: true,
            status: true,
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        },
      },
    });

    if (!fullProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password: _, ...profileWithoutPassword } = fullProfile;

    return NextResponse.json({
      success: true,
      profile: profileWithoutPassword,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);

    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update user profile (authenticated users only)
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();

    const { name, studentProfile, teacherProfile } = body;

    // Update user and profile based on role
    const updateData: any = {};

    if (name) {
      updateData.name = name;
    }

    // Update student profile if user is a student
    if (user.role === "STUDENT" && studentProfile) {
      updateData.studentProfile = {
        upsert: {
          create: studentProfile,
          update: studentProfile,
        },
      };
    }

    // Update teacher profile if user is a teacher
    if (user.role === "TEACHER" && teacherProfile) {
      updateData.teacherProfile = {
        upsert: {
          create: teacherProfile,
          update: teacherProfile,
        },
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
