import React from 'react';
import { DharmaWord } from '../types';
import ShareButtons from './ShareButtons';

interface DharmaCardProps {
  dharmaWord: DharmaWord;
}

const DharmaCard: React.FC<DharmaCardProps> = ({ dharmaWord }) => {
  const shareText = `Palavra do Dharma do dia: "${dharmaWord.title}"\n\n${dharmaWord.explanation}\n\n#DharmaWord #ReflexãoDiária`;
  const shareUrl = window.location.href;

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-lg w-full transform transition-all duration-700 ease-out scale-100 opacity-100 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold text-purple-700 mb-4 tracking-wide">
        Palavra do Dharma do Dia
      </h2>
      <div className="border-t-2 border-b-2 border-purple-200 py-4 mb-6">
        <p className="text-4xl md:text-5xl font-bold text-indigo-800 leading-tight">
          {dharmaWord.title}
        </p>
      </div>
      <p className="text-base md:text-lg text-gray-700 mb-8 italic leading-relaxed">
        "{dharmaWord.explanation}"
      </p>

      <ShareButtons text={shareText} url={shareUrl} />
    </div>
  );
};

export default DharmaCard;
