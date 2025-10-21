import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// POST /api/teacher/profile/setup - Create teacher profile if it doesn't exist
export async function POST() {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized - Must be a teacher' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Check if teacher profile already exists
    const existingProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return NextResponse.json({ 
        message: 'Teacher profile already exists',
        profile: existingProfile 
      });
    }

    // Create teacher profile
    const teacherProfile = await prisma.teacherProfile.create({
      data: {
        userId,
        bio: '',
        expertise: '',
        yearsOfExperience: 0,
      },
    });

    return NextResponse.json({ 
      message: 'Teacher profile created successfully',
      profile: teacherProfile 
    }, { status: 201 });
  } catch (error) {
    console.error('Error setting up teacher profile:', error);
    return NextResponse.json({ error: 'Failed to setup teacher profile' }, { status: 500 });
  }
}

// GET /api/teacher/profile/setup - Check if teacher profile exists
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!teacherProfile) {
      return NextResponse.json({ 
        exists: false,
        message: 'Teacher profile not found. Please create one.' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      exists: true,
      profile: teacherProfile 
    });
  } catch (error) {
    console.error('Error checking teacher profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
