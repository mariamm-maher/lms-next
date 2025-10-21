'use client';

import Link from 'next/link';
import { TeacherCourse } from '@/types/teacher';
import { BookOpen, Users, Star, Clock, Edit, Trash2, Eye } from 'lucide-react';

interface CourseCardProps {
  course: TeacherCourse;
  onDelete?: (courseId: number) => void;
}

export default function CourseCard({ course, onDelete }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-indigo-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              course.isPublished
                ? 'bg-green-500 text-white'
                : 'bg-yellow-500 text-white'
            }`}
          >
            {course.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description || 'No description available'}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>{course.enrollmentCount} students</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{course.averageRating.toFixed(1)} rating</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{course.totalDuration || 0} min</span>
          </div>
        </div>

        {/* Price & Category */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-2xl font-bold text-indigo-600">
            ${course.price}
          </span>
          {course.category && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              {course.category}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/teacher/courses/${course.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span className="font-medium">View</span>
          </Link>
          
          <Link
            href={`/teacher/courses/${course.id}/edit`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Edit course"
          >
            <Edit className="w-4 h-4" />
          </Link>
          
          {onDelete && (
            <button
              onClick={() => onDelete(course.id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              aria-label="Delete course"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
