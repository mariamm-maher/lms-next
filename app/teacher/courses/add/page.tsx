'use client';

import { useRouter } from 'next/navigation';
import CourseEditorForm from '@/components/teacher/CourseEditorForm';
import { CourseFormData } from '@/types/teacher';
import { courseService } from '@/services/courseService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddCoursePage() {
  const router = useRouter();

  const handleSubmit = async (data: CourseFormData) => {
    await courseService.createCourse(data);
    router.push('/teacher/courses');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/teacher/courses"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create New Course
          </h1>
          <p className="text-gray-600 mt-1">
            Fill in the details to create your course
          </p>
        </div>
      </div>

      {/* Form */}
      <CourseEditorForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/teacher/courses')}
      />
    </div>
  );
}
