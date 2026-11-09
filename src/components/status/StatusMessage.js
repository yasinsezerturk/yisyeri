import React from 'react';

const StatusMessage = ({ 
  loading = false, 
  error = null, 
  data = null, 
  emptyMessage = "Henüz hiç veri bulunmamaktadır.",
  type = "default"
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        {type === "minimal" ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-lg">Yükleniyor...</p>
          </>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p className="text-red-500 text-lg font-medium">{typeof error === "string" ? error : error.message || "Bir hata oluştu."}</p>
        {type === "detailed" && (
          <p className="text-gray-500 mt-2">Lütfen daha sonra tekrar deneyin.</p>
        )}
      </div>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {/*<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>*/}
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return null;
};

export default StatusMessage;