# LMS Database Schema Documentation

## 📚 Overview

This is a comprehensive Learning Management System (LMS) database schema built with Prisma ORM for PostgreSQL.

## 🎯 Core Features

### ✅ User Management

- Student and Teacher profiles
- Role-based access control (STUDENT, TEACHER, ADMIN)
- Authentication and authorization

### ✅ Course Management

- Complete course structure with lessons
- Course categories and tags
- Publishing workflow
- Requirements and objectives tracking

### ✅ Enrollment System

- Student course enrollments
- Progress tracking
- Certificate issuance
- Enrollment status management

### ✅ Assignment System

- Assignment creation and management
- File attachments support
- Submission tracking
- Grading and feedback
- Late submission handling

### ✅ Quiz System

- Multiple quiz types (Multiple Choice, True/False, Short Answer, Essay)
- Timed quizzes
- Multiple attempts support
- Automatic grading
- Detailed quiz analytics

### ✅ Progress Tracking

- Lesson completion tracking
- Video watch time tracking
- Course completion certificates

### ✅ Communication

- Announcements (course-level)
- Direct messaging between users
- Notifications system

### ✅ Reviews & Ratings

- Course reviews
- Teacher ratings
- Student feedback

### ✅ Payment Processing

- Multiple payment methods
- Transaction tracking
- Payment status management
- Course purchases

### ✅ Additional Features

- Favorites/Wishlist
- Certificate generation
- Resource management
- Category management

---

## 📊 Database Models

### 1. **User** (Core Authentication)

```prisma
- id: Unique identifier
- name: User's full name
- email: Unique email address
- password: Hashed password
- role: STUDENT | TEACHER | ADMIN
- timestamps: createdAt, updatedAt
```

**Relations:**

- One StudentProfile or TeacherProfile
- Many Payments
- Many Notifications
- Many Messages (sent and received)

---

### 2. **StudentProfile**

```prisma
- id, userId: Profile identification
- level: Student's current level
- interests: Areas of interest
- photoUrl: Profile picture
- bio: Student biography
- location: Geographic location
- phoneNumber: Contact number
```

**Relations:**

- Enrollments in courses
- Assignment submissions
- Quiz attempts
- Reviews written
- Lesson progress
- Certificates earned
- Favorite courses

---

### 3. **TeacherProfile**

```prisma
- id, userId: Profile identification
- bio: Teacher biography
- expertise: Areas of expertise
- photoUrl: Profile picture
- acceptedPayments: Payment methods
- rating: Average rating (0-5)
- totalStudents: Number of students taught
- yearsOfExperience: Teaching experience
- education: Educational background
- certifications: Professional certifications
```

**Relations:**

- Courses taught
- Assignments created
- Quizzes created
- Announcements posted
- Reviews received

---

### 4. **Course** (Main Content Container)

```prisma
- id: Unique identifier
- title: Course name
- description: Course overview
- price: Course price (0 for free)
- category: Course category
- level: Beginner | Intermediate | Advanced
- duration: Course length (e.g., "8 weeks")
- thumbnail: Course image URL
- videoUrl: Introduction video
- isPublished: Publication status
- totalLessons: Number of lessons
- totalDuration: Total time in minutes
- language: Course language
- tags: Search tags
- requirements: Prerequisites
- objectives: Learning outcomes
- timestamps: createdAt, updatedAt
```

**Relations:**

- Teacher/Creator
- Student enrollments
- Lessons
- Assignments
- Quizzes
- Announcements
- Reviews
- Favorites
- Categories

---

### 5. **Lesson** (Course Content)

```prisma
- id, courseId: Identification
- title: Lesson name
- description: Lesson overview
- content: Lesson text content
- videoUrl: Video lesson URL
- duration: Length in minutes
- orderIndex: Lesson sequence
- isPublished: Publication status
- resources: Downloadable files
- timestamps: createdAt, updatedAt
```

**Relations:**

- Parent course
- Student progress records

---

### 6. **LessonProgress** (Tracking)

```prisma
- studentId, lessonId: Tracking keys
- isCompleted: Completion status
- watchedDuration: Time watched (seconds)
- lastWatchedAt: Last view timestamp
- completedAt: Completion timestamp
```

---

### 7. **Assignment**

