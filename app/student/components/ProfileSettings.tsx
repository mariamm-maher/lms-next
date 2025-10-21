"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  coursesCompleted: number;
  certificatesEarned: number;
  studyHours: number;
}

const mockProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  bio: "Computer Science student passionate about web development and AI. Always eager to learn new technologies!",
  avatar: "👨‍🎓",
  joinedDate: "2024-09-15",
  coursesCompleted: 8,
  certificatesEarned: 3,
  studyHours: 156,
};

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "progress"
  >("profile");
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
    console.log("Profile updated:", profile);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-6 mb-6">
          <div className="text-6xl">{profile.avatar}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
            <p className="text-purple-600 font-medium">{profile.email}</p>
            <p className="text-gray-600 mt-2">
              Member since {new Date(profile.joinedDate).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant={isEditing ? "secondary" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>{" "}
        {isEditing ? (
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              icon={<User className="h-5 w-5 text-gray-400" />}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 hover:border-purple-300"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        )}
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-purple-600">
            {profile.coursesCompleted}
          </div>
          <p className="text-gray-600">Courses Completed</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-orange-600">
            {profile.certificatesEarned}
          </div>
          <p className="text-gray-600">Certificates Earned</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-green-600">
            {profile.studyHours}
          </div>
          <p className="text-gray-600">Study Hours</p>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Account Settings
        </h3>{" "}
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
          />
          <Button variant="primary">Update Password</Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Email Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive updates about courses and assignments
              </p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">SMS Reminders</h4>
              <p className="text-sm text-gray-600">
                Get text reminders for upcoming deadlines
              </p>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Dark Mode</h4>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Learning Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">JavaScript & React</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Calculus I</span>
              <span className="text-sm text-gray-600">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                style={{ width: "72%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Creative Writing</span>
              <span className="text-sm text-gray-600">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Achievements
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <span className="text-2xl">🏆</span>
            <div>
              <h4 className="font-medium text-purple-800">Course Completion</h4>
              <p className="text-sm text-purple-600">
                Completed "Creative Writing Workshop"
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-2xl">⭐</span>
            <div>
              <h4 className="font-medium text-green-800">Perfect Score</h4>
              <p className="text-sm text-green-600">
                Scored 100% on JavaScript Quiz
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-2xl">🔥</span>
            <div>
              <h4 className="font-medium text-blue-800">Study Streak</h4>
              <p className="text-sm text-blue-600">
                15 days of consistent learning
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>⚙️</span>
          <span>Profile & Settings</span>
        </h2>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: "profile", label: "Profile", icon: "👤" },
            { key: "settings", label: "Settings", icon: "⚙️" },
            { key: "progress", label: "Progress", icon: "📈" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.key as any)}
              className="flex items-center space-x-2"
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && renderProfile()}
      {activeTab === "settings" && renderSettings()}
      {activeTab === "progress" && renderProgress()}
    </div>
  );
}
