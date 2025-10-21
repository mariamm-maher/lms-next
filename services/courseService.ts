// Course Service - API wrappers for teacher course operations
import { CourseFormData, LessonFormData, TeacherCourse } from '@/types/teacher';

export const courseService = {
  // Get all courses for the logged-in teacher
  async getTeacherCourses(): Promise<TeacherCourse[]> {
    const response = await fetch('/api/teacher/courses');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },

  // Get a single course by ID
  async getCourse(courseId: number): Promise<TeacherCourse> {
    const response = await fetch(`/api/teacher/courses/${courseId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    return response.json();
  },

  // Create a new course
  async createCourse(data: CourseFormData): Promise<TeacherCourse> {
    const response = await fetch('/api/teacher/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create course');
    }
    return response.json();
  },

  // Update an existing course
  async updateCourse(courseId: number, data: Partial<CourseFormData>): Promise<TeacherCourse> {
    const response = await fetch(`/api/teacher/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update course');
    }
    return response.json();
  },

  // Delete a course
  async deleteCourse(courseId: number): Promise<void> {
    const response = await fetch(`/api/teacher/courses/${courseId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
  },

  // Add a lesson to a course
  async addLesson(courseId: number, data: LessonFormData) {
    const response = await fetch('/api/teacher/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, courseId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add lesson');
    }
    return response.json();
  },

  // Update a lesson
  async updateLesson(lessonId: number, data: Partial<LessonFormData>) {
    const response = await fetch(`/api/teacher/lessons/${lessonId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update lesson');
    }
    return response.json();
  },

  // Delete a lesson
  async deleteLesson(lessonId: number): Promise<void> {
    const response = await fetch(`/api/teacher/lessons/${lessonId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete lesson');
    }
  },

  // Upload media file (video, PDF, image)
  async uploadMedia(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.url);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', '/api/teacher/upload');
      xhr.send(formData);
    });
  },
};