```prisma
- id, courseId, teacherId: Identification
- title: Assignment name
- description: Assignment details
- instructions: Detailed instructions
- dueDate: Submission deadline
- maxPoints: Maximum score
- attachments: Reference files
- allowLateSubmission: Late policy
- timestamps: createdAt, updatedAt
```

**Relations:**

- Course
- Teacher creator
- Student submissions

---

### 8. **AssignmentSubmission**

```prisma
- id, assignmentId, studentId: Identification
- content: Submission text
- attachments: Submitted files
- status: PENDING | SUBMITTED | GRADED | LATE
- grade: Score received
- feedback: Teacher feedback
- submittedAt: Submission time
- gradedAt: Grading time
```

---

### 9. **Quiz**

```prisma
- id, courseId, teacherId: Identification
- title: Quiz name
- description: Quiz overview
- timeLimit: Duration in minutes
- passingScore: Minimum score to pass
- maxAttempts: Number of allowed attempts
- showAnswers: Show correct answers after?
- isPublished: Publication status
- dueDate: Optional deadline
- timestamps: createdAt, updatedAt
```

**Relations:**

- Course
- Teacher creator
- Questions
- Student attempts

---

### 10. **QuizQuestion**

```prisma
- id, quizId: Identification
- question: Question text
- type: MULTIPLE_CHOICE | TRUE_FALSE | SHORT_ANSWER | ESSAY
- options: Answer choices (array)
- correctAnswer: Correct answer
- points: Question weight
- orderIndex: Question sequence
- explanation: Answer explanation
```

---

### 11. **QuizAttempt**

```prisma
- id, quizId, studentId: Identification
- score: Points earned
- totalPoints: Maximum possible
- passed: Pass/fail status
- startedAt: Start time
- completedAt: End time
- timeSpent: Duration in seconds
```

**Relations:**

- Quiz
- Student
- Answers submitted

---

### 12. **QuizAnswer**

```prisma
- attemptId, questionId: Identification
- answer: Student's answer
- isCorrect: Correctness flag
- pointsEarned: Points awarded
```

---

### 13. **Enrollment**

```prisma
- studentId, courseId: Enrollment keys
- progress: Completion percentage (0-100)
- status: ACTIVE | COMPLETED | DROPPED | SUSPENDED
- completedAt: Completion date
- certificateIssued: Certificate status
- timestamps: createdAt, updatedAt
```

---

### 14. **Announcement**

```prisma
- id, courseId, teacherId: Identification
- title: Announcement title
- content: Announcement body
- isPinned: Pin to top?
- timestamps: createdAt, updatedAt
```

---

### 15. **Review**

```prisma
- studentId, courseId, teacherId: Keys
- rating: 1-5 star rating
- comment: Review text
- timestamps: createdAt, updatedAt
```

---

### 16. **Notification**

```prisma
- id, userId: Identification
- type: ASSIGNMENT | QUIZ | GRADE | ANNOUNCEMENT | MESSAGE | REMINDER
- title: Notification title
- message: Notification body
- isRead: Read status
- link: Related URL
- createdAt: Timestamp
```

---

### 17. **Message**

```prisma
- id, senderId, receiverId: Identification
- subject: Message subject
- content: Message body
- isRead: Read status
- createdAt: Timestamp
```

---

### 18. **Payment**

```prisma
- id, userId: Identification
- amount: Payment amount
- method: Payment method
- description: Payment details
- status: PENDING | COMPLETED | FAILED | REFUNDED
- transactionId: External transaction ID
- courseId: Related course (optional)
- createdAt: Timestamp
```

---

### 19. **Certificate**

```prisma
- studentId, courseId: Keys
- certificateUrl: PDF/Image URL
- issuedAt: Issue date
```

---

### 20. **Favorite**

```prisma
- studentId, courseId: Keys
- createdAt: Timestamp
```

---

### 21. **Category**

```prisma
- id: Unique identifier
- name: Category name (unique)
- description: Category description
- icon: Category icon
- slug: URL-friendly name (unique)
- createdAt: Timestamp
```

---

### 22. **CourseCategory** (Junction Table)

```prisma
- courseId, categoryId: Keys
```

---

## 🔐 Enums

### Role

- `STUDENT`: Student user
- `TEACHER`: Teacher/Instructor user
- `ADMIN`: Administrator user

### QuizType

