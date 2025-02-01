import { motion } from 'framer-motion';

export default function QuizStart({ onStart }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to the Quiz!</h1>
      <p className="mb-8 text-lg">Test your knowledge and earn points!</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
}