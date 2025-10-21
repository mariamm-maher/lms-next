import { Metadata } from "next";
import BrowseTeachers from "../components/BrowseTeachers";

export const metadata: Metadata = {
  title: "Browse Teachers - EduLearn Student",
  description:
    "Find and connect with experienced teachers for your learning journey.",
};

export default function BrowseTeachersPage() {
  return <BrowseTeachers />;
}
