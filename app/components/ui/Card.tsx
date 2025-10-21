import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  hover = false,
}: CardProps) {
  const clickableStyles = onClick ? "cursor-pointer" : "";
  const hoverStyles = hover
    ? "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1"
    : "";

  return (
    <div
      className={`
        bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6
        transition-all duration-300 ${clickableStyles} ${hoverStyles} ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
