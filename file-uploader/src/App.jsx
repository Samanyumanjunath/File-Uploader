
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <FileUploader />
      
     
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;