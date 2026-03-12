'use client';

import { categories, getSignsByCategory } from '@/lib/roadSignsData';

interface CategorySelectionProps {
  username: string;
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
}

export default function CategorySelection({
  username,
  onCategorySelect,
  onBack,
}: CategorySelectionProps) {
  const categoryColors = {
    ostrzegawcze: 'from-yellow-500 to-orange-500',
    zakazu: 'from-red-500 to-red-600',
    nakazu: 'from-blue-500 to-blue-600',
    informacyjne: 'from-green-500 to-green-600',
    poziome: 'from-gray-500 to-gray-600',
  };

  const categoryIcons = {
    ostrzegawcze: '⚠️',
    zakazu: '🚫',
    nakazu: '➡️',
    informacyjne: 'ℹ️',
    poziome: '🛣️',
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex flex-col items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl w-full'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Witaj, {username}!
          </h2>
          <p className='text-gray-600'>Wybierz kategorię znaków drogowych</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          {categories.map((category) => {
            const signCount = getSignsByCategory(category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`bg-gradient-to-r ${categoryColors[category.id as keyof typeof categoryColors]} text-white rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl`}
              >
                <div className='flex flex-col items-center'>
                  <span className='text-4xl mb-3'>
                    {categoryIcons[category.id as keyof typeof categoryIcons]}
                  </span>
                  <h3 className='text-xl font-bold mb-2'>{category.name}</h3>
                  <p className='text-sm opacity-90 mb-2'>
                    {category.description}
                  </p>
                  <p className='text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full'>
                    {signCount} znaków
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onBack}
          className='w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200'
        >
          Zmień imię
        </button>
      </div>
    </div>
  );
}
