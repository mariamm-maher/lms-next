import Link from "next/link";
import Button from "./Button";
import Card from "./Card";

interface PortalCardProps {
  title: string;
  description: string;
  icon: string;
  features: { icon: string; text: string }[];
  href: string;
  variant: "primary" | "secondary";
  illustration: string;
}

function PortalCard({
  title,
  description,
  icon,
  features,
  href,
  variant,
  illustration,
}: PortalCardProps) {
  return (
    <Card hover className="p-8 text-center h-full flex flex-col">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-2 text-sm text-gray-600"
          >
            <span>{feature.icon}</span>
            <span>{feature.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Link href={href}>
          <Button variant={variant} className="w-full">
            Enter {title}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default function PortalSelection() {
  const studentFeatures = [
    { icon: "📚", text: "Browse Courses & Teachers" },
    { icon: "📝", text: "Take Exams & Quizzes" },
    { icon: "🤖", text: "AI Learning Assistant" },
  ];

  const teacherFeatures = [
    { icon: "👥", text: "Track Student Progress" },
    { icon: "📋", text: "Manage Assignments" },
    { icon: "📊", text: "Analytics & Insights" },
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Portal
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the portal that matches your role and start your learning
            journey today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PortalCard
            title="Student Portal"
            description="Access your courses, take exams, connect with teachers, and get AI-powered learning assistance."
            icon="👨‍🎓"
            features={studentFeatures}
            href="/student"
            variant="primary"
            illustration="Happy student-amico.svg"
          />

          <PortalCard
            title="Teacher Portal"
            description="Manage your students, create courses, upload materials, and track learning progress."
            icon="👨‍🏫"
            features={teacherFeatures}
            href="/teacher"
            variant="secondary"
            illustration="Teacher-amico.svg"
          />
        </div>
      </div>
    </div>
  );
}
