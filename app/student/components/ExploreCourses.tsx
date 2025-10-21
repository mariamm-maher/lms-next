"use client";

import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  description: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Advanced JavaScript & React",
    instructor: "Prof. Michael Chen",
    category: "Programming",
    level: "Advanced",
    duration: "12 weeks",
    price: 299,
    rating: 4.8,
    students: 1240,
    thumbnail: "💻",
    description:
      "Master modern JavaScript and React development with real-world projects.",
  },
  {
    id: 2,
    title: "Calculus I: Limits and Derivatives",
    instructor: "Dr. Sarah Johnson",
    category: "Mathematics",
    level: "Intermediate",
    duration: "16 weeks",
    price: 199,
    rating: 4.9,
    students: 890,
    thumbnail: "📐",
    description:
      "Build a strong foundation in differential calculus with practical applications.",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    instructor: "Ms. Emily Rodriguez",
    category: "Literature",
    level: "Beginner",
    duration: "8 weeks",
    price: 149,
    rating: 4.7,
    students: 567,
    thumbnail: "✍️",
    description:
      "Develop your creative writing skills through exercises and peer feedback.",
  },
  {
    id: 4,
    title: "Physics: Mechanics and Motion",
    instructor: "Dr. James Wilson",
    category: "Science",
    level: "Intermediate",
    duration: "14 weeks",
    price: 249,
    rating: 4.9,
    students: 723,
    thumbnail: "🔬",
    description:
      "Explore the fundamental principles of classical mechanics and motion.",
  },
];

const categories = [
  "All Categories",
  "Programming",
  "Mathematics",
  "Literature",
  "Science",
  "Arts",
  "Business",
];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function ExploreCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("rating");

  const filteredCourses = mockCourses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (course) =>
        selectedCategory === "All Categories" ||
        course.category === selectedCategory
    )
    .filter(
      (course) =>
        selectedLevel === "All Levels" || course.level === selectedLevel
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "students") return b.students - a.students;
      if (sortBy === "price") return a.price - b.price;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>📚</span>
          <span>Explore Courses</span>
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
          >
            <option value="rating">Highest Rated</option>
            <option value="students">Most Popular</option>
            <option value="price">Lowest Price</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} hover className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="text-4xl">{course.thumbnail}</div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                  {course.level}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{course.description}</p>
              <p className="text-purple-600 font-medium">
                by {course.instructor}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>👥</span>
                <span>{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                ${course.price}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Preview
                </Button>
                <Button variant="primary" size="sm">
                  Enroll Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        </Card>
      )}
    </div>
  );
}
