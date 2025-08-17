import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Success</h2>
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded text-sm sm:text-base hover:bg-green-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;