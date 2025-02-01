import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import QuizSummary from './components/QuizSummary';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameState, setGameState] = useState('start'); // start, playing, end
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
      setQuizData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quiz data. Please try again later.');
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
  };

  const handleAnswer = (selectedAnswer) => {
    const question = quizData.questions[currentQuestion];
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + question.points);
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameState('end');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchQuizData}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalPoints = quizData?.questions.reduce((sum, q) => sum + q.points, 0) || 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        {gameState === 'start' && (
          <QuizStart onStart={startQuiz} />
        )}

        {gameState === 'playing' && quizData && (
          <Question
            question={quizData.questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={quizData.questions.length}
          />
        )}

        {gameState === 'end' && (
          <QuizSummary
            score={score}
            totalPoints={totalPoints}
            correctAnswers={correctAnswers}
            totalQuestions={quizData.questions.length}
            onRestart={startQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;