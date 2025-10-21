// Teacher Dashboard Types

export interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  totalRevenue: number;
  averageGrade: number;
  pendingSubmissions: number;
  completionRate: number;
}

export interface StudentProgress {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  studentPhoto?: string;
  courseId: number;
  courseName: string;
  progress: number;
  enrolledAt: string;
  lastActive?: string;
  completedLessons: number;
  totalLessons: number;
  averageGrade?: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration: string;
  thumbnail?: string;
  videoUrl?: string;
  language: string;
  tags: string[];
  requirements: string[];
  objectives: string[];
  isPublished: boolean;
}

export interface LessonFormData {
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  orderIndex: number;
  resources: string[];
  isPublished: boolean;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
  attachments: string[];
  allowLateSubmission: boolean;
  courseId: number;
}

export interface SubmissionWithStudent {
  id: number;
  assignmentId: number;
  assignmentTitle: string;
  studentId: number;
  studentName: string;
  studentEmail: string;
  studentPhoto?: string;
  content?: string;
  attachments: string[];
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'LATE';
  grade?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface QuizFormData {
  title: string;
  description: string;
  courseId: number;
  timeLimit?: number;
  passingScore: number;
  maxAttempts: number;
  questions: QuizQuestionFormData[];
}

export interface QuizQuestionFormData {
  question: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  options?: string[];
  correctAnswer: string;
  points: number;
  explanation?: string;
}

export interface AnalyticsData {
  courseId?: number;
  courseName?: string;
  weeklyActiveStudents: number[];
  completionRate: number;
  averageGrade: number;
  totalEnrollments: number;
  revenueByMonth: { month: string; revenue: number }[];
  topPerformingStudents: { name: string; grade: number }[];
  lessonEngagement: { lessonTitle: string; completionRate: number }[];
}

export interface TeacherCourse {
  id: number;
  title: string;
  description?: string;
  price: number;
  category?: string;
  level?: string;
  thumbnail?: string;
  isPublished: boolean;
  totalLessons: number;
  totalDuration?: number;
  enrollmentCount: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

export interface AIGenerateRequest {
  prompt: string;
  type: 'quiz' | 'lesson_summary' | 'activities' | 'feedback';
  context?: {
    courseId?: number;
    lessonContent?: string;
    studentLevel?: string;
  };
}

export interface AIGenerateResponse {
  success: boolean;
  data?: {
    content: string;
    suggestions?: string[];
    quizQuestions?: QuizQuestionFormData[];
  };
  error?: string;
}

export interface TeacherNotification {
  id: number;
  type: 'ASSIGNMENT' | 'QUIZ' | 'GRADE' | 'ANNOUNCEMENT' | 'MESSAGE' | 'REMINDER';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'paypal' | 'stripe' | 'bank';
  details: string;
  isDefault: boolean;
}

export interface PayoutHistory {
  id: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  method: string;
  transactionId?: string;
  createdAt: string;
}
