
import React, { useRef } from 'react';
import { Logo } from './Logo';
import { questions } from '../constants/questions';

interface ResultsScreenProps {
  score: number;
  onRestart: () => void;
}

// Ensure window types for CDN scripts
declare global {
    interface Window {
        html2canvas: any;
        jspdf: any;
    }
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, onRestart }) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const maxScore = questions.length * 4;

  const getResultDetails = () => {
    if (score <= 13) {
      return {
        level: 'Низкий уровень стресса',
        color: 'text-brand-green-light',
        recommendations: [
          'Вы хорошо справляетесь со стрессом. Продолжайте заботиться о себе.',
          'Не забывайте уделять время своим увлечениям и отдыху для поддержания баланса.',
          'Практикуйте осознанность и медитацию для дальнейшего укрепления эмоциональной стабильности.',
        ],
      };
    } else if (score <= 26) {
      return {
        level: 'Средний уровень стресса',
        color: 'text-brand-yellow',
        recommendations: [
          'Ваш уровень стресса требует внимания. Важно найти способы его снижения.',
          'Попробуйте делегировать часть обязанностей и не бойтесь просить о помощи.',
          'Регулярные физические упражнения и прогулки на свежем воздухе могут помочь.',
          'Найдите поддерживающее сообщество родителей, чтобы делиться опытом.',
        ],
      };
    } else {
      return {
        level: 'Высокий уровень стресса',
        color: 'text-brand-red',
        recommendations: [
          'Ваш уровень стресса очень высок. Необходимо принять срочные меры для его снижения.',
          'Настоятельно рекомендуется обратиться за консультацией к психологу или психотерапевту.',
          'Обязательно выделите время для полноценного отдыха и восстановления.',
          'Изучите техники глубокого дыхания и релаксации для управления острыми стрессовыми реакциями.',
        ],
      };
    }
  };

  const { level, color, recommendations } = getResultDetails();

  const handleDownloadPdf = () => {
    const { jsPDF } = window.jspdf;
    const input = resultsRef.current;
    if (input) {
      window.html2canvas(input, { scale: 2, useCORS: true }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Результаты_Антистресс.pdf');
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <div ref={resultsRef} className="bg-white p-8 rounded-xl shadow-lg w-full">
            <header className="flex flex-col items-center text-center border-b-2 border-gray-200 pb-6 mb-6">
                <Logo className="w-64 h-auto mb-4" />
                <h1 className="text-3xl font-bold font-serif">Результаты опросника "Антистресс"</h1>
            </header>
            <div className="text-center">
                <h2 className="text-xl mb-2">Ваш результат:</h2>
                <p className="text-6xl font-bold mb-2">
                    {score}
                    <span className="text-3xl text-gray-500"> / {maxScore}</span>
                </p>
                <p className={`text-2xl font-semibold ${color} mb-8`}>{level}</p>

                <div className="text-left bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold font-serif mb-4">Рекомендации:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
                <p className="text-sm text-gray-500 mt-8">
                    *Данный опросник не является диагностическим инструментом. Результаты носят рекомендательный характер. Для получения профессиональной помощи обратитесь к специалисту.
                </p>
            </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
                onClick={handleDownloadPdf}
                className="bg-brand-green-dark hover:bg-brand-green-light text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Скачать PDF
            </button>
            <button
                onClick={onRestart}
                className="bg-gray-200 hover:bg-gray-300 text-brand-green-dark font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out"
            >
                Пройти заново
            </button>
        </div>
    </div>
  );
};
