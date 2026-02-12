'use client';

import { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onStart: (username: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if username exists in localStorage
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Proszę podać imię');
      return;
    }

    if (username.trim().length < 2) {
      setError('Imię musi mieć co najmniej 2 znaki');
      return;
    }

    // Save username to localStorage
    localStorage.setItem('username', username.trim());
    onStart(username.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-4">
              <span className="text-white text-3xl font-bold">🚦</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz - Znaki Drogowe
          </h1>
          <p className="text-gray-600">
            Sprawdź swoją wiedzę o polskich znakach drogowych
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Jak masz na imię?
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
              placeholder="Wpisz swoje imię"
              maxLength={20}
              autoComplete="off"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Rozpocznij Quiz
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Quiz zawiera pytania o znaki: ostrzegawcze, zakazu, nakazu i informacyjne
          </p>
        </div>
      </div>
    </div>
  );
}