
import React from 'react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl text-center flex flex-col items-center">
      <Logo className="w-80 h-auto mb-6" />
      <h1 className="text-3xl font-bold font-serif text-brand-green-dark mb-4">
        Опросник "Антистресс"
      </h1>
      <p className="mb-8 text-lg">
        Этот опросник поможет определить ваш текущий уровень стресса. Он разработан для родителей в рамках курса "Антистресс", чтобы отследить динамику вашего состояния в начале и в конце программы.
      </p>
      <p className="mb-8 text-md">
        Пожалуйста, отвечайте на вопросы честно, основываясь на своих ощущениях за последние две недели.
      </p>
      <button
        onClick={onStart}
        className="bg-brand-green-dark hover:bg-brand-green-light text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Начать опрос
      </button>
    </div>
  );
};
