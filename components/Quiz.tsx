'use client';

import { useState, useEffect } from 'react';
import { RoadSign, generateOptions, getSignsByCategory, categories } from '@/lib/roadSignsData';
import Image from 'next/image';

interface QuizProps {
  categoryId: string;
  username: string;
  onFinish: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

export default function Quiz({ categoryId, username, onFinish, onBack }: QuizProps) {
  const [signs, setSigns] = useState<RoadSign[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const category = categories.find(c => c.id === categoryId);
  const currentSign = signs[currentIndex];

  useEffect(() => {
    const categorySignsigns = getSignsByCategory(categoryId);
    const shuffled = [...categorySignsigns].sort(() => Math.random() - 0.5);
    setSigns(shuffled);
  }, [categoryId]);

  useEffect(() => {
    if (currentSign && !showResult) {
      const allSigns = getSignsByCategory(categoryId);
      setOptions(generateOptions(currentSign, allSigns));
      setTimeLeft(15);
      setSelectedAnswer(null);
    }
  }, [currentSign, categoryId, showResult]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleTimeout();
    }
  }, [timeLeft, selectedAnswer, showResult]);

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);
    setTimeout(() => nextQuestion(false), 2000);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentSign.name;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => nextQuestion(correct), 2000);
  };

  const nextQuestion = (wasCorrect: boolean = false) => {
    if (currentIndex < signs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      // Use the updated score for the last question
      const finalScore = wasCorrect ? score + 1 : score;
      onFinish(finalScore, signs.length);
    }
  };

  if (!currentSign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Ładowanie...</div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / signs.length) * 100;
  const timeProgress = (timeLeft / 15) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Wyjdź
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-600">{category?.name}</p>
            <p className="text-xs text-gray-500">
              Pytanie {currentIndex + 1} z {signs.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Wynik: {score}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Czas:</span>
            <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-800'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${timeProgress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Co oznacza ten znak?
          </h3>

          {/* Road sign image */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-lg p-2">
              <Image
                src={currentSign.imageUrl}
                alt={currentSign.name}
                width={160}
                height={160}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option, index) => {
            let buttonClass = "p-3 rounded-lg font-medium transition-all duration-200 text-left ";

            if (showResult) {
              if (option === currentSign.name) {
                buttonClass += "bg-green-500 text-white";
              } else if (option === selectedAnswer && !isCorrect) {
                buttonClass += "bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-200 text-gray-600";
              }
            } else if (selectedAnswer === option) {
              buttonClass += "bg-blue-500 text-white";
            } else {
              buttonClass += "bg-gray-100 hover:bg-gray-200 text-gray-800";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showResult || selectedAnswer !== null}
                className={buttonClass}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showResult && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p className="font-bold">
              {isCorrect ? '✓ Dobrze!' : '✗ Źle!'}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1">
                Prawidłowa odpowiedź: {currentSign.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}