import { Clock, TrendingUp } from 'lucide-react';

export default function HistoryList({ history, onSelect }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto mt-16 animate-fade-in-up delay-200">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Búsquedas Recientes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.keyword)}
                        className="card p-5 hover:border-primary/50 hover:shadow-primary/10 transition-all text-left group"
                    >
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {item.keyword}
                        </h4>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-textMuted flex items-center gap-1">
                                <TrendingUp size={14} className="text-success" />
                                {item.virality_score}
                            </span>
                            <span className="font-medium text-textMain">${item.estimated_cpm}</span>
                        </div>
                        {item.top_video_titles && item.top_video_titles.length > 0 && (
                            <p className="text-xs text-textMuted mt-3 truncate opacity-80">
                                Ej: {item.top_video_titles[0]}
                            </p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
