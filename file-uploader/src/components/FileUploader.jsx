// src/components/FileUploader.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DropZone from './DropZone';
import FileItem from './FileItem';
import { uploadFileMock } from '../utils/mockApi';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  // Helper to update state safely
  const updateFileStatus = (id, status, progress, error = null) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.id === id ? { ...f, status, progress, error } : f
      )
    );
  };

  const startUpload = async (fileEntry) => {
    try {
      // 1. Start the Async Upload
      // We pass a callback function (p => ...) to update the progress bar live
      await uploadFileMock(fileEntry.file, (progress) => {
        updateFileStatus(fileEntry.id, 'UPLOADING', progress);
      });

      // 2. If await finishes without error, it's a success
      updateFileStatus(fileEntry.id, 'COMPLETED', 100);
      toast.success(`${fileEntry.file.name} uploaded!`);

    } catch (err) {
      // 3. If the mock throws an error (25% chance), catch it here
      updateFileStatus(fileEntry.id, 'FAILED', 0, err.message);
      toast.error(`Error: ${fileEntry.file.name} failed.`);
    }
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFileEntries = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'UPLOADING',
      error: null,
    }));

    setFiles((prev) => [...newFileEntries, ...prev]);

    // Loop through each file and trigger the async function
    newFileEntries.forEach((entry) => startUpload(entry));
  };

  const handleCancel = (id) => {
    // For visual cancelling (Stopping the actual async function mid-flight 
    // requires AbortController, but for this beginner level, we just hide it)
    updateFileStatus(id, 'FAILED', 0, "Cancelled by user");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">File Uploader</h2>
      
      <DropZone onFilesSelected={handleFilesSelected} />

      <div className="mt-6">
        {files.length > 0 && <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Queue</h3>}
        
        <div className="space-y-3">
          {files.map((fileObj) => (
            <FileItem 
              key={fileObj.id} 
              fileObj={fileObj} 
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;