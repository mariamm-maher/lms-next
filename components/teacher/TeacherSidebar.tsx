'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  ClipboardList,
  BarChart3,
  DollarSign,
  Bot,
  Bell,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useTeacherStore } from '@/app/store/useTeacherStore';

const navItems = [
  { href: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/students', label: 'Students', icon: Users },
  { href: '/teacher/courses', label: 'Courses', icon: BookOpen },
  { href: '/teacher/assignments', label: 'Assignments', icon: FileText },
  { href: '/teacher/quizzes', label: 'Quizzes', icon: ClipboardList },
  { href: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/teacher/payments', label: 'Payments', icon: DollarSign },
  { href: '/teacher/ai', label: 'AI Assistant', icon: Bot },
  { href: '/teacher/notifications', label: 'Notifications', icon: Bell },
  { href: '/teacher/settings', label: 'Settings', icon: Settings },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useTeacherStore();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-0
          w-64 flex flex-col
        `}
      >
        {/* Header with Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/teacher" className="flex items-center gap-3 mb-2">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.svg"
                alt="LMS Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LMS Portal
              </h2>
            </div>
          </Link>
          <p className="text-sm text-gray-500 ml-15">Teacher Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/teacher' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-2">Need help?</p>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View Documentation →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
