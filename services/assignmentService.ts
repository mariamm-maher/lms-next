// Assignment Service - API wrappers for teacher assignment operations
import { AssignmentFormData, SubmissionWithStudent } from '@/types/teacher';

export const assignmentService = {
  // Get all assignments for a teacher
  async getAssignments(courseId?: number) {
    const url = courseId 
      ? `/api/teacher/assignments?courseId=${courseId}`
      : '/api/teacher/assignments';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }
    return response.json();
  },

  // Create a new assignment
  async createAssignment(data: AssignmentFormData) {
    const response = await fetch('/api/teacher/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create assignment');
    }
    return response.json();
  },

  // Update an assignment
  async updateAssignment(assignmentId: number, data: Partial<AssignmentFormData>) {
    const response = await fetch(`/api/teacher/assignments/${assignmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update assignment');
    }
    return response.json();
  },

  // Delete an assignment
  async deleteAssignment(assignmentId: number): Promise<void> {
    const response = await fetch(`/api/teacher/assignments/${assignmentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete assignment');
    }
  },

  // Get submissions for an assignment
  async getSubmissions(assignmentId?: number): Promise<SubmissionWithStudent[]> {
    const url = assignmentId
      ? `/api/teacher/submissions?assignmentId=${assignmentId}`
      : '/api/teacher/submissions';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    return response.json();
  },

  // Grade a submission
  async gradeSubmission(submissionId: number, grade: number, feedback?: string) {
    const response = await fetch(`/api/teacher/submissions/${submissionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade, feedback }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to grade submission');
    }
    return response.json();
  },
};
