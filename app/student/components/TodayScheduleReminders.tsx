"use client";

import Link from "next/link";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface ScheduleItem {
  id: number;
  time: string;
  subject: string;
  teacher: string;
  type: string;
  duration: string;
  status: string;
}

interface Reminder {
  id: number;
  type: string;
  title: string;
  course: string;
  dueDate: string;
  dueTime: string;
  priority: string;
  icon: string;
}

interface TodayScheduleRemindersProps {
  todaySchedule: ScheduleItem[];
  reminders: Reminder[];
  currentTime: Date;
}

export default function TodayScheduleReminders({
  todaySchedule,
  reminders,
  currentTime,
}: TodayScheduleRemindersProps) {
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "low":
        return "text-blue-600 bg-blue-100 border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <span>📅</span>
            <span>Today's Schedule</span>
          </h2>
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="space-y-3">
          {todaySchedule.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {item.time.split(" ")[0]}
                    </div>
                    <div className="text-xs text-blue-500">
                      {item.time.split(" ")[1]}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-blue-200"></div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.subject}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>👨‍🏫 {item.teacher}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">
                        {item.type}
                      </span>
                      <span>•</span>
                      <span>⏱️ {item.duration}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50"
                >
                  Join Class
                </Button>
              </div>
            </div>
          ))}
        </div>

        {todaySchedule.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No classes scheduled for today!
            </h3>
            <p className="text-gray-600">
              Enjoy your free time or catch up on assignments
            </p>
          </div>
        )}
      </Card>

      {/* Reminders */}
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>🔔</span>
          <span>Reminders</span>
        </h2>

        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-xl border-2 ${getPriorityColor(
                reminder.priority
              )} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{reminder.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {reminder.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {reminder.course}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">
                      Due: {getDaysUntilDue(reminder.dueDate)}
                    </span>
                    <span className="text-gray-500">{reminder.dueTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/student/exams-quizzes">
          <Button variant="outline" className="w-full mt-4">
            View All Exams & Deadlines
          </Button>
        </Link>
      </Card>
    </div>
  );
}