- `MULTIPLE_CHOICE`: Multiple choice questions
- `TRUE_FALSE`: True/False questions
- `SHORT_ANSWER`: Short text answers
- `ESSAY`: Long form essays

### AssignmentStatus

- `PENDING`: Awaiting submission
- `SUBMITTED`: Submitted, awaiting grading
- `GRADED`: Graded with feedback
- `LATE`: Late submission

### EnrollmentStatus

- `ACTIVE`: Currently enrolled
- `COMPLETED`: Course completed
- `DROPPED`: Student dropped course
- `SUSPENDED`: Enrollment suspended

### NotificationType

- `ASSIGNMENT`: Assignment-related
- `QUIZ`: Quiz-related
- `GRADE`: Grade notification
- `ANNOUNCEMENT`: Course announcement
- `MESSAGE`: Direct message
- `REMINDER`: Deadline reminder

### PaymentStatus

- `PENDING`: Payment pending
- `COMPLETED`: Payment successful
- `FAILED`: Payment failed
- `REFUNDED`: Payment refunded

---

## 🚀 Usage Examples

### Create a new course

```typescript
const course = await prisma.course.create({
  data: {
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS, and JavaScript",
    price: 299.99,
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    teacherId: teacherProfile.id,
    isPublished: true,
  },
});
```

### Enroll a student

```typescript
const enrollment = await prisma.enrollment.create({
  data: {
    studentId: student.id,
    courseId: course.id,
    status: "ACTIVE",
  },
});
```

### Create an assignment

```typescript
const assignment = await prisma.assignment.create({
  data: {
    courseId: course.id,
    teacherId: teacher.id,
    title: "Build a Landing Page",
    description: "Create a responsive landing page",
    dueDate: new Date("2025-11-01"),
    maxPoints: 100,
  },
});
```

### Submit assignment

```typescript
const submission = await prisma.assignmentSubmission.create({
  data: {
    assignmentId: assignment.id,
    studentId: student.id,
    content: "Project completed",
    attachments: ["https://example.com/project.zip"],
    status: "SUBMITTED",
  },
});
```

### Create a quiz

```typescript
const quiz = await prisma.quiz.create({
  data: {
    courseId: course.id,
    teacherId: teacher.id,
    title: "JavaScript Fundamentals Quiz",
    timeLimit: 30,
    passingScore: 70,
    questions: {
      create: [
        {
          question: "What is JavaScript?",
          type: "MULTIPLE_CHOICE",
          options: ["A language", "A framework", "A database"],
          correctAnswer: "A language",
          points: 10,
          orderIndex: 1,
        },
      ],
    },
  },
});
```

---

## 🔄 Migration Commands

```bash
# Validate schema
npx prisma validate

# Format schema
npx prisma format

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name add_full_lms_features

# Apply migrations to production
npx prisma migrate deploy

# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## 📝 Notes

1. **Cascade Deletes**: Many relations use `onDelete: Cascade` to maintain referential integrity
2. **Unique Constraints**: Composite unique constraints prevent duplicate enrollments, submissions, etc.
3. **Timestamps**: Most models include `createdAt` and `updatedAt` for audit trails
4. **Arrays**: PostgreSQL arrays used for tags, resources, and options
5. **Text Fields**: `@db.Text` used for potentially large content fields
6. **Indexing**: Consider adding `@@index` for frequently queried fields

---

## 🎓 Complete Feature Set

✅ User Authentication & Authorization
✅ Role-Based Access Control
✅ Course Management (CRUD)
✅ Lesson Management
✅ Assignment System (Create, Submit, Grade)
✅ Quiz System (Multiple Types)
✅ Progress Tracking
✅ Enrollment Management
✅ Payment Processing
✅ Certificate Generation
✅ Reviews & Ratings
✅ Announcements
✅ Direct Messaging
✅ Notifications
✅ Favorites/Wishlist
✅ Categories & Tags
✅ Resource Management
✅ Analytics Data Points

---

## 🎯 Next Steps

1. Run migrations to create database tables
2. Generate Prisma Client
3. Implement API routes for each model
4. Create frontend components
5. Add authentication middleware
6. Implement file upload service
7. Set up email notifications
8. Add real-time features with WebSockets
9. Implement search functionality
10. Add analytics and reporting

---

**Last Updated**: October 20, 2025
**Schema Version**: 2.0
**Total Models**: 22
