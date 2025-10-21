'use client';

import { DashboardStats as DashboardStatsData } from '@/types/teacher';
import { Users, BookOpen, TrendingUp, DollarSign, FileText, Award } from 'lucide-react';

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      shadowColor: 'shadow-blue-500/20',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses,
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      shadowColor: 'shadow-purple-500/20',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    {
      title: 'Average Grade',
      value: `${stats.averageGrade.toFixed(1)}%`,
      icon: Award,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      shadowColor: 'shadow-orange-500/20',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      shadowColor: 'shadow-green-500/20',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
    {
      title: 'Pending Submissions',
      value: stats.pendingSubmissions,
      icon: FileText,
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50',
      shadowColor: 'shadow-red-500/20',
      iconBg: 'bg-gradient-to-br from-red-500 to-rose-500',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      shadowColor: 'shadow-indigo-500/20',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl shadow-lg ${stat.shadowColor} hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50`}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
            
            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-4 ${stat.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                {/* Decorative element */}
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl`}></div>
              </div>
              
              <h3 className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {stat.value}
              </p>
              
              {/* Bottom accent line */}
              <div className={`mt-4 h-1 w-16 bg-gradient-to-r ${stat.gradient} rounded-full group-hover:w-full transition-all duration-500`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
