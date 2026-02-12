# Quiz - Znaki Drogowe

Mobile-first quiz application for learning Polish road signs, built with React, Next.js, and Tailwind CSS.

## Features

- 📱 Mobile-friendly responsive design
- 🚦 Four categories of Polish road signs:
  - Znaki ostrzegawcze (Warning signs)
  - Znaki zakazu (Prohibition signs)
  - Znaki nakazu (Mandatory signs)
  - Znaki informacyjne (Information signs)
- ⏱️ 15-second timer per question
- 📊 Score tracking and high score table
- 💾 Local storage for username and scores
- 🎯 Visual feedback for correct/incorrect answers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd znaki-drogowe-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

Or deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/znaki-drogowe-quiz)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Game Flow

1. **Welcome Screen** - Enter username (stored in localStorage)
2. **Category Selection** - Choose sign category to practice
3. **Quiz** - Answer questions with 15-second timer
4. **Results** - View score and percentage
5. **High Scores** - Track best performances

## Data Structure

The app includes comprehensive Polish road sign data:
- 20 warning signs (znaki ostrzegawcze)
- 15 prohibition signs (znaki zakazu)
- 15 mandatory signs (znaki nakazu)
- 16 information signs (znaki informacyjne)

## License

MIT