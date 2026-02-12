import { getRedisClient } from '@/lib/redis';
import { NextResponse } from 'next/server';

export interface HighScore {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: number;
}

const HIGH_SCORES_KEY = 'quiz:highscores';
const MAX_HIGH_SCORES = 10;

export async function GET() {
  try {
    const redis = await getRedisClient();

    // Get top scores (sorted by score descending)
    const scores = await redis.zRange(HIGH_SCORES_KEY, 0, MAX_HIGH_SCORES - 1, {
      REV: true,
    });

    // Parse the JSON strings back to objects
    const parsedScores = scores.map(scoreStr => {
      try {
        return JSON.parse(scoreStr);
      } catch {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json(parsedScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const redis = await getRedisClient();
    const { name, score, totalQuestions } = await request.json();

    if (!name || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const percentage = (score / totalQuestions) * 100;
    const timestamp = Date.now();

    // Create a unique key for deduplication (based on name, score, and a time window)
    const timeWindow = Math.floor(timestamp / 5000) * 5000; // 5-second window
    const dedupeKey = `dedupe:${name}:${score}:${totalQuestions}:${timeWindow}`;

    // Check if this score was recently saved (within 5 seconds)
    const recentlySaved = await redis.get(dedupeKey);
    if (recentlySaved) {
      return NextResponse.json({ success: true, deduplicated: true });
    }

    // Set the deduplication key with 10 second expiry
    await redis.set(dedupeKey, '1', { EX: 10 });

    const highScore: HighScore = {
      name,
      score,
      totalQuestions,
      percentage,
      timestamp,
    };

    // Add score to sorted set (sorted by percentage)
    await redis.zAdd(HIGH_SCORES_KEY, {
      score: percentage,
      value: JSON.stringify(highScore),
    });

    // Keep only top scores
    const count = await redis.zCard(HIGH_SCORES_KEY);
    if (count > MAX_HIGH_SCORES) {
      // Remove the lowest scores
      await redis.zPopMin(HIGH_SCORES_KEY, count - MAX_HIGH_SCORES);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving high score:', error);
    return NextResponse.json(
      { error: 'Failed to save high score' },
      { status: 500 }
    );
  }
}