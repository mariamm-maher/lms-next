import Image from "next/image";
import Card from "./Card";

interface TestimonialProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

function TestimonialCard({
  name,
  role,
  avatar,
  quote,
  rating,
}: TestimonialProps) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            ⭐
          </span>
        ))}
      </div>

      <p className="text-gray-600 italic mb-6 flex-grow">"{quote}"</p>

      <div className="flex items-center space-x-3">
        <div className="text-3xl">{avatar}</div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      avatar: "👩‍🎓",
      quote:
        "EduLearn transformed how I learn. The AI assistant is incredibly helpful, and the interface is so intuitive!",
      rating: 5,
    },
    {
      name: "Prof. Michael Chen",
      role: "Mathematics Teacher",
      avatar: "👨‍🏫",
      quote:
        "Managing my courses has never been easier. The analytics help me understand my students better.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Biology Student",
      avatar: "👩‍💻",
      quote:
        "The course materials are well-organized, and I love being able to track my progress in real-time.",
      rating: 5,
    },
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              💬 Testimonials
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from students and teachers
            who use EduLearn every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
