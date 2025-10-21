'use client';

import { useState } from 'react';
import { CourseFormData } from '@/types/teacher';
import { Save, X, Plus, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface CourseEditorFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  onCancel: () => void;
  mode?: 'create' | 'edit';
}

export default function CourseEditorForm({
  initialData,
  onSubmit,
  onCancel,
  mode = 'create',
}: CourseEditorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    level: initialData?.level || 'Beginner',
    duration: initialData?.duration || '',
    thumbnail: initialData?.thumbnail || '',
    videoUrl: initialData?.videoUrl || '',
    language: initialData?.language || 'English',
    tags: initialData?.tags || [],
    requirements: initialData?.requirements || [],
    objectives: initialData?.objectives || [],
    isPublished: initialData?.isPublished || false,
  });

  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newObjective, setNewObjective] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Course title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success('Course saved successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save course');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({ ...formData, requirements: [...formData.requirements, newRequirement.trim()] });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({ ...formData, requirements: formData.requirements.filter((_, i) => i !== index) });
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData({ ...formData, objectives: [...formData.objectives, newObjective.trim()] });
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setFormData({ ...formData, objectives: formData.objectives.filter((_, i) => i !== index) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Introduction to Web Development"
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
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Describe your course..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Programming"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 8 weeks"
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                type="text"
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Intro Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Add a tag..."
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-indigo-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Add a requirement..."
          />
          <button
            type="button"
            onClick={addRequirement}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2">
          {formData.requirements.map((req, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="flex-1">{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Objectives</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Add an objective..."
          />
          <button
            type="button"
            onClick={addObjective}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2">
          {formData.objectives.map((obj, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="flex-1">{obj}</span>
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Publishing - Only show in edit mode */}
      {mode === 'edit' && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Course Status</h3>
              <p className="text-sm text-gray-600 mb-4">
                {formData.isPublished 
                  ? '✅ This course is published and visible to students. You can continue adding lessons anytime.'
                  : '📝 This course is in draft mode. Publish it when you\'re ready to make it available to students.'}
              </p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-semibold text-gray-900">
                  {formData.isPublished ? 'Published' : 'Publish this course'}
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Info Box for Create Mode */}
      {mode === 'create' && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5">ℹ️</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Next Steps After Creating</h4>
              <p className="text-sm text-blue-800">
                After creating this course, you'll be able to add lessons, assignments, and quizzes. 
                You can publish the course anytime to make it visible to students.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span className="font-medium">
            {isSubmitting 
              ? 'Saving...' 
              : mode === 'create' 
                ? 'Create Course' 
                : 'Update Course'}
          </span>
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
