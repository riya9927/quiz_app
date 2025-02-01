// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import QuizStart from './components/QuizStart';
// import Question from './components/Question';
// import QuizSummary from './components/QuizSummary';
// import './App.css';

// function App() {
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [gameState, setGameState] = useState('start'); 
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);

//   useEffect(() => {
//     fetchQuizData();
//   }, []);

//   const fetchQuizData = async () => {
//     try {
//       const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
//       setQuizData(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to load quiz data. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const startQuiz = () => {
//     setGameState('playing');
//     setCurrentQuestion(0);
//     setScore(0);
//     setCorrectAnswers(0);
//   };

//   const handleAnswer = (selectedAnswer) => {
//     const question = quizData.questions[currentQuestion];
    
//     if (selectedAnswer === question.correctAnswer) {
//       setScore(prev => prev + question.points);
//       setCorrectAnswers(prev => prev + 1);
//     }

//     if (currentQuestion + 1 < quizData.questions.length) {
//       setCurrentQuestion(prev => prev + 1);
//     } else {
//       setGameState('end');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">{error}</p>
//           <button 
//             onClick={fetchQuizData}
//             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const totalPoints = quizData?.questions.reduce((sum, q) => sum + q.points, 0) || 0;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//       <div className="w-full max-w-2xl">
//         {gameState === 'start' && (
//           <QuizStart onStart={startQuiz} />
//         )}

//         {gameState === 'playing' && quizData && (
//           <Question
//             question={quizData.questions[currentQuestion]}
//             onAnswer={handleAnswer}
//             currentQuestion={currentQuestion}
//             totalQuestions={quizData.questions.length}
//           />
//         )}

//         {gameState === 'end' && (
//           <QuizSummary
//             score={score}
//             totalPoints={totalPoints}
//             correctAnswers={correctAnswers}
//             totalQuestions={quizData.questions.length}
//             onRestart={startQuiz}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import QuizStart from './components/QuizStart';
import QuizSummary from './components/QuizSummary';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      setQuizData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load quiz data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (quizStarted && !showResults && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timer, showResults]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimer(30);
  };

  const handleAnswerSelect = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const currentQ = quizData[currentQuestion];
    if (currentQ.options[selectedOption] === currentQ.correct_answer) {
      setScore(score + (timer >= 20 ? 10 : timer >= 10 ? 7 : 5));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimer(30);
    setSelectedAnswer(null);
    fetchQuizData(); // Refetch questions on retry
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading quiz questions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8 border-red-200">
        <CardContent className="p-6">
          <div className="text-center text-red-600 space-y-4">
            <XCircle className="h-8 w-8 mx-auto" />
            <p className="font-semibold">{error}</p>
            <button 
              onClick={fetchQuizData}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quizStarted) {
    return <QuizStart onStart={startQuiz} />;
  }

  if (showResults) {
    return (
      <QuizSummary 
        score={score}
        totalQuestions={quizData.length}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <Question
      currentQuestion={currentQuestion}
      totalQuestions={quizData.length}
      timer={timer}
      question={quizData[currentQuestion].question}
      options={quizData[currentQuestion].options}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNextQuestion={handleNextQuestion}
    />
  );
};

export default App;
