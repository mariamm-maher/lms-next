import Image from "next/image";
import Card from "./Card";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

function FeatureCard({ icon, title, description, image }: FeatureProps) {
  return (
    <Card className="p-6 text-center h-full flex flex-col hover:shadow-xl transition-all duration-300">
      {image ? (
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 relative">
            <Image
              src={image}
              alt={title}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="text-5xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </Card>
  );
}

export default function Features() {
  const features = [
    {
      icon: "🚀",
      title: "Modern Interface",
      description:
        "Clean, intuitive design that makes learning and teaching enjoyable and efficient. Built with the latest technologies.",
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description:
        "Get personalized learning recommendations and instant help from our AI assistant. Smart learning at your fingertips.",
    },
    {
      icon: "📊",
      title: "Analytics",
      description:
        "Track progress, identify learning gaps, and optimize educational outcomes with detailed insights.",
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description:
        "Set and track learning goals with personalized milestones. Stay motivated with achievement badges.",
    },
    {
      icon: "💬",
      title: "Real-time Communication",
      description:
        "Connect with teachers and classmates instantly. Collaborate on projects and get quick answers.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Learn anywhere, anytime. Fully responsive design works seamlessly on all devices.",
    },
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Features
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose EduLearn?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of technology and education with
            features designed to enhance learning outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
