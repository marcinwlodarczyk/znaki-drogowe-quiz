#!/usr/bin/env node

/**
 * Script to clear highscores from the quiz application
 *
 * Usage:
 *   node scripts/clear-highscores.js          # Clear all highscores
 *   node scripts/clear-highscores.js --all    # Clear all highscores
 *   node scripts/clear-highscores.js warning  # Clear only warning category highscores
 */

const readline = require('readline');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

async function clearHighscores(category = null) {
  const urlString = category
    ? `${API_BASE_URL}/api/highscores?category=${category}`
    : `${API_BASE_URL}/api/highscores`;

  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const client = url.protocol === 'https:' ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 3000),
      path: url.pathname + url.search,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            console.log('✅', parsed.message || 'Highscores cleared');

            if (category) {
              console.log(`   Category: ${category}`);
            } else {
              console.log('   All categories cleared');
            }
            resolve();
          } catch (error) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`HTTP error! status: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  }).catch((error) => {
    console.error('❌ Error clearing highscores:', error.message);
    console.error('   Make sure the server is running (npm run dev)');
    process.exit(1);
  });
}

async function confirmAction(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const category = args[0] && args[0] !== '--all' ? args[0] : null;

  console.log('🎮 Quiz Highscores Cleaner');
  console.log('─'.repeat(30));

  if (category) {
    console.log(`📁 Target: ${category} category`);
  } else {
    console.log('📁 Target: ALL categories');
  }

  const confirmed = await confirmAction(
    category
      ? `Are you sure you want to clear highscores for "${category}" category?`
      : 'Are you sure you want to clear ALL highscores?'
  );

  if (confirmed) {
    await clearHighscores(category);
  } else {
    console.log('❌ Operation cancelled');
  }
}

// Run the script
main().catch(console.error);