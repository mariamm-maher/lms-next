'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, FileVideo, FileText, Image } from 'lucide-react';
import { useTeacherStore } from '@/app/store/useTeacherStore';
import { courseService } from '@/services/courseService';
import toast from 'react-hot-toast';

interface LessonUploaderProps {
  onUploadComplete?: (url: string) => void;
}

export default function LessonUploader({ onUploadComplete }: LessonUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadProgress, addUpload, updateUploadProgress, completeUpload, failUpload } = useTeacherStore();

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) return FileVideo;
    if (type.startsWith('image/')) return Image;
    return FileText;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFileUpload);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(handleFileUpload);
  };

  const handleFileUpload = async (file: File) => {
    // Add to upload progress
    addUpload({
      fileName: file.name,
      progress: 0,
      status: 'uploading',
    });

    try {
      const url = await courseService.uploadMedia(file, (progress) => {
        updateUploadProgress(file.name, progress);
      });

      completeUpload(file.name, url);
      toast.success(`${file.name} uploaded successfully!`);
      
      if (onUploadComplete) {
        onUploadComplete(url);
      }
    } catch (error) {
      failUpload(file.name, error instanceof Error ? error.message : 'Upload failed');
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 bg-gray-50 hover:border-indigo-400'
          }
        `}
      >
        <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Support for videos, PDFs, images (max 100MB)
        </p>
        <input
          type="file"
          multiple
          accept="video/*,application/pdf,image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <Upload className="w-5 h-5" />
          <span className="font-medium">Select Files</span>
        </label>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">Upload Progress</h3>
          {uploadProgress.map((upload) => {
            const Icon = getFileIcon(upload.fileName);
            return (
              <div key={upload.fileName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-900 truncate">
                      {upload.fileName}
                    </span>
                  </div>
                  {upload.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {upload.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      upload.status === 'completed'
                        ? 'bg-green-500'
                        : upload.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
                {upload.status === 'error' && upload.error && (
                  <p className="text-xs text-red-600">{upload.error}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
