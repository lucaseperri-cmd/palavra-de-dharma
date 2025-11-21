import React, { useState, useCallback, useEffect } from 'react';
import { generateDharmaWord } from './services/geminiService';
import { DharmaWord } from './types';
import Button from './components/Button';
import DharmaCard from './components/DharmaCard';

const App: React.FC = () => {
  const [dharmaWord, setDharmaWord] = useState<DharmaWord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDharmaWord = useCallback(async () => {
    setDharmaWord(null); // Clear previous word when fetching a new one
    setError(null);
    setLoading(true); // Set loading to true
    try {
      const word = await generateDharmaWord();
      setDharmaWord(word);
    } catch (err) {
      console.error("Failed to fetch Dharma word:", err);
      setError("Não foi possível buscar a Palavra do Dharma. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Optional: Fetch a word on initial load
  useEffect(() => {
    fetchDharmaWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
      <header className="mb-12 text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-philosopher leading-tight">
          Palavras do Dharma
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
          Inspiração diária, diretamente do universo do Dharma.
        </p>
      </header>

      <main className="flex flex-col items-center justify-center w-full">
        {loading && (
          <div className="flex flex-col items-center justify-center text-center mb-8 animate-fade-in">
            <p className="text-xl text-purple-200 font-medium animate-pulse">
              Meditando para encontrar sua palavra...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-rose-100 border border-rose-400 text-rose-700 px-6 py-4 rounded-md mb-8 max-w-lg text-center animate-fade-in" role="alert">
            <p className="font-semibold text-lg mb-2">Erro:</p>
            <p>{error}</p>
            <Button onClick={fetchDharmaWord} color="rose" className="mt-4">
              Tentar Novamente
            </Button>
          </div>
        )}

        {dharmaWord && !loading && (
          <DharmaCard dharmaWord={dharmaWord} />
        )}

        {!dharmaWord && !loading && !error && (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-md text-center animate-fade-in">
            <p className="text-lg text-gray-600 mb-6">
              Clique para pegar sua Palavra do Dharma do dia.
            </p>
            <Button onClick={fetchDharmaWord} loading={loading} color="purple">
              Pegar Palavra do Dharma
            </Button>
          </div>
        )}

        {dharmaWord && !loading && (
          <div className="mt-12 w-full max-w-lg animate-fade-in">
            <Button
              onClick={fetchDharmaWord}
              loading={loading}
              color="indigo"
              className="w-full"
            >
              Pegar Outra Palavra
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-gray-300 text-sm animate-fade-in">
        <p>&copy; {new Date().getFullYear()} Palavras do Dharma. Inspirado pelo Templo Zu Lai.</p>
      </footer>
    </div>
  );
};

export default App;