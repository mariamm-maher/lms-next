// Teacher Dashboard UI State Store
import { create } from 'zustand';
import { UploadProgress } from '@/types/teacher';

interface TeacherStore {
  // UI State
  selectedCourseId: number | null;
  setSelectedCourseId: (id: number | null) => void;

  // Upload State
  uploadProgress: UploadProgress[];
  addUpload: (upload: UploadProgress) => void;
  updateUploadProgress: (fileName: string, progress: number) => void;
  completeUpload: (fileName: string, url: string) => void;
  failUpload: (fileName: string, error: string) => void;
  clearUploads: () => void;

  // Filters
  studentFilter: string;
  setStudentFilter: (filter: string) => void;
  
  courseFilter: string;
  setCourseFilter: (filter: string) => void;

  statusFilter: string;
  setStatusFilter: (filter: string) => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  // UI State
  selectedCourseId: null,
  setSelectedCourseId: (id) => set({ selectedCourseId: id }),

  // Upload State
  uploadProgress: [],
  addUpload: (upload) =>
    set((state) => ({
      uploadProgress: [...state.uploadProgress, upload],
    })),
  updateUploadProgress: (fileName, progress) =>
    set((state) => ({
      uploadProgress: state.uploadProgress.map((upload) =>
        upload.fileName === fileName ? { ...upload, progress } : upload
      ),
    })),
  completeUpload: (fileName, url) =>
    set((state) => ({
      uploadProgress: state.uploadProgress.map((upload) =>
        upload.fileName === fileName
          ? { ...upload, progress: 100, status: 'completed', url }
          : upload
      ),
    })),
  failUpload: (fileName, error) =>
    set((state) => ({
      uploadProgress: state.uploadProgress.map((upload) =>
        upload.fileName === fileName
          ? { ...upload, status: 'error', error }
          : upload
      ),
    })),
  clearUploads: () => set({ uploadProgress: [] }),

  // Filters
  studentFilter: '',
  setStudentFilter: (filter) => set({ studentFilter: filter }),

  courseFilter: '',
  setCourseFilter: (filter) => set({ courseFilter: filter }),

  statusFilter: 'all',
  setStatusFilter: (filter) => set({ statusFilter: filter }),

  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
