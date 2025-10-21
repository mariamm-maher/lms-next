import { auth } from '@/auth';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default async function DashboardHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-8 md:p-10">
      {/* Animated background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-white rounded-lg rotate-12"></div>
        <div className="absolute bottom-10 right-40 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute top-20 left-1/3 w-12 h-12 border-2 border-white rotate-45"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Profile Picture with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || 'Profile picture'}
                width={80}
                height={80}
                className="relative rounded-full border-4 border-white/80 object-cover shadow-2xl"
              />
            ) : (
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white/50">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* Welcome Text */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Hi, {user?.name}!
              </h1>
            </div>
            <p className="text-indigo-100 text-lg font-medium">
              Welcome back! Here's your teaching dashboard overview.
            </p>
          </div>
        </div>

        {/* Decorative badge */}
        <div className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          <span className="text-white font-semibold">Active Now</span>
        </div>
      </div>
    </div>
  );
}
