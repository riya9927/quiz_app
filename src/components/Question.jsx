import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Timer, ArrowRight } from 'lucide-react';

const Question = ({
  currentQuestion,
  totalQuestions,
  timer,
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  onNextQuestion,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestion + 1}/{totalQuestions}</CardTitle>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            <span className="font-bold">{timer}s</span>
          </div>
        </div>
        <Progress value={(timer / 30) * 100} className="w-full" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">{question}</h2>
          <div className="grid gap-3">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "secondary" : "outline"}
                className="w-full text-left justify-start p-4"
                onClick={() => onAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <div className="flex justify-end mt-4">
              <Button 
                onClick={onNextQuestion} 
                className="flex items-center gap-2"
              >
                {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Question;
