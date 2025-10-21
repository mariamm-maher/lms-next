import React from "react";

interface NavbarProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Navbar({
  title,
  children,
  className = "",
}: NavbarProps) {
  return (
    <nav
      className={`bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          <div className="flex items-center space-x-4">{children}</div>
        </div>
      </div>
    </nav>
  );
}
