// import { motion } from 'framer-motion';
// import Confetti from 'react-confetti';

// export default function QuizSummary({ score, totalPoints, correctAnswers, totalQuestions, onRestart }) {
//   const percentage = (score / totalPoints) * 100;
//   const isPerfect = percentage === 100;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="text-center"
//     >
//       {isPerfect && <Confetti />}
      
//       <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
      
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <div className="mb-6">
//           <p className="text-4xl font-bold text-primary mb-2">{score}/{totalPoints}</p>
//           <p className="text-gray-600">Points Scored</p>
//         </div>

//         <div className="mb-6">
//           <p className="text-2xl font-semibold mb-2">{correctAnswers}/{totalQuestions}</p>
//           <p className="text-gray-600">Correct Answers</p>
//         </div>

//         <div className="mb-8">
//           <p className="text-xl font-semibold">
//             {percentage >= 80 ? '🎉 Excellent!' : 
//              percentage >= 60 ? '👍 Good job!' : 
//              'Keep practicing!'}
//           </p>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onRestart}
//           className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
//         >
//           Try Again
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

const QuizSummary = ({ score, totalQuestions, onRetry }) => {
  const maxPossibleScore = totalQuestions * 10;
  const percentage = (score / maxPossibleScore) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          <h3 className="text-xl font-bold">Your Score: {score} points</h3>
          <Progress value={percentage} className="w-full" />
          <div className="space-y-2">
            <p>You scored {percentage.toFixed(1)}% of the maximum possible points!</p>
            {percentage >= 80 && (
              <p className="text-green-600">Excellent work! You're a master!</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-blue-600">Good job! Keep practicing!</p>
            )}
            {percentage < 60 && (
              <p className="text-yellow-600">Keep learning! You can do better!</p>
            )}
          </div>
          <Button onClick={onRetry} className="mt-4">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizSummary;
