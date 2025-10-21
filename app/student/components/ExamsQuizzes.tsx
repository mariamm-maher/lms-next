"use client";

import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface Exam {
  id: number;
  title: string;
  course: string;
  type: "exam" | "quiz";
  status: "available" | "completed" | "upcoming";
  dueDate?: string;
  duration: number;
  questions: number;
  score?: number;
  maxScore?: number;
}

const mockExams: Exam[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals Quiz",
    course: "Advanced JavaScript & React",
    type: "quiz",
    status: "available",
    dueDate: "2025-10-25",
    duration: 30,
    questions: 15,
  },
  {
    id: 2,
    title: "Calculus Midterm Exam",
    course: "Calculus I: Limits and Derivatives",
    type: "exam",
    status: "completed",
    duration: 120,
    questions: 25,
    score: 87,
    maxScore: 100,
  },
  {
    id: 3,
    title: "Creative Writing Assignment",
    course: "Creative Writing Workshop",
    type: "exam",
    status: "available",
    dueDate: "2025-10-28",
    duration: 180,
    questions: 5,
  },
  {
    id: 4,
    title: "Physics Chapter 3 Quiz",
    course: "Physics: Mechanics and Motion",
    type: "quiz",
    status: "upcoming",
    dueDate: "2025-11-02",
    duration: 45,
    questions: 20,
  },
];

export default function ExamsQuizzes() {
  const [activeTab, setActiveTab] = useState<
    "available" | "completed" | "upcoming"
  >("available");

  const filteredExams = mockExams.filter((exam) => exam.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "upcoming":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "exam" ? "📋" : "📝";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>📝</span>
          <span>Exams & Quizzes</span>
        </h2>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            {
              key: "available",
              label: "Available",
              count: mockExams.filter((e) => e.status === "available").length,
            },
            {
              key: "completed",
              label: "Completed",
              count: mockExams.filter((e) => e.status === "completed").length,
            },
            {
              key: "upcoming",
              label: "Upcoming",
              count: mockExams.filter((e) => e.status === "upcoming").length,
            },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.key as any)}
              className="flex items-center space-x-2"
            >
              <span>{tab.label}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Exams/Quizzes List */}
      <div className="space-y-4">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{getTypeIcon(exam.type)}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {exam.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      exam.status
                    )}`}
                  >
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                </div>
                <p className="text-purple-600 font-medium mb-2">
                  {exam.course}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>❓</span>
                    <span>{exam.questions} questions</span>
                  </div>
                  {exam.dueDate && (
                    <div className="flex items-center space-x-1">
                      <span>📅</span>
                      <span>
                        Due: {new Date(exam.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {exam.score !== undefined && (
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span className="font-medium text-green-600">
                        {exam.score}/{exam.maxScore}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              {exam.status === "available" && (
                <Button variant="primary" size="sm">
                  Start {exam.type === "exam" ? "Exam" : "Quiz"}
                </Button>
              )}
              {exam.status === "completed" && (
                <Button variant="outline" size="sm">
                  View Results
                </Button>
              )}
              {exam.status === "upcoming" && (
                <Button variant="ghost" size="sm" disabled>
                  Not Available Yet
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">
              {activeTab === "available"
                ? "📝"
                : activeTab === "completed"
                ? "✅"
                : "⏳"}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No {activeTab} exams or quizzes
            </h3>
            <p className="text-gray-600">
              {activeTab === "available" &&
                "Check back later for new assessments"}
              {activeTab === "completed" &&
                "Complete some exams to see your results here"}
              {activeTab === "upcoming" && "No upcoming assessments scheduled"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
