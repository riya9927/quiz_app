import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function QuizSummary({ score, totalPoints, correctAnswers, totalQuestions, onRestart }) {
  const percentage = (score / totalPoints) * 100;
  const isPerfect = percentage === 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {isPerfect && <Confetti />}
      
      <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-4xl font-bold text-primary mb-2">{score}/{totalPoints}</p>
          <p className="text-gray-600">Points Scored</p>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-semibold mb-2">{correctAnswers}/{totalQuestions}</p>
          <p className="text-gray-600">Correct Answers</p>
        </div>

        <div className="mb-8">
          <p className="text-xl font-semibold">
            {percentage >= 80 ? '🎉 Excellent!' : 
             percentage >= 60 ? '👍 Good job!' : 
             'Keep practicing!'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
}