import { Metadata } from "next";
import ExamsQuizzes from "../components/ExamsQuizzes";

export const metadata: Metadata = {
  title: "Exams & Quizzes - EduLearn Student",
  description:
    "Take exams and quizzes to test your knowledge and track your progress.",
};

export default function ExamsQuizzesPage() {
  return <ExamsQuizzes />;
}
