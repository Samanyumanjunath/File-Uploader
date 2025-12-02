
import React from 'react';

const FileItem = ({ fileObj, onCancel }) => {
  const { file, progress, status, error } = fileObj;

  const getStatusColor = () => {
    if (status === 'FAILED') return 'text-red-500';
    if (status === 'COMPLETED') return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm flex items-center justify-between">
      <div className="flex-1 pr-4">
        
        {/* Header: Name + Status */}
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700 truncate w-48" title={file.name}>
            {file.name}
          </span>
          {/* Percentage Indicator */}
          <span className="text-sm font-bold text-gray-500">
            {status === 'FAILED' ? 'Error' : `${Math.round(progress)}%`}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
          <div 
            className={`h-full transition-all duration-300 ${status === 'FAILED' ? 'bg-red-500' : 'bg-blue-600'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Error Message */}
        {error && <p className="text-xs text-red-500 mt-1 font-semibold">{error}</p>}
      </div>

      {/* Cancel Button */}
      {status === 'UPLOADING' && (
        <button 
          onClick={() => onCancel(fileObj.id)}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Cancel Upload"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      
      {/* Success Icon */}
      {status === 'COMPLETED' && (
        <span className="ml-4 text-green-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default FileItem;