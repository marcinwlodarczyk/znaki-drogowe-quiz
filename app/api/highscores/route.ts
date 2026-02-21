import { getRedisClient } from '@/lib/redis';
import { NextResponse } from 'next/server';

export interface HighScore {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: number;
  categoryId: string;
}

const HIGH_SCORES_KEY_PREFIX = 'quiz:highscores';
const MAX_HIGH_SCORES = 10;

function getHighScoresKey(categoryId?: string): string {
  return categoryId
    ? `${HIGH_SCORES_KEY_PREFIX}:${categoryId}`
    : `${HIGH_SCORES_KEY_PREFIX}:all`;
}

export async function GET(request: Request) {
  try {
    const redis = await getRedisClient();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category') || undefined;

    const key = getHighScoresKey(categoryId);

    // Get top scores (sorted by percentage descending)
    const scores = await redis.zRange(key, 0, MAX_HIGH_SCORES - 1, {
      REV: true,
    });

    // Parse the JSON strings back to objects
    const parsedScores = scores
      .map((scoreStr) => {
        try {
          return JSON.parse(scoreStr);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json(parsedScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const redis = await getRedisClient();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category') || undefined;

    if (categoryId) {
      // Clear specific category highscores
      const key = getHighScoresKey(categoryId);
      await redis.del(key);
    } else {
      // Clear all highscores
      const keys = await redis.keys(`${HIGH_SCORES_KEY_PREFIX}:*`);
      if (keys.length > 0) {
        await redis.del(keys);
      }
    }

    return NextResponse.json({ success: true, message: 'Highscores cleared' });
  } catch (error) {
    console.error('Error clearing high scores:', error);
    return NextResponse.json(
      { error: 'Failed to clear high scores' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const redis = await getRedisClient();
    const { name, score, totalQuestions, categoryId } = await request.json();

    if (!name || score === undefined || !totalQuestions || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const percentage = (score / totalQuestions) * 100;
    const timestamp = Date.now();

    // Create a unique key for deduplication (based on name, score, category)
    // Use a 5-second window to catch rapid duplicate saves from React StrictMode or double-submits
    const timeWindow = Math.floor(timestamp / 5000) * 5000; // 5-second window
    const dedupeKey = `dedupe:${name}:${score}:${totalQuestions}:${categoryId}:${timeWindow}`;

    // Check if this score was recently saved (within the same time window)
    const recentlySaved = await redis.get(dedupeKey);
    if (recentlySaved) {
      console.log('Duplicate score detected, skipping save:', { name, score, categoryId, timeWindow });
      return NextResponse.json({ success: true, deduplicated: true });
    }

    // Set the deduplication key with 10 second expiry to prevent duplicates
    await redis.set(dedupeKey, '1', { EX: 10 });

    const highScore: HighScore = {
      name,
      score,
      totalQuestions,
      percentage,
      timestamp,
      categoryId,
    };

    const scoreString = JSON.stringify(highScore);

    // Add score to category-specific sorted set
    const categoryKey = getHighScoresKey(categoryId);
    await redis.zAdd(categoryKey, {
      score: percentage,
      value: scoreString,
    });

    // Also add to global highscores
    const globalKey = getHighScoresKey();
    await redis.zAdd(globalKey, {
      score: percentage,
      value: scoreString,
    });

    // Keep only top scores for category-specific key
    const categoryCount = await redis.zCard(categoryKey);
    if (categoryCount > MAX_HIGH_SCORES) {
      await redis.zPopMin(categoryKey);
    }

    // Keep only top scores for global key
    const globalCount = await redis.zCard(globalKey);
    if (globalCount > MAX_HIGH_SCORES) {
      await redis.zPopMin(globalKey);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving high score:', error);
    return NextResponse.json(
      { error: 'Failed to save high score' },
      { status: 500 },
    );
  }
}
