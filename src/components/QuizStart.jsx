import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'

const QuizStart = ({ onStart }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to the Quiz!</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <p className="mb-4">
            Test your knowledge and earn points! The faster you answer, the more points you get.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold">Scoring System:</h3>
            <ul className="text-sm">
              <li>Answer within 20 seconds: 10 points</li>
              <li>Answer within 10-20 seconds: 7 points</li>
              <li>Answer within last 10 seconds: 5 points</li>
            </ul>
          </div>
          <Button onClick={onStart} className="w-full mt-4">
            Start Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizStart;
