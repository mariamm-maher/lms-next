"use client";

import { useState, useEffect } from "react";
import WelcomeHeader from "./components/WelcomeHeader";
import ContinueLearning from "./components/ContinueLearning";
import TodayScheduleReminders from "./components/TodayScheduleReminders";
import EnrolledCourses from "./components/EnrolledCourses";
import RecommendedCourses from "./components/RecommendedCourses";

// Mock data - replace with actual data from API/database
const mockStudentData = {
  name: "Alex Johnson",
  avatar: "👨‍🎓",
  currentCourse: {
    id: 1,
    title: "Physics: Mechanics and Motion",
    teacher: "Dr. James Wilson",
    teacherAvatar: "👨‍🔬",
    progress: 73,
    lastLesson: "Newton's Laws of Motion",
    nextLesson: "Conservation of Energy",
    thumbnail: "🔬",
  },
  todaySchedule: [
    {
      id: 1,
      time: "09:00 AM",
      subject: "Advanced JavaScript & React",
      teacher: "Prof. Michael Chen",
      type: "Live Class",
      duration: "1h 30m",
      status: "upcoming",
    },
    {
      id: 2,
      time: "02:00 PM",
      subject: "Calculus I: Limits and Derivatives",
      teacher: "Dr. Sarah Johnson",
      type: "Tutorial",
      duration: "1h",
      status: "upcoming",
    },
    {
      id: 3,
      time: "04:30 PM",
      subject: "Creative Writing Workshop",
      teacher: "Ms. Emily Rodriguez",
      type: "Group Discussion",
      duration: "45m",
      status: "upcoming",
    },
  ],
  reminders: [
    {
      id: 1,
      type: "exam",
      title: "JavaScript Fundamentals Quiz",
      course: "Advanced JavaScript & React",
      dueDate: "2025-10-25",
      dueTime: "03:00 PM",
      priority: "high",
      icon: "📝",
    },
    {
      id: 2,
      type: "assignment",
      title: "Creative Writing Assignment",
      course: "Creative Writing Workshop",
      dueDate: "2025-10-28",
      dueTime: "11:59 PM",
      priority: "medium",
      icon: "✍️",
    },
    {
      id: 3,
      type: "deadline",
      title: "Project Submission",
      course: "Database Design",
      dueDate: "2025-10-30",
      dueTime: "05:00 PM",
      priority: "high",
      icon: "📋",
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Completed",
      item: "React Hooks Tutorial",
      course: "Advanced JavaScript & React",
      time: "2 hours ago",
      icon: "✅",
    },
    {
      id: 2,
      action: "Submitted",
      item: "Calculus Problem Set #3",
      course: "Calculus I",
      time: "1 day ago",
      icon: "📤",
    },
  ],
  enrolledCourses: [
    {
      id: 1,
      title: "Advanced JavaScript & React",
      instructor: "Prof. Michael Chen",
      instructorAvatar: "👨‍💻",
      progress: 85,
      thumbnail: "💻",
      category: "Programming",
      totalLessons: 24,
      completedLessons: 20,
      nextLesson: "State Management with Redux",
      dueDate: "2025-11-15",
    },
    {
      id: 2,
      title: "Physics: Mechanics and Motion",
      instructor: "Dr. James Wilson",
      instructorAvatar: "👨‍🔬",
      progress: 73,
      thumbnail: "🔬",
      category: "Science",
      totalLessons: 18,
      completedLessons: 13,
      nextLesson: "Conservation of Energy",
      dueDate: "2025-11-20",
    },
    {
      id: 3,
      title: "Calculus I: Limits and Derivatives",
      instructor: "Dr. Sarah Johnson",
      instructorAvatar: "👩‍🏫",
      progress: 62,
      thumbnail: "📐",
      category: "Mathematics",
      totalLessons: 20,
      completedLessons: 12,
      nextLesson: "Chain Rule Applications",
      dueDate: "2025-11-25",
    },
    {
      id: 4,
      title: "Creative Writing Workshop",
      instructor: "Ms. Emily Rodriguez",
      instructorAvatar: "👩‍🎓",
      progress: 91,
      thumbnail: "✍️",
      category: "Literature",
      totalLessons: 12,
      completedLessons: 11,
      nextLesson: "Final Project: Short Story",
      dueDate: "2025-11-10",
    },
    {
      id: 5,
      title: "Database Design Fundamentals",
      instructor: "Prof. David Lee",
      instructorAvatar: "👨‍💼",
      progress: 45,
      thumbnail: "🗄️",
      category: "Database",
      totalLessons: 16,
      completedLessons: 7,
      nextLesson: "SQL Joins and Relationships",
      dueDate: "2025-12-05",
    },
  ],
  recommendedCourses: [
    {
      id: 101,
      title: "Data Structures & Algorithms",
      instructor: "Dr. Alan Smith",
      instructorAvatar: "👨‍🏫",
      rating: 4.9,
      students: 1240,
      thumbnail: "🧮",
      category: "Programming",
      level: "Intermediate",
      duration: "12 weeks",
      price: 299,
      description:
        "Master essential data structures and algorithmic problem-solving techniques.",
      tags: ["Algorithms", "Problem Solving", "Coding"],
    },
    {
      id: 102,
      title: "Machine Learning Basics",
      instructor: "Dr. Maria Garcia",
      instructorAvatar: "👩‍🔬",
      rating: 4.8,
      students: 890,
      thumbnail: "🤖",
      category: "AI & ML",
      level: "Beginner",
      duration: "10 weeks",
      price: 349,
      description:
        "Introduction to machine learning concepts and practical applications.",
      tags: ["AI", "Python", "Data Science"],
    },
    {
      id: 103,
      title: "Web Development Bootcamp",
      instructor: "Prof. John Carter",
      instructorAvatar: "👨‍💻",
      rating: 4.9,
      students: 2150,
      thumbnail: "🌐",
      category: "Web Development",
      level: "Beginner",
      duration: "16 weeks",
      price: 399,
      description:
        "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks.",
      tags: ["Web Dev", "Frontend", "Backend"],
    },
    {
      id: 104,
      title: "Advanced Physics: Quantum Mechanics",
      instructor: "Dr. Robert Brown",
      instructorAvatar: "👨‍🔬",
      rating: 4.7,
      students: 567,
      thumbnail: "⚛️",
      category: "Science",
      level: "Advanced",
      duration: "14 weeks",
      price: 279,
      description:
        "Explore the fascinating world of quantum mechanics and its applications.",
      tags: ["Physics", "Quantum", "Advanced"],
    },
  ],
  stats: {
    coursesInProgress: 5,
    completedLessons: 47,
    studyStreak: 12,
    averageGrade: 87.5,
  },
};

export default function StudentPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header Component */}
      <WelcomeHeader
        name={mockStudentData.name}
        greeting={greeting}
        stats={mockStudentData.stats}
      />

      {/* Continue Learning Component */}
      <ContinueLearning currentCourse={mockStudentData.currentCourse} />

      {/* Today's Schedule and Reminders Component */}
      <TodayScheduleReminders
        todaySchedule={mockStudentData.todaySchedule}
        reminders={mockStudentData.reminders}
        currentTime={currentTime}
      />

      {/* Enrolled Courses Component */}
      <EnrolledCourses enrolledCourses={mockStudentData.enrolledCourses} />

      {/* Recommended Courses Component */}
      <RecommendedCourses
        recommendedCourses={mockStudentData.recommendedCourses}
      />
    </div>
  );
}
