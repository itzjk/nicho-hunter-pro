import { useState } from 'react';
import { Bot, Youtube, Sparkles } from 'lucide-react';

const AI_NICHES = [
    {
        title: "Documentales True Crime de Época",
        description: "Casos reales del siglo 19/20. Guionización profunda con Claude Opus, voces hiper realistas clonadas y recreación de escenas históricas 100% con Midjourney v6 y Runway Gen-2.",
        payout_range: "$12 - $25 USD",
        top_channels: ["Fascinating Horror", "Brief Case", "The Misery Machine"]
    },
    {
        title: "Filosofía Oscura y Paradigmas Psicológicos",
        description: "Análisis profundos del comportamiento humano (Maquiavelo, arquetipos de Jung). Imágenes abstractas generadas iterativamente, scripts de alta retención optimizados y edición Lofi.",
        payout_range: "$10 - $22 USD",
        top_channels: ["Einzelgänger", "Academy of Ideas", "Pursuit of Wonder"]
    },
    {
        title: "Finanzas Macro y Geopolítica",
        description: "Explicar cómo eventos globales afectan la cripto y la bolsa. Animaciones estilo mapa hechas con AfterEffects script automatizado o Manim, combinadas con narración en ElevenLabs.",
        payout_range: "$25 - $45+ USD",
        top_channels: ["Economics Explained", "PolyMatter", "VisualPolitik"]
    },
    {
        title: "Análisis de Algoritmos y Futuro Tech",
        description: "Explicaciones visuales sobre el funcionamiento interno de LLMs (GPT-4, Gemini) y robótica. Los guiones técnicos se simplifican mediante IA, altamente consumible por programadores y entusiastas.",
        payout_range: "$18 - $30 USD",
        top_channels: ["Fireship", "Two Minute Papers", "Tech Altar (Formato Faceless)"]
    },
    {
        title: "Misterios del Espacio Profundo Resolutivos",
        description: "Enfoque en descubrimientos recientes del James Webb. Creación masiva de visuales hiperrealistas del espacio con Stable Diffusion. Altísima retención y CPM por audiencia madura.",
        payout_range: "$14 - $28 USD",
        top_channels: ["Kurzgesagt (Estilo Serie)", "SEA", "John Michael Godier"]
    },
    {
        title: "Estrategias Militares Históricas 3D",
        description: "Automatización de mapas topográficos y narrativa de batallas icónicas romanas o mundiales. Audiencia extremadamente fiel y obsesionada con los detalles.",
        payout_range: "$11 - $20 USD",
        top_channels: ["Kings and Generals", "History Marche", "Epic History TV"]
    }
];

export default function AiNicheGenerator({ onSelectNiche }) {
    const [suggestions, setSuggestions] = useState([]);

    // Mocking useState import here manually as the snippet gets imported
    // I will restructure this to be a proper React component in the App tree

    const generateNiches = () => {
        // Shuffle and pick 3 random niches
        const shuffled = [...AI_NICHES].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3));
    };

    return (
        <div className="w-full max-w-6xl mx-auto my-12 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Bot className="text-accent" />
                        Nichos Automatizados con IA (Faceless)
                    </h3>
                    <p className="text-textMuted mt-1">
                        Descubre ideas rentables para canales sin mostrar la cara, impulsados 100% por Inteligencia Artificial.
                    </p>
                </div>
                <button
                    onClick={generateNiches}
                    className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/50 text-accent rounded-lg font-medium transition-all shadow-lg shadow-accent/10"
                >
                    <Sparkles size={20} />
                    Generar Ideas IA
                </button>
            </div>

            {suggestions.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {suggestions.map((niche, i) => (
                        <div key={i} className="card p-6 border-accent/20 hover:border-accent/60 transition-colors flex flex-col h-full">
                            <h4 className="text-xl font-bold mb-3 text-white">{niche.title}</h4>
                            <p className="text-sm text-textMuted flex-grow mb-4">{niche.description}</p>

                            <div className="bg-background rounded-lg p-3 mb-4 flex items-center justify-between border border-white/5">
                                <span className="text-xs text-textMuted">Rango CPM:</span>
                                <span className="font-bold text-success">{niche.payout_range}</span>
                            </div>

                            <div className="mb-6">
                                <h5 className="text-xs font-semibold text-textMuted uppercase mb-2">Canales Top</h5>
                                <ul className="space-y-2">
                                    {niche.top_channels.map((ch, idx) => (
                                        <li key={idx} className="text-sm flex items-center gap-2">
                                            <Youtube size={14} className="text-red-500" />
                                            {ch}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => onSelectNiche(niche.title)}
                                className="mt-auto w-full py-2 bg-surface border border-accent text-white rounded hover:bg-accent/20 transition-colors text-sm font-medium"
                            >
                                Analizar este Nicho
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
