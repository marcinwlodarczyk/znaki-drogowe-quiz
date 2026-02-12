'use client';

import { useHighScores } from '@/lib/hooks/useLocalStorage';
import { categories } from '@/lib/roadSignsData';

interface HighScoresProps {
  onBack: () => void;
}

export default function HighScores({ onBack }: HighScoresProps) {
  const [highScores] = useHighScores();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  const groupedScores = categories.reduce((acc, category) => {
    acc[category.id] = highScores
      .filter(score => score.category === category.id)
      .slice(0, 10);
    return acc;
  }, {} as Record<string, typeof highScores>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Najlepsze Wyniki
          </h2>
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Powrót
          </button>
        </div>

        {Object.entries(groupedScores).map(([categoryId, scores]) => {
          if (scores.length === 0) return null;

          return (
            <div key={categoryId} className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-3">
                {getCategoryName(categoryId)}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-left">Gracz</th>
                      <th className="px-3 py-2 text-center">Wynik</th>
                      <th className="px-3 py-2 text-center">%</th>
                      <th className="px-3 py-2 text-left hidden md:table-cell">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => {
                      const percentage = Math.round((score.score / score.totalQuestions) * 100);
                      return (
                        <tr
                          key={`${score.username}-${score.date}`}
                          className={`border-b ${index === 0 ? 'bg-yellow-50' : ''}`}
                        >
                          <td className="px-3 py-2">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </td>
                          <td className="px-3 py-2 font-medium">{score.username}</td>
                          <td className="px-3 py-2 text-center">
                            {score.score}/{score.totalQuestions}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <span
                              className={`font-bold ${
                                percentage >= 80 ? 'text-green-600' :
                                percentage >= 60 ? 'text-blue-600' :
                                percentage >= 40 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}
                            >
                              {percentage}%
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-600 hidden md:table-cell">
                            {formatDate(score.date)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {highScores.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Brak wyników do wyświetlenia</p>
            <p className="text-gray-500 text-sm mt-2">Zagraj w quiz, aby zapisać swój wynik!</p>
          </div>
        )}
      </div>
    </div>
  );
}