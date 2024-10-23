import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        onClick={handlePrev}
        className={`px-4 py-2 bg-gray-500 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>

      <button
        onClick={handleNext}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
