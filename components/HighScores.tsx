'use client';

import { useEffect, useState } from 'react';
import { fetchHighScores } from '@/lib/highscores';
import { HighScore } from '@/app/api/highscores/route';

interface HighScoresProps {
  onBack: () => void;
}

export default function HighScores({ onBack }: HighScoresProps) {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        setLoading(true);
        const scores = await fetchHighScores();
        setHighScores(scores);
      } catch (err) {
        setError(true);
        console.error('Failed to load high scores:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHighScores();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            🏆 Najlepsze Wyniki
          </h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Powrót
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Ładowanie wyników...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">Nie udało się załadować wyników</p>
          </div>
        )}

        {!loading && !error && highScores.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Brak wyników do wyświetlenia</p>
            <p className="text-gray-500 text-sm mt-2">Zagraj w quiz, aby dodać swój wynik!</p>
          </div>
        )}

        {!loading && !error && highScores.length > 0 && (
          <div className="space-y-3">
            {highScores.map((score, index) => {
              const isTopThree = index < 3;
              const medalEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isTopThree
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-gray-700 w-10 text-center">
                      {medalEmoji || `${index + 1}.`}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{score.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(score.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">
                      {score.score}/{score.totalQuestions}
                    </p>
                    <p className={`text-sm font-semibold ${
                      score.percentage >= 80 ? 'text-green-600' :
                      score.percentage >= 60 ? 'text-blue-600' :
                      score.percentage >= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {score.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}