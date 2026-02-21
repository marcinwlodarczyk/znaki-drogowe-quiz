'use client';

import { useEffect, useState, useRef } from 'react';
import { saveHighScore } from '@/lib/highscores';
import { categories } from '@/lib/roadSignsData';

interface ResultsProps {
  username: string;
  categoryId: string;
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onChangeCategory: () => void;
  onShowHighScores: () => void;
}

export default function Results({
  username,
  categoryId,
  score,
  totalQuestions,
  onPlayAgain,
  onChangeCategory,
  onShowHighScores,
}: ResultsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const hasSavedRef = useRef(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  const category = categories.find(c => c.id === categoryId);

  // Create a unique key for this specific game result
  const gameKey = `${username}-${score}-${totalQuestions}-${categoryId}`;

  useEffect(() => {
    // Save score to Redis (only once per unique game result)
    let isMounted = true;
    let isAborted = false;

    const saveScore = async () => {
      // Check if we've already saved this specific score
      if (!isMounted || isAborted) return;

      // Check if we already saved this exact game
      const savedKey = sessionStorage.getItem('lastSavedGame');
      if (savedKey === gameKey) {
        console.log('Score already saved for this game');
        setSaveSuccess(true);
        return;
      }

      setIsSaving(true);

      try {
        const success = await saveHighScore(username, score, totalQuestions, categoryId);

        if (!isAborted && isMounted) {
          if (success) {
            // Mark this specific game as saved in session storage
            sessionStorage.setItem('lastSavedGame', gameKey);
          }
          setSaveSuccess(success);
          setIsSaving(false);
        }
      } catch (error) {
        console.error('Error saving score:', error);
        if (!isAborted && isMounted) {
          setSaveSuccess(false);
          setIsSaving(false);
        }
      }
    };

    // Small delay to prevent React StrictMode double-call issues
    const timer = setTimeout(() => {
      if (!isAborted) {
        saveScore();
      }
    }, 100);

    return () => {
      isMounted = false;
      isAborted = true;
      clearTimeout(timer);
    };
  }, [gameKey, username, score, totalQuestions, categoryId]); // Include all dependencies for the unique game

  const getResultMessage = () => {
    if (percentage === 100) return 'Perfekcyjnie! 🏆';
    if (percentage >= 80) return 'Świetnie! 🎉';
    if (percentage >= 60) return 'Dobrze! 👍';
    if (percentage >= 40) return 'Nieźle 😊';
    return 'Spróbuj ponownie 💪';
  };

  const getResultColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Koniec Quizu!
          </h2>
          <p className="text-gray-600 mb-6">{category?.name}</p>

          <div className="mb-8">
            <div className={`text-6xl font-bold mb-2 ${getResultColor()}`}>
              {percentage}%
            </div>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              {score} z {totalQuestions}
            </p>
            <p className="text-xl text-gray-600">
              {getResultMessage()}
            </p>
          </div>

          {/* Visual score representation */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
              <div
                className={`h-6 rounded-full transition-all duration-1000 ${
                  percentage >= 80 ? 'bg-green-500' :
                  percentage >= 60 ? 'bg-blue-500' :
                  percentage >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Zagraj ponownie
            </button>

            <button
              onClick={onChangeCategory}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Zmień kategorię
            </button>

            <button
              onClick={onShowHighScores}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Zobacz najlepsze wyniki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}