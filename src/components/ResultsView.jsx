import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, DollarSign, BellRing, Download } from 'lucide-react';
import { useState } from 'react';
import { subscribeAlert, getPremiumCheckout } from '../api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ResultsView({ result }) {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subMessage, setSubMessage] = useState('');
    const [estimatedViews, setEstimatedViews] = useState(100000);

    if (!result) return null;

    const handleSubscribe = async () => {
        if (!email) return;
        setIsSubscribing(true);
        try {
            const res = await subscribeAlert(email, result.keyword);
            setSubMessage(res.message);
        } catch (err) {
            setSubMessage('Error al suscribirse.');
        }
        setIsSubscribing(false);
    };

    const handlePremium = async () => {
        try {
            const emailPrompt = prompt('Ingresa tu email para el reporte:');
            if (!emailPrompt) return;

            const res = await getPremiumCheckout(result.keyword, emailPrompt);
            if (res.checkout_url) {
                window.location.href = res.checkout_url;
            }
        } catch (err) {
            alert('Error contactando pasarela de pago.');
        }
    };

    const chartData = {
        labels: result.top_videos.map(v => v.title.substring(0, 20) + '...'),
        datasets: [
            {
                label: 'Vistas (Millones)',
                data: result.top_videos.map(v => v.views / 1000000),
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
            },
            {
                label: 'Likes (Miles)',
                data: result.top_videos.map(v => v.likes / 1000),
                backgroundColor: 'rgba(236, 72, 153, 0.8)',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#f3f4f6' } },
            title: { display: false }
        },
        scales: {
            y: { ticks: { color: '#9ca3af' }, grid: { color: '#333' } },
            x: { ticks: { color: '#9ca3af' }, grid: { display: false } }
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 flex items-center shadow-primary/10">
                    <div className="p-4 bg-primary/20 rounded-full mr-4 text-primary">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <p className="text-textMuted text-sm">Puntuación de Viralidad</p>
                        <h2 className="text-3xl font-bold">{result.virality_score}<span className="text-lg text-textMuted font-normal">/100</span></h2>
                    </div>
                </div>

                <div className="card p-6 flex items-center shadow-success/10">
                    <div className="p-4 bg-success/20 rounded-full mr-4 text-success">
                        <DollarSign size={32} />
                    </div>
                    <div>
                        <p className="text-textMuted text-sm">CPM Estimado</p>
                        <h2 className="text-3xl font-bold">${result.estimated_cpm}<span className="text-lg text-textMuted font-normal"> USD</span></h2>
                    </div>
                </div>

                <div className="card p-6 flex flex-col justify-center shadow-accent/10 border border-accent/20">
                    <p className="text-textMuted text-sm mb-2 text-center">Desbloquea el análisis completo</p>
                    <button onClick={handlePremium} className="btn-primary bg-accent hover:bg-accent/80 shadow-accent/20">
                        <Download size={18} />
                        Reporte Premium ($5)
                    </button>
                </div>
            </div>

            {/* Calculadora de Ingresos Interactiva */}
            <div className="card p-8 border-emerald-500/20 bg-gradient-to-r from-surface to-emerald-500/5 mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">💰</span>
                    Calculadora de Ingresos Proyectados
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full flex-1">
                        <div className="flex justify-between text-sm text-textMuted font-semibold mb-3">
                            <span>10K vistas</span>
                            <span className="text-emerald-400">{estimatedViews.toLocaleString()} vistas / mes</span>
                            <span>5M vistas</span>
                        </div>
                        <input
                            type="range"
                            min="10000"
                            max="5000000"
                            step="10000"
                            value={estimatedViews}
                            onChange={(e) => setEstimatedViews(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                        />
                        <p className="text-xs text-textMuted mt-4 opacity-70">Basado en un CPM promedio de ${result.estimated_cpm} USD</p>
                    </div>
                    <div className="w-full md:w-auto bg-background p-6 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col justify-center items-center min-w-[250px]">
                        <span className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Ingreso Mensual</span>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                            ${((estimatedViews / 1000) * result.estimated_cpm).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Métricas de Competencia</h3>
                    <Bar options={chartOptions} data={chartData} />
                </div>

                <div className="card p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <BellRing size={20} className="text-warning" />
                        Alertas Diarias
                    </h3>
                    <p className="text-sm text-textMuted mb-4">
                        Mantente al tanto si este nicho se vuelve más viral o rentable mañana. Te enviaremos un correo.
                    </p>
                    <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="input-field mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={handleSubscribe}
                        disabled={isSubscribing || !email}
                        className="btn-primary w-full"
                    >
                        {isSubscribing ? 'Guardando...' : 'Suscribirme al Nicho'}
                    </button>
                    {subMessage && <p className="text-xs text-primary mt-3 text-center">{subMessage}</p>}

                    <div className="mt-8">
                        <h4 className="font-semibold text-sm mb-2">Top 3 Videos</h4>
                        <div className="space-y-3">
                            {result.top_videos.slice(0, 3).map((v, i) => (
                                <a key={i} href={v.url} target="_blank" rel="noreferrer" className="block p-3 rounded-lg bg-background hover:bg-white/5 transition-colors border border-white/5 text-sm">
                                    <p className="font-medium truncate">{v.title}</p>
                                    <p className="text-textMuted text-xs flex justify-between mt-1">
                                        <span>{v.views.toLocaleString()} vistas</span>
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Ideas Section */}
            {result.video_ideas && (
                <div className="card p-8 border-accent/20 bg-gradient-to-b from-surface to-accent/5 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-black">💡</span>
                        Ideas de Títulos Virales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.video_ideas.map((idea, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-accent/30 transition-colors">
                                <span className="text-accent mt-1">✨</span>
                                <p className="text-sm font-medium leading-relaxed">{idea}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Optimization Tips Section */}
            {result.optimization_tips && (
                <div className="card p-8 border-success/20 bg-gradient-to-b from-surface to-success/5 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center text-sm font-black">📈</span>
                        Secretos de Optimización (SEO & Retención)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.optimization_tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-success/30 transition-colors">
                                <span className="text-success mt-1">✓</span>
                                <p className="text-sm font-medium leading-relaxed text-textMuted">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Production Toolkit Section */}
            {result.ai_production_toolkit && (
                <div className="card p-8 border-cyan-500/20 bg-gradient-to-b from-surface to-cyan-500/5 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center text-sm font-black">🎬</span>
                        Mesa de Producción IA (Toolkit Exprés)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-xl bg-background border border-white/5 border-t-cyan-500/50">
                            <span className="text-xs font-bold text-textMuted uppercase block mb-2">Herramienta de Voz</span>
                            <span className="text-cyan-400 font-bold text-lg block">{result.ai_production_toolkit.voice_ai}</span>
                        </div>
                        <div className="p-5 rounded-xl bg-background border border-white/5 border-t-cyan-500/50">
                            <span className="text-xs font-bold text-textMuted uppercase block mb-2">Voz Exacta Sugerida</span>
                            <span className="text-white font-medium text-sm leading-relaxed block">{result.ai_production_toolkit.voice_id_suggested}</span>
                        </div>
                        <div className="p-5 rounded-xl bg-background border border-white/5 border-t-cyan-500/50">
                            <span className="text-xs font-bold text-textMuted uppercase block mb-2">Estilo Musical</span>
                            <span className="text-white font-medium text-sm leading-relaxed block">{result.ai_production_toolkit.music_style}</span>
                        </div>
                        <div className="p-5 rounded-xl bg-background border border-white/5 border-t-cyan-500/50">
                            <span className="text-xs font-bold text-textMuted uppercase block mb-2">Ritmo de Edición</span>
                            <span className="text-white font-medium text-sm leading-relaxed block">{result.ai_production_toolkit.editing_pace}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Plan Section */}
            {result.action_plan && (
                <div className="card p-8 border-primary/20 bg-gradient-to-b from-surface to-primary/5 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-black">⚙️</span>
                        Plan de Acción: Cómo Desarrollar este Nicho
                    </h3>
                    <div className="space-y-4">
                        {result.action_plan.map((step, index) => {
                            // Split 'Fase X (Name): details' for styling
                            const [titlePart, ...descParts] = step.split(':');
                            const description = descParts.join(':');
                            return (
                                <div key={index} className="flex gap-4 p-4 rounded-xl bg-background border border-white/5">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-white/10 flex items-center justify-center font-bold text-textMuted content-center shadow-lg">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">{titlePart}</h4>
                                        <p className="text-textMuted font-medium text-sm leading-relaxed">{description.trim()}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Prompt Engineering Section */}
            {(result.chatgpt_prompt || result.midjourney_prompt) && (
                <div className="card p-8 border-indigo-500/20 bg-gradient-to-b from-surface to-indigo-500/5 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-sm font-black">🤖</span>
                        Prompt Engineering (Copiar y Pegar)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {result.chatgpt_prompt && (
                            <div className="bg-background rounded-xl border border-white/5 overflow-hidden">
                                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                                    <span className="text-sm font-bold text-indigo-400">Prompt de ChatGPT (Guion)</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(result.chatgpt_prompt)}
                                        className="text-xs bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 px-3 py-1 rounded transition-colors"
                                    >Copiar</button>
                                </div>
                                <div className="p-4 text-sm text-textMuted font-mono whitespace-pre-wrap leading-relaxed">
                                    {result.chatgpt_prompt}
                                </div>
                            </div>
                        )}
                        {result.midjourney_prompt && (
                            <div className="bg-background rounded-xl border border-white/5 overflow-hidden">
                                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                                    <span className="text-sm font-bold text-pink-400">Prompt de Midjourney (Miniatura)</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(result.midjourney_prompt)}
                                        className="text-xs bg-pink-500/20 text-pink-300 hover:bg-pink-500/40 px-3 py-1 rounded transition-colors"
                                    >Copiar</button>
                                </div>
                                <div className="p-4 text-sm text-textMuted font-mono whitespace-pre-wrap leading-relaxed">
                                    {result.midjourney_prompt}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Competitor Hooks Section */}
            {result.competitor_hooks && (
                <div className="card p-8 border-rose-500/20 bg-gradient-to-b from-surface to-rose-500/5 mt-8">
                    <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center text-sm font-black">🎣</span>
                        Ingeniería Inversa: Ganchos de Competencia
                    </h3>
                    <p className="text-textMuted text-sm mb-6 ml-11">Análisis de los primeros 5 segundos de los videos más virales en este nicho.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {result.competitor_hooks.map((hook, index) => {
                            const [type, desc] = hook.split(':');
                            return (
                                <div key={index} className="flex gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-rose-500/30 transition-colors">
                                    <div className="text-rose-500 font-bold mt-1 shadow-rose-500 text-lg">›</div>
                                    <div>
                                        <span className="font-bold text-rose-400 block mb-1">{type}</span>
                                        <span className="text-sm font-medium leading-relaxed text-textMuted">{desc}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Generador de Hooks Listos */}
                    {result.ready_hooks && (
                        <>
                            <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2 border-t border-white/10 pt-6">
                                <span className="text-rose-400">⚡</span>
                                Guiones de Hook Listos Para Grabar (Tus Primeros 10s)
                            </h4>
                            <div className="space-y-3">
                                {result.ready_hooks.map((hook, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 text-sm font-medium italic text-textMuted flex justify-between items-center group">
                                        <span>"{hook}"</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(hook)}
                                            className="opacity-0 group-hover:opacity-100 text-xs bg-white/10 text-white hover:bg-white/20 px-3 py-1 rounded transition-all"
                                        >Copiar</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="flex justify-center mt-12 pb-8">
                <button
                    onClick={() => {
                        const content = `Reporte de Investigación: ${result.keyword.toUpperCase()}
----------------------------------------
⭐️ Viralidad: ${result.virality_score}/100
💰 CPM Estimado: $${result.estimated_cpm}

========================================
📋 PLAN DE ACCIÓN
========================================
${result.action_plan?.join('\n\n')}

========================================
💡 IDEAS DE TÍTULOS VIRALES
========================================
${result.video_ideas?.map(i => '- ' + i).join('\n')}

========================================
📈 SECRETOS DE OPTIMIZACIÓN
========================================
${result.optimization_tips?.map(i => '- ' + i).join('\n')}

========================================
🎬 MESA DE PRODUCCIÓN IA
========================================
Voz Generador: ${result.ai_production_toolkit?.voice_ai}
Voz Sugerida: ${result.ai_production_toolkit?.voice_id_suggested}
Música: ${result.ai_production_toolkit?.music_style}
Ritmo Edición: ${result.ai_production_toolkit?.editing_pace}

========================================
🎣 GANCHOS DE LA COMPETENCIA
========================================
${result.competitor_hooks?.map(i => '- ' + i).join('\n')}

========================================
⚡ GUIONES LISTOS PARA GRABAR (HOOKS)
========================================
${result.ready_hooks?.map(i => '- "' + i + '"').join('\n')}

========================================
🤖 PROMPT DE CHATGPT (GUION)
========================================
${result.chatgpt_prompt}

========================================
🎨 PROMPT DE MIDJOURNEY (MINIATURA)
========================================
${result.midjourney_prompt}
                        `;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Reporte_Nicho_${result.keyword.replace(/ /g, '_')}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    className="btn-primary bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30 px-8 py-4 text-lg font-bold flex items-center gap-3"
                >
                    <Download size={24} />
                    Descargar Biblia del Nicho (.TXT)
                </button>
            </div>
        </div>
    );
}
