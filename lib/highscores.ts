import { HighScore } from '@/app/api/highscores/route';

export async function fetchHighScores(): Promise<HighScore[]> {
  try {
    const response = await fetch('/api/highscores');
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
  totalQuestions: number
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
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
}