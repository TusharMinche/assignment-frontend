import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchReportById, deleteReport, clearCurrentReport } from '../redux/slices/creditReportSlice';
import BasicDetails from '../components/report/BasicDetails';
import CreditScore from '../components/report/CreditScore';
import ReportSummary from '../components/report/ReportSummary';
import CreditAccountsList from '../components/report/CreditAccountsList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const ReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentReport, loading, error } = useAppSelector(
    (state) => state.creditReports
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchReportById(id));
    }

    return () => {
      dispatch(clearCurrentReport());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await dispatch(deleteReport(id)).unwrap();
        navigate('/reports');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (loading) {
    return <Loader text="Loading report details..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => dispatch(fetchReportById(id))} 
      />
    );
  }

  if (!currentReport) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Report not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/reports')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <FiArrowLeft />
            <span>Back to Reports</span>
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
        >
          <FiTrash2 />
          <span>Delete Report</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Credit Report - {currentReport.basicDetails?.fullName}
      </h1>

      {/* Report Sections */}
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BasicDetails basicDetails={currentReport.basicDetails} />
          </div>
          <div>
            <CreditScore creditScore={currentReport.creditScore} />
          </div>
        </div>

        <ReportSummary reportSummary={currentReport.reportSummary} />

        <CreditAccountsList creditAccounts={currentReport.creditAccounts} />
      </div>
    </div>
  );
};

export default ReportDetailPage;