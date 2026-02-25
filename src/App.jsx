import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultsView from './components/ResultsView';
import HistoryList from './components/HistoryList';
import AiNicheGenerator from './components/AiNicheGenerator';
import TrendsGallery from './components/TrendsGallery';
import SidebarLayout from './components/SidebarLayout';
import { searchNiche, getHistory } from './api';
import { AlertCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSelectNiche = async (keyword) => {
    // When clicking a keyword from History, Trends, or AI ideas:
    // 1. Switch to 'search' tab
    // 2. Clear previous results
    // 3. Trigger search
    setActiveTab('search');
    setResult(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await searchNiche(keyword);
      setResult(data);
      fetchHistory(); // Refresh history

      // Auto-scroll logic if needed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Error al buscar el nicho. Puede que el límite de API se haya excedido."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <div className="animate-fade-in-up">
            <div className="text-center mb-10 mt-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
                Buscador Principal Core
              </h2>
              <p className="text-lg text-textMuted max-w-2xl mx-auto">
                Escribe cualquier palabra clave o nicho y extrae métricas de vitalidad, potencial de monetización y retención de canales al instante.
              </p>
            </div>

            <SearchForm onSearch={handleSelectNiche} isLoading={isLoading} />

            {error && (
              <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 shadow-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            {result ? (
              <div className="mb-16">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-6xl mx-auto mb-6 gap-4 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    Resultados Rápidos: <span className="text-primary tracking-wide">"{result.keyword}"</span>
                  </h2>
                  <button
                    onClick={() => setResult(null)}
                    className="text-sm px-4 py-2 rounded-md bg-white/5 text-textMuted hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Borrar Resultados
                  </button>
                </div>
                <ResultsView result={result} />
              </div>
            ) : (
              !isLoading && !error && (
                <div className="opacity-50 blur-[2px] pointer-events-none transition-all duration-700 mt-20">
                  <div className="max-w-4xl mx-auto border-2 border-dashed border-white/10 rounded-2xl p-20 flex items-center justify-center">
                    <p className="text-xl font-medium tracking-widest text-textMuted uppercase">Esperando Palabra Clave...</p>
                  </div>
                </div>
              )
            )}
          </div>
        );
      case 'trends':
        return <TrendsGallery onSelectNiche={handleSelectNiche} />;
      case 'ai':
        return <AiNicheGenerator onSelectNiche={handleSelectNiche} />;
      case 'history':
        return <HistoryList history={history} onSelect={handleSelectNiche} />;
      default:
        return null;
    }
  };

  return (
    <SidebarLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </SidebarLayout>
  );
}

export default App;
