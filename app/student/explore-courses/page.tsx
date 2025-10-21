import { Metadata } from "next";
import ExploreCourses from "../components/ExploreCourses";

export const metadata: Metadata = {
  title: "Explore Courses - EduLearn Student",
  description:
    "Discover a wide range of courses to expand your knowledge and skills.",
};

export default function ExploreCoursesPage() {
  return <ExploreCourses />;
}
