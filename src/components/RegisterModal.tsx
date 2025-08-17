import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onError: (msg: string) => void;
  onSuccess: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onError, onSuccess }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
      onSuccess();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        const message = err.response.data.message;
        console.error('Search error:', err);
        onError(message);
      } else {
        onError('Registration failed. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-green-300 dark:border-green-700">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-200 tracking-tight">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-green-300 dark:border-green-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-green-300 dark:border-green-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm sm:text-base text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-transform transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;