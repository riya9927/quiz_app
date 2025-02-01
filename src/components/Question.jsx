import { motion } from 'framer-motion';

export default function Question({ question, onAnswer, currentQuestion, totalQuestions }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            Points: {question.points}
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-6">{question.question}</h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}