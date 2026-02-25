import { useState, useEffect } from 'react';
import { getTrends } from '../api';
import { Flame, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function TrendsGallery({ onSelectNiche }) {
    const [trends, setTrends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const data = await getTrends();
                setTrends(data);
            } catch (err) {
                console.error("Failed to fetch trends", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrends();
    }, []);

    const [visibleMid, setVisibleMid] = useState(12);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center my-12">
                <div className="animate-pulse flex flex-col items-center">
                    <Activity className="text-primary mb-2" size={32} />
                    <p className="text-textMuted text-sm">Escaneando más de 150+ tendencias de YouTube en vivo...</p>
                </div>
            </div>
        );
    }

    // Segment trends from the massive array produced by the backend
    const topTrends = trends.slice(0, 30); // Mejores 30
    const bottomTrends = trends.slice(-12).reverse(); // Peores 12
    const allMidTrends = trends.slice(30, trends.length - 12);
    const midTrends = allMidTrends.slice(0, visibleMid);

    const renderTrendCard = (niche, index, variant) => {
        let borderColor = "border-white/5";
        let icon = null;
        let badgeColor = "bg-white/10 text-white";

        if (variant === 'top') {
            borderColor = "border-success/30 hover:border-success";
            icon = <ArrowUpRight className="text-success" size={20} />;
            badgeColor = "bg-success/20 text-success";
        } else if (variant === 'bottom') {
            borderColor = "border-red-500/30 hover:border-red-500";
            icon = <ArrowDownRight className="text-red-500" size={20} />;
            badgeColor = "bg-red-500/20 text-red-500";
        } else {
            borderColor = "border-warning/30 hover:border-warning";
            icon = <Activity className="text-warning" size={20} />;
            badgeColor = "bg-warning/20 text-warning";
        }

        return (
            <div
                key={`${variant}-${index}`}
                onClick={() => onSelectNiche(niche.name)}
                className={`card p-5 ${borderColor} cursor-pointer transition-all flex flex-col h-full hover:-translate-y-1`}
            >
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg leading-tight w-4/5">{niche.name}</h4>
                    {icon}
                </div>

                <div className="mt-auto space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-textMuted">Rendimiento:</span>
                        <span className={`px-2 text-xs font-bold rounded-full ${badgeColor}`}>
                            Score: {niche.trend_score}
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-textMuted">CPM Est:</span>
                        <span className="font-medium">{niche.estimated_cpm}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-textMuted">Riesgo / Competencia:</span>
                        <span className="font-medium text-white/70">{niche.competition}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-16 animate-fade-in-up delay-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                        <Flame className="text-red-500" size={32} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">Radar de Tendencias Globales</h3>
                        <p className="text-sm text-textMuted mt-1">
                            Análisis en vivo de {trends.length} micronichos en YouTube. Clasificados por rentabilidad y viabilidad.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-16">
                {/* TOP 30 */}
                <div>
                    <div className="mb-6">
                        <h4 className="text-success font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>
                            Top 30 Mejores Oportunidades Actuales
                        </h4>
                        <p className="text-textMuted text-sm mt-1">Los nichos con el CPM más alto y menor saturación en la plataforma.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topTrends.map((niche, i) => renderTrendCard(niche, i, 'top'))}
                    </div>
                </div>

                {/* MID TRENDS (Paginated/Expandable) */}
                <div className="pt-8 border-t border-white/5">
                    <div className="mb-6">
                        <h4 className="text-warning font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-warning"></span>
                            Rentabilidad Promedio / Estable
                        </h4>
                        <p className="text-textMuted text-sm mt-1">Nichos tradicionales con competencia establecida. Se requiere un ángulo único para destacar.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {midTrends.map((niche, i) => renderTrendCard(niche, i, 'mid'))}
                    </div>
                    {visibleMid < allMidTrends.length && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => setVisibleMid(prev => prev + 24)}
                                className="btn-secondary px-8 py-3"
                            >
                                Cargar más nichos promedio ({allMidTrends.length - visibleMid} ocultos)
                            </button>
                        </div>
                    )}
                </div>

                {/* BOTTOM 12 */}
                <div className="pt-8 border-t border-white/5">
                    <div className="mb-6">
                        <h4 className="text-red-500 font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            Zona Roja (Evitar)
                        </h4>
                        <p className="text-textMuted text-sm mt-1">Súper saturados y con RPM/CPM por debajo del límite de rentabilidad.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 filter saturate-50 hover:saturate-100 hover:opacity-100 transition-all">
                        {bottomTrends.map((niche, i) => renderTrendCard(niche, i, 'bottom'))}
                    </div>
                </div>
            </div>
        </div>
    );
}
