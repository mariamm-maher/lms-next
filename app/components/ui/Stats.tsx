import Card from "./Card";

interface StatItemProps {
  value: string;
  label: string;
  icon: string;
  color: string;
}

function StatItem({ value, label, icon, color }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>
        {value}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      value: "5,000+",
      label: "Active Students",
      icon: "👨‍🎓",
      color: "text-blue-600",
    },
    {
      value: "200+",
      label: "Expert Teachers",
      icon: "👨‍🏫",
      color: "text-purple-600",
    },
    {
      value: "500+",
      label: "Courses Available",
      icon: "📚",
      color: "text-indigo-600",
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: "⭐",
      color: "text-green-600",
    },
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <Card className="p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              Join our growing community of learners and educators
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
