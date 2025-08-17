import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FoodData {
  id?: number;
  name: string;
  description: string | null;
  ingredients: string;
  benefits: string;
  imageUrl: string;
  food: boolean;
}

interface HistoryItem {
  food: FoodData;
  timestamp: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onError: (msg: string) => void;
  onSelectFood: (data: FoodData) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, onError, onSelectFood }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get('/food/history');
          setHistory(res.data.slice(0, 5));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          onError('Failed to fetch history.');
        }
      };
      fetchHistory();
    }
  }, [isOpen, onError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-bento-light dark:bg-bento-dark p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto border-2 border-green-200 dark:border-green-800">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-gray-800 dark:text-gray-200 tracking-tight">
          Search History (Last 5)
        </h2>
        {history.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">No history yet.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li key={index} className="border-b border-green-200 dark:border-green-800 pb-2">
                <button
                  onClick={() => {
                    onSelectFood(item.food);
                    onClose();
                  }}
                  className="text-left w-full hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base transition-transform transform hover:scale-105"
                >
                  <div className="font-semibold">{item.food.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg text-sm sm:text-base hover:bg-gray-400 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;