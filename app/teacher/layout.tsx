import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect teacher routes - only allow TEACHER role
  if (!session || session.user?.role !== "TEACHER") {
    redirect("/login");
  }

  // Auto-create teacher profile if it doesn't exist
  const userId = parseInt(session.user.id);
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId },
  });

  if (!teacherProfile) {
    // Create teacher profile automatically
    await prisma.teacherProfile.create({
      data: {
        userId,
        bio: "",
        expertise: "",
        yearsOfExperience: 0,
      },
    });
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <TeacherSidebar />
      <main className="flex-1 overflow-auto relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
