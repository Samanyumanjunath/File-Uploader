
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DropZone from './DropZone';
import FileItem from './FileItem';
import { uploadFileMock } from '../utils/mockApi';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  
  const updateFileStatus = (id, status, progress, error = null) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.id === id ? { ...f, status, progress, error } : f
      )
    );
  };

  const startUpload = async (fileEntry) => {
    try {
      
      await uploadFileMock(fileEntry.file, (progress) => {
        updateFileStatus(fileEntry.id, 'UPLOADING', progress);
      });

      
      updateFileStatus(fileEntry.id, 'COMPLETED', 100);
      toast.success(`${fileEntry.file.name} uploaded!`);

    } catch (err) {
      
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

    newFileEntries.forEach((entry) => startUpload(entry));
  };

  const handleCancel = (id) => {
   
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