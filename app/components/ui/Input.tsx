import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            appearance-none block w-full px-4 py-3 border-2 border-purple-200 rounded-xl 
            placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
            focus:border-purple-500 bg-white transition-all duration-200 hover:border-purple-300
            ${icon ? "pl-10" : ""} ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : ""
          } 
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
