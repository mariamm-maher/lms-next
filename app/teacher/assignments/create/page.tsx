'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { assignmentService } from '@/services/assignmentService';
import { courseService } from '@/services/courseService';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    dueDate: '',
    maxPoints: 100,
    courseId: 0,
    attachments: [] as string[],
    allowLateSubmission: false,
  });

  const [newAttachment, setNewAttachment] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getTeacherCourses();
        setCourses(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, courseId: data[0].id }));
        }
      } catch (error) {
        toast.error('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Assignment title is required');
      return;
    }

    if (!formData.courseId) {
      toast.error('Please select a course');
      return;
    }

    if (!formData.dueDate) {
      toast.error('Due date is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await assignmentService.createAssignment(formData);
      toast.success('Assignment created successfully!');
      router.push('/teacher/assignments');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAttachment = () => {
    if (newAttachment.trim()) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, newAttachment.trim()],
      });
      setNewAttachment('');
    }
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/teacher/assignments"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Assignment
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new assignment for your students
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Assignment Details
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                Course *
              </label>
              <select
                id="courseId"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Week 1 Programming Exercise"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Brief description of the assignment..."
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Detailed instructions for students..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="maxPoints" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Points
                </label>
                <input
                  type="number"
                  id="maxPoints"
                  value={formData.maxPoints}
                  onChange={(e) => setFormData({ ...formData, maxPoints: parseInt(e.target.value) || 100 })}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
          
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={newAttachment}
              onChange={(e) => setNewAttachment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAttachment())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Add attachment URL..."
            />
            <button
              type="button"
              onClick={addAttachment}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="flex-1 text-sm text-gray-700 truncate">{attachment}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.allowLateSubmission}
              onChange={(e) => setFormData({ ...formData, allowLateSubmission: e.target.checked })}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Allow late submissions
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span className="font-medium">
              {isSubmitting ? 'Creating...' : 'Create Assignment'}
            </span>
          </button>

          <Link
            href="/teacher/assignments"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
