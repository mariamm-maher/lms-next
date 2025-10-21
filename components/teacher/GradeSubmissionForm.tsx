'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { assignmentService } from '@/services/assignmentService';

interface GradeSubmissionFormProps {
  submissionId: number;
  currentGrade?: number;
  currentFeedback?: string;
  maxPoints: number;
}

export default function GradeSubmissionForm({
  submissionId,
  currentGrade,
  currentFeedback,
  maxPoints,
}: GradeSubmissionFormProps) {
  const router = useRouter();
  const [grade, setGrade] = useState(currentGrade?.toString() || '');
  const [feedback, setFeedback] = useState(currentFeedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gradeValue = parseFloat(grade);

    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > maxPoints) {
      toast.error(`Grade must be between 0 and ${maxPoints}`);
      return;
    }

    setIsSubmitting(true);
    try {
      await assignmentService.gradeSubmission(submissionId, gradeValue, feedback);
      toast.success('Submission graded successfully!');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to grade submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {currentGrade !== undefined ? 'Update Grade' : 'Grade Submission'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade (0-{maxPoints}) *
          </label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min="0"
            max={maxPoints}
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={`Enter grade (max ${maxPoints})`}
            required
          />
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Provide feedback to the student..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentGrade !== undefined ? (
            <>
              <Save className="w-5 h-5" />
              <span className="font-medium">
                {isSubmitting ? 'Updating...' : 'Update Grade'}
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                {isSubmitting ? 'Submitting...' : 'Submit Grade'}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
