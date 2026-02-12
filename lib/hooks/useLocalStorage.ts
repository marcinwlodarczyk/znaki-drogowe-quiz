import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export interface HighScore {
  username: string;
  category: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export function useHighScores(): [HighScore[], (newScore: HighScore) => void] {
  const [highScores, setHighScores] = useLocalStorage<HighScore[]>('highScores', []);

  const addHighScore = (newScore: HighScore) => {
    const updatedScores = [...highScores, newScore];
    // Sort by score percentage (score/totalQuestions)
    updatedScores.sort((a, b) => (b.score / b.totalQuestions) - (a.score / a.totalQuestions));
    // Keep only top 10 scores per category
    const filteredScores: HighScore[] = [];
    const categoryCounts: { [key: string]: number } = {};

    for (const score of updatedScores) {
      if (!categoryCounts[score.category]) {
        categoryCounts[score.category] = 0;
      }
      if (categoryCounts[score.category] < 10) {
        filteredScores.push(score);
        categoryCounts[score.category]++;
      }
    }

    setHighScores(filteredScores);
  };

  return [highScores, addHighScore];
}