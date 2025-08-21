import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import HistoryModal from './components/HistoryModal';
import ErrorModal from './components/ErrorModal';
import SuccessModal from './components/SuccessModal';
import FoodDisplay from './components/FoodDisplay';
import SearchBar from './components/SearchBar';
import placeholderImg from './assets/placeholder.jpg';

interface FoodData {
  id?: number;
  name: string;
  description: string | null;
  ingredients: string;
  benefits: string;
  imageUrl: string;
}

const placeholderData: FoodData = {
  name: 'idly',
  description: 'Idli is a savory rice cake, originating from South India, popular as a breakfast food.',
  ingredients: 'Rice, Urad dal (black lentils), Fenugreek seeds, Salt, Water',
  benefits: 'Steamed (low oil), Easy to digest, Good source of carbohydrates and protein, Gluten-free (typically)',
  imageUrl: placeholderImg,
};

const App: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (data: FoodData) => {
    setFoodData(data);
  };

  const handleError = (msg: string) => {
    setErrorMessage(msg);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-4 sm:p-6 transition-colors duration-500">
      <header className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-800 dark:text-green-300 mb-4 sm:mb-0 tracking-tight">
          Food Lens
        </h1>
        <div className="flex gap-2 sm:gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setShowHistory(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
              >
                History
              </button>
              <button
                onClick={logout}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      <main className="w-full max-w-5xl">
        {!isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Welcome to Food Lens
            </h2>
            <p className="mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Login to search for foods and view details. Here's an example:
            </p>
            <FoodDisplay data={placeholderData} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <SearchBar onSearch={handleSearch} onError={handleError} />
            {foodData && <FoodDisplay data={foodData} />}
          </div>
        )}
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onError={handleError} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} onError={handleError} onSuccess={handleRegisterSuccess} />
      <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} onError={handleError} onSelectFood={setFoodData} />
      <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          setShowLogin(true);
        }}
        message="Registered successfully, please login to continue."
      />
    </div>
  );
};

export default App;