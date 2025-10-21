import { Metadata } from "next";
import AIAssistant from "../components/AIAssistant";

export const metadata: Metadata = {
  title: "AI Learning Assistant - EduLearn Student",
  description:
    "Get personalized learning assistance powered by AI to help you succeed.",
};

export default function AIAssistantPage() {
  return <AIAssistant />;
}
