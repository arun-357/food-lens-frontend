import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface FoodData {
  id?: number;
  name: string;
  description: string | null;
  ingredients: string;
  benefits: string;
  imageUrl: string;
}

interface SearchBarProps {
  onSearch: (data: FoodData) => void;
  onError: (msg: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onError }) => {
  const { incrementUsage } = useAuth();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`/food/search?name=${query}`);
      onSearch(res.data);
      incrementUsage();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        const message = err.response.data.message;
        console.error('Search error:', err);
        onError(message);
      } else {
        onError('Food not found or search failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        disabled={isLoading}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm sm:text-base flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Search'
        )}
      </button>
    </div>
  );
};

export default SearchBar;