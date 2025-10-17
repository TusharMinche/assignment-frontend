import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiList, FiCheckCircle, FiShield, FiZap } from 'react-icons/fi';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiUpload,
      title: 'Easy Upload',
      description: 'Upload Experian XML files with drag-and-drop or file browser',
    },
    {
      icon: FiZap,
      title: 'Fast Processing',
      description: 'Instant XML parsing and data extraction',
    },
    {
      icon: FiShield,
      title: 'Secure Storage',
      description: 'All reports stored securely in MongoDB',
    },
    {
      icon: FiCheckCircle,
      title: 'Detailed Reports',
      description: 'View comprehensive credit report breakdowns',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            Credit Report Management System
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Upload, process, and analyze Experian credit reports with ease. Get detailed insights into credit scores, account summaries, and financial history.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/upload')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Upload Report
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition border-2 border-white"
            >
              View All Reports
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Why Choose CreditSea?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Upload XML File
            </h3>
            <p className="text-gray-600">
              Upload your Experian credit report XML file through our secure interface
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Automatic Processing
            </h3>
            <p className="text-gray-600">
              Our system automatically extracts and processes all credit information
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              View & Analyze
            </h3>
            <p className="text-gray-600">
              Access detailed reports with insights on credit score and accounts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;