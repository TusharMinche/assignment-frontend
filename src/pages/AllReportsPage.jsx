import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllReports, deleteReport } from '../redux/slices/creditReportSlice';
import ReportCard from '../components/report/ReportCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AllReportsPage = () => {
  const dispatch = useAppDispatch();
  const { reports, pagination, loading, error } = useAppSelector(
    (state) => state.creditReports
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllReports({ page: currentPage, limit: 9 }));
  }, [dispatch, currentPage]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReport(id)).unwrap();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <Loader text="Loading reports..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => dispatch(fetchAllReports({ page: currentPage, limit: 9 }))} 
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          All Credit Reports
        </h1>
        <p className="text-gray-600">
          View and manage all uploaded credit reports ({pagination.total} total)
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">No reports found</p>
          <a
            href="/upload"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Your First Report
          </a>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reports.map((report) => (
              <ReportCard
                key={report._id}
                report={report}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FiChevronLeft className="text-xl" />
              </button>

              {[...Array(pagination.pages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className={`p-2 rounded ${
                  currentPage === pagination.pages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllReportsPage;
