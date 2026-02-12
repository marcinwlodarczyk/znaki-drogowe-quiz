'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import CategorySelection from '@/components/CategorySelection';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import HighScores from '@/components/HighScores';

type GameState = 'welcome' | 'category' | 'quiz' | 'results' | 'highscores';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizResults, setQuizResults] = useState({ score: 0, total: 0 });

  const handleStart = (name: string) => {
    setUsername(name);
    setGameState('category');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setGameState('quiz');
  };

  const handleQuizFinish = (score: number, total: number) => {
    setQuizResults({ score, total });
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameState('quiz');
  };

  const handleChangeCategory = () => {
    setGameState('category');
  };

  const handleShowHighScores = () => {
    setGameState('highscores');
  };

  const handleBackFromHighScores = () => {
    // If we came from results, go back to results. Otherwise, go to welcome
    if (quizResults.total > 0) {
      setGameState('results');
    } else {
      setGameState('welcome');
    }
  };

  const handleShowHighScoresFromWelcome = () => {
    setGameState('highscores');
  };

  const handleBackToWelcome = () => {
    setGameState('welcome');
  };

  const handleBackFromQuiz = () => {
    setGameState('category');
  };

  return (
    <>
      {gameState === 'welcome' && (
        <WelcomeScreen
          onStart={handleStart}
          onShowHighScores={handleShowHighScoresFromWelcome}
        />
      )}

      {gameState === 'category' && (
        <CategorySelection
          username={username}
          onCategorySelect={handleCategorySelect}
          onBack={handleBackToWelcome}
        />
      )}

      {gameState === 'quiz' && (
        <Quiz
          categoryId={selectedCategory}
          username={username}
          onFinish={handleQuizFinish}
          onBack={handleBackFromQuiz}
        />
      )}

      {gameState === 'results' && (
        <Results
          username={username}
          categoryId={selectedCategory}
          score={quizResults.score}
          totalQuestions={quizResults.total}
          onPlayAgain={handlePlayAgain}
          onChangeCategory={handleChangeCategory}
          onShowHighScores={handleShowHighScores}
        />
      )}

      {gameState === 'highscores' && (
        <HighScores onBack={handleBackFromHighScores} />
      )}
    </>
  );
}