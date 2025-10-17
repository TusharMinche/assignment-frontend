import React from 'react';
import FileUpload from '../components/upload/FileUpload';

const UploadPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Upload Credit Report
        </h1>
        <p className="text-gray-600">
          Upload an Experian credit report XML file to process and analyze the data.
        </p>
      </div>
      <FileUpload />
    </div>
  );
};

export default UploadPage;