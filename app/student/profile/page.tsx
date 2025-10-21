import { Metadata } from "next";
import ProfileSettings from "../components/ProfileSettings";

export const metadata: Metadata = {
  title: "Profile & Settings - EduLearn Student",
  description: "Manage your profile, preferences, and account settings.",
};

export default function ProfilePage() {
  return <ProfileSettings />;
}
