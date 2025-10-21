"use client";

import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  rating: number;
  experience: string;
  avatar: string;
  students: number;
}

const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    rating: 4.9,
    experience: "8 years",
    avatar: "👩‍🏫",
    students: 156,
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Computer Science",
    rating: 4.8,
    experience: "12 years",
    avatar: "👨‍💻",
    students: 203,
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "Literature",
    rating: 4.7,
    experience: "6 years",
    avatar: "👩‍🎓",
    students: 98,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    subject: "Physics",
    rating: 4.9,
    experience: "15 years",
    avatar: "🧑‍🔬",
    students: 174,
  },
];

const subjects = [
  "All Subjects",
  "Mathematics",
  "Computer Science",
  "Literature",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function BrowseTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("rating");

  const filteredTeachers = mockTeachers
    .filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (teacher) =>
        selectedSubject === "All Subjects" ||
        teacher.subject === selectedSubject
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "students") return b.students - a.students;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>👨‍🏫</span>
          <span>Browse Teachers</span>
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search teachers or subjects..."
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
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200"
          >
            <option value="rating">Sort by Rating</option>
            <option value="students">Sort by Students</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} hover className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{teacher.avatar}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {teacher.name}
                </h3>
                <p className="text-purple-600 font-medium">{teacher.subject}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span className="font-medium">{teacher.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>👥</span>
                <span>{teacher.students} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>{teacher.experience}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="primary" size="sm" className="flex-1">
                View Profile
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Message
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No teachers found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        </Card>
      )}
    </div>
  );
}
