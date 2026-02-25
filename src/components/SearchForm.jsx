import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchForm({ onSearch, isLoading }) {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            onSearch(keyword.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-10 relative">
            <div className="relative flex items-center">
                <div className="absolute left-4 text-textMuted">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Buscar un nicho (ej: Cripto, Mascotas, Inteligencia Artificial)..."
                    className="input-field pl-12 pr-32 text-lg shadow-2xl"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !keyword.trim()}
                    className="absolute right-2 btn-primary py-2 px-6 rounded-md m-1"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Buscando...
                        </>
                    ) : (
                        'Analizar'
                    )}
                </button>
            </div>
            <p className="text-center text-sm text-textMuted mt-3">
                Usamos la API de YouTube para calcular viralidad e ingresos potenciales de forma gratuita.
            </p>
        </form>
    );
}
