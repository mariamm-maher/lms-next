'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CourseEditorForm from '@/components/teacher/CourseEditorForm';
import { CourseFormData } from '@/types/teacher';
import { courseService } from '@/services/courseService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = parseInt(params.courseId as string);
  
  const [initialData, setInitialData] = useState<Partial<CourseFormData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await courseService.getCourse(courseId);
        setInitialData({
          title: course.title,
          description: course.description || '',
          price: course.price,
          category: course.category || '',
          level: course.level || 'Beginner',
          duration: course.duration || '',
          thumbnail: course.thumbnail || '',
          videoUrl: course.videoUrl || '',
          language: course.language,
          tags: course.tags || [],
          requirements: course.requirements || [],
          objectives: course.objectives || [],
          isPublished: course.isPublished,
        });
      } catch (error) {
        toast.error('Failed to load course');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (data: CourseFormData) => {
    await courseService.updateCourse(courseId, data);
    router.push(`/teacher/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/teacher/courses/${courseId}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edit Course
          </h1>
          <p className="text-gray-600 mt-1">
            Update your course details
          </p>
        </div>
      </div>

      {/* Form */}
      <CourseEditorForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/teacher/courses/${courseId}`)}
      />
    </div>
  );
}
