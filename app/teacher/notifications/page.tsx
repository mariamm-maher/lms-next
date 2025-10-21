import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Bell, FileText, ClipboardList, MessageSquare, AlertCircle } from 'lucide-react';

async function getNotifications(teacherId: number) {
  const notifications = await prisma.notification.findMany({
    where: { userId: teacherId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return notifications;
}

export default async function TeacherNotificationsPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || '0');
  const notifications = await getNotifications(userId);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ASSIGNMENT':
        return FileText;
      case 'QUIZ':
        return ClipboardList;
      case 'MESSAGE':
        return MessageSquare;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'ASSIGNMENT':
        return 'from-blue-500 to-cyan-500';
      case 'QUIZ':
        return 'from-purple-500 to-pink-500';
      case 'MESSAGE':
        return 'from-green-500 to-emerald-500';
      case 'GRADE':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-indigo-500 to-purple-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your teaching activities
          </p>
        </div>
        <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const color = getNotificationColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 ${
                  !notification.isRead ? 'border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${color} rounded-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    {!notification.isRead && (
                      <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-600">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
