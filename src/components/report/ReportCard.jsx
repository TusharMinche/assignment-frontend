import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';
import { formatDateTime } from '../../utils/formatters';

const ReportCard = ({ report, onDelete }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/report/${report._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this report?')) {
      onDelete(report._id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FiUser className="text-xl text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {report.basicDetails?.fullName || 'Unknown'}
            </h3>
            <p className="text-sm text-gray-600">
              PAN: {report.basicDetails?.pan || 'N/A'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {report.creditScore?.score || 0}
          </p>
          <p className="text-xs text-gray-600">Credit Score</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Total Accounts</p>
          <p className="text-lg font-semibold text-gray-800">
            {report.reportSummary?.totalAccounts || 0}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Active</p>
          <p className="text-lg font-semibold text-green-600">
            {report.reportSummary?.activeAccounts || 0}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Closed</p>
          <p className="text-lg font-semibold text-gray-600">
            {report.reportSummary?.closedAccounts || 0}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <FiCalendar />
        <span>Uploaded: {formatDateTime(report.createdAt)}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <FiEye />
          <span>View Details</span>
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default ReportCard;