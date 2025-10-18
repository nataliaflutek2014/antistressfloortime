
import React, { useState, useMemo } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { QuestionComponent } from './components/QuestionComponent';
import { ProgressBar } from './components/ProgressBar';
import { questions } from './constants/questions';

type AppState = 'welcome' | 'quiz' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [answers, setAnswers] = useState<number[]>([]);
  const currentQuestionIndex = answers.length;

  const handleStart = () => {
    setAnswers([]);
    setAppState('quiz');
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      setAppState('results');
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setAppState('welcome');
  };
  
  const totalScore = useMemo(() => {
    return answers.reduce((sum, value) => sum + value, 0);
  }, [answers]);

  const renderContent = () => {
    switch (appState) {
      case 'quiz':
        return (
          <div className="w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col items-center">
            <div className="w-full mb-6">
               <p className="text-center text-lg font-serif mb-2">
                Вопрос {currentQuestionIndex + 1} из {questions.length}
              </p>
              <ProgressBar current={currentQuestionIndex} total={questions.length} />
            </div>
            <QuestionComponent
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </div>
        );
      case 'results':
        return <ResultsScreen score={totalScore} onRestart={handleRestart} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {renderContent()}
    </main>
  );
};

export default App;
