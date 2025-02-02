// import React, { useState, useEffect } from 'react';
// import Question from './components/Question';
// import QuizStart from './components/QuizStart';
// import QuizSummary from './components/QuizSummary';
// import { Card, CardContent } from './components/ui/card';
// import { XCircle } from 'lucide-react';

// const App = () => {
//   const [quizData, setQuizData] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [timer, setTimer] = useState(30);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     fetchQuizData();
//   }, []);

//   const fetchQuizData = async () => {
//     try {
//       const response = await fetch('https://api.jsonserve.com/Uw5CrX');
//       if (!response.ok) {
//         throw new Error('Failed to fetch quiz data');
//       }
//       const data = await response.json();
//       setQuizData(data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load quiz data. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (quizStarted && !showResults && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => {
//           if (prev <= 1) {
//             handleNextQuestion();
//             return 30;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [quizStarted, timer, showResults]);

//   const startQuiz = () => {
//     setQuizStarted(true);
//     setTimer(30);
//   };

//   const handleAnswerSelect = (selectedOption) => {
//     setSelectedAnswer(selectedOption);
//     const currentQ = quizData[currentQuestion];
//     if (currentQ.options[selectedOption] === currentQ.correct_answer) {
//       setScore(score + (timer >= 20 ? 10 : timer >= 10 ? 7 : 5));
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < quizData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setTimer(30);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const handleRetry = () => {
//     setQuizStarted(false);
//     setShowResults(false);
//     setCurrentQuestion(0);
//     setScore(0);
//     setTimer(30);
//     setSelectedAnswer(null);
//     fetchQuizData(); 
//   };

//   if (loading) {
//     return (
//       <Card className="w-full max-w-2xl mx-auto mt-8">
//         <CardContent className="p-6">
//           <div className="text-center">
//             <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//             <p>Loading quiz questions...</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full max-w-2xl mx-auto mt-8 border-red-200">
//         <CardContent className="p-6">
//           <div className="text-center text-red-600 space-y-4">
//             <XCircle className="h-8 w-8 mx-auto" />
//             <p className="font-semibold">{error}</p>
//             <button 
//               onClick={fetchQuizData}
//               className="text-blue-500 hover:text-blue-700 underline"
//             >
//               Try Again
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!quizStarted) {
//     return <QuizStart onStart={startQuiz} />;
//   }

//   if (showResults) {
//     return (
//       <QuizSummary 
//         score={score}
//         totalQuestions={quizData.length}
//         onRetry={handleRetry}
//       />
//     );
//   }

//   return (
//     <Question
//       currentQuestion={currentQuestion}
//       totalQuestions={quizData.length}
//       timer={timer}
//       question={quizData[currentQuestion].question}
//       options={quizData[currentQuestion].options}
//       selectedAnswer={selectedAnswer}
//       onAnswerSelect={handleAnswerSelect}
//       onNextQuestion={handleNextQuestion}
//     />

import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import QuizStart from "./components/QuizStart";
import QuizSummary from "./components/QuizSummary";
import { Card, CardContent } from "./components/ui/card";
import { XCircle } from "lucide-react";

const App = () => {
  const [quizData, setQuizData] = useState([]);
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
      setLoading(true);
      setError(null);

const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.jsonserve.com/Uw5CrX");


      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }

      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError("Failed to load quiz data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (quizStarted && !showResults && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }

    if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [quizStarted, timer, showResults]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimer(30);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const currentQ = quizData[currentQuestion];

    if (currentQ.options[selectedOption] === currentQ.correct_answer) {
      setScore((prevScore) => prevScore + (timer >= 20 ? 10 : timer >= 10 ? 7 : 5));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setQuizStarted(false);
    setShowResults(false);
    fetchQuizData();
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
      question={quizData[currentQuestion]?.question}
      options={quizData[currentQuestion]?.options}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNextQuestion={handleNextQuestion}
    />
  );
};

export default App;

//   );
// };

// export default App;
