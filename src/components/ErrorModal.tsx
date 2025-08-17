import React from 'react';

interface ErrorModalProps {
  message: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-bento-light dark:bg-bento-dark p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-green-200 dark:border-green-800">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-red-600 dark:text-red-400 tracking-tight">Error</h2>
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;