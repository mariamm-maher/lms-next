import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Debug logging
    console.log("Registration request:", { name, email, role });

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Validate role
    const validRoles = ["STUDENT", "TEACHER", "ADMIN"];
    const userRole = role && validRoles.includes(role) ? role : "STUDENT";

    console.log("Final role being saved:", userRole);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: userRole,
      },
    });

    console.log("User created with role:", user.role);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
