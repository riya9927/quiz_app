# React Quiz Application

A dynamic and interactive quiz application built with React and Tailwind CSS, featuring timed questions, scoring system, and beautiful UI components.

## Features

- 🕒 Timed questions with countdown timer
- 🎯 Dynamic scoring system based on response time
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components

## Scoring System

- Answer within 20 seconds: 10 points
- Answer within 10-20 seconds: 7 points
- Answer within last 10 seconds: 5 points

## Tech Stack

- React 18
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start running at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── card.jsx
│   │   ├── button.jsx
│   │   └── progress.jsx
│   ├── Question.jsx
│   ├── QuizStart.jsx
│   └── QuizSummary.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Component Overview

- `App.jsx`: Main application component managing quiz state
- `Question.jsx`: Displays current question with timer and options
- `QuizStart.jsx`: Welcome screen with instructions
- `QuizSummary.jsx`: Final score display with performance feedback

## API Integration

The application fetches quiz data from an external API:
```javascript
const response = await fetch('https://api.jsonserve.com/Uw5CrX');
```

Expected data format:
```javascript
{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correct_answer": "Correct option text"
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Environment Variables

No environment variables are required for basic setup.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)

## Acknowledgments

- Shadcn UI for component inspiration
- Lucide React for beautiful icons
- Tailwind CSS for styling utilities


