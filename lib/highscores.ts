import { HighScore } from '@/app/api/highscores/route';

export async function fetchHighScores(categoryId?: string): Promise<HighScore[]> {
  try {
    const url = categoryId
      ? `/api/highscores?category=${categoryId}`
      : '/api/highscores';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch high scores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return [];
  }
}

export async function saveHighScore(
  name: string,
  score: number,
  totalQuestions: number,
  categoryId: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/highscores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        score,
        totalQuestions,
        categoryId,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
}

export async function clearHighScores(categoryId?: string): Promise<boolean> {
  try {
    const url = categoryId
      ? `/api/highscores?category=${categoryId}`
      : '/api/highscores';
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error clearing high scores:', error);
    return false;
  }
}