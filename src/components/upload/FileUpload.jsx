import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { uploadCreditReport, clearUploadSuccess } from '../../redux/slices/creditReportSlice';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uploading, uploadSuccess, uploadedReport, error } = useAppSelector(
    (state) => state.creditReports
  );

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file.type === 'text/xml' || file.name.endsWith('.xml')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid XML file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await dispatch(uploadCreditReport(selectedFile)).unwrap();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleViewReport = () => {
    if (uploadedReport && uploadedReport._id) {
      dispatch(clearUploadSuccess());
      navigate(`/report/${uploadedReport._id}`);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (uploadSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Upload Successful!
            </h2>
            <p className="text-gray-600">
              Your credit report has been processed and saved successfully.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Report ID:</strong> {uploadedReport?._id}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Name:</strong> {uploadedReport?.basicDetails?.fullName}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Credit Score:</strong> {uploadedReport?.creditScore?.score}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleViewReport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              View Report Details
            </button>
            <button
              onClick={() => {
                dispatch(clearUploadSuccess());
                setSelectedFile(null);
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Upload Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Credit Report
        </h2>
        <p className="text-gray-600 mb-6">
          Upload an Experian credit report XML file to process and view the details.
        </p>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <>
              <FiUploadCloud className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-700 mb-2">
                Drag and drop your XML file here
              </p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xml,text/xml"
                onChange={handleChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-4">
                Only XML files are accepted
              </p>
            </>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-3">
                <FiFile className="text-2xl text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-800">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                disabled={uploading}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full mt-6 py-3 rounded-lg font-medium transition ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              'Upload and Process'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;