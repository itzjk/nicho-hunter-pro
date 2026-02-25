// Translated from Python backend services to make the app 100% static

// --- youtube.js logic ---
export const searchVideosMock = (keyword, maxResults = 5) => {
    const videos = [];
    for (let i = 0; i < maxResults; i++) {
        // Mock views between 10k and 5M
        const views = Math.floor(Math.random() * (5000000 - 10000 + 1) + 10000);
        videos.push({
            title: `Viral ${keyword} strategy #${i + 1}`,
            url: `https://www.youtube.com/watch?v=simulated_${i}`,
            views: views,
            likes: Math.floor(views * (Math.random() * (0.08 - 0.01) + 0.01)),
            comments: Math.floor(views * (Math.random() * (0.01 - 0.001) + 0.001))
        });
    }
    return videos;
};

// --- analyzer.js logic ---
export const calculateMetrics = (videos) => {
    if (!videos || videos.length === 0) return { virality_score: 0.0, estimated_cpm: 0.0 };

    const total_views = videos.reduce((acc, v) => acc + v.views, 0);
    const total_likes = videos.reduce((acc, v) => acc + v.likes, 0);
    const total_comments = videos.reduce((acc, v) => acc + v.comments, 0);

    const avg_views = total_views / videos.length;

    const total_engagement = (total_likes * 10) + (total_comments * 50);
    const virality_ratio = total_views > 0 ? (total_engagement / total_views * 100) : 0;

    let virality_score = virality_ratio * (avg_views / 100000);
    virality_score = Math.min(Math.max(virality_score, 0.0), 100.0);

    const base_cpm = 3.50;
    const engagement_boost = (virality_score / 100) * 8.0;
    const estimated_cpm = base_cpm + engagement_boost;

    return {
        virality_score: parseFloat(virality_score.toFixed(2)),
        estimated_cpm: parseFloat(estimated_cpm.toFixed(2))
    };
};

export const generateActionPlan = (keyword) => [
    `Fase 1 (Investigación): Analiza los 3 videos top sobre '${keyword}' usando herramientas como VidIQ o YouTube directamente. Define los ángulos emocionales que más funcionan antes de empezar.`,
    `Fase 2 (Guion y Estructura IA): Usa ChatGPT (o Claude) con un prompt de 'Hook-Reten-Sorpresa'. Dile a la IA que actúe como experto en '${keyword}' para sacar guiones altamente retentivos de 8-10 minutos.`,
    `Fase 3 (Voz en Off Premium): Genera los audios en ElevenLabs utilizando como clón una voz dinámica (evita las voces robotizadas clásicas). Agrega pausas estratégicas (. ,) para que suene orgánico.`,
    `Fase 4 (Edición y Efectos): Si es un canal 'Faceless', automatiza los visuales con Midjourney/Runway para el stock, y ensambla rápidamente usando CapCut PC o herramientas de auto-caption.`,
    `Fase 5 (Miniaturas Brutales): Las miniaturas deben crear un 'Curiosity Gap' (misterio) sobre '${keyword}'. Mínimo texto, colores saturados, y que el clickbait sea siempre justificado en el primer minuto del video.`
];

export const generateVideoIdeas = (keyword) => [
    `La cruda verdad sobre ${keyword} que nadie te cuenta`,
    `Probé ${keyword} durante 30 días y esto fue lo que pasó...`,
    `El método secreto de ${keyword} revelado (Paso a paso)`,
    `Por qué el 99% fracasa con ${keyword} (Y cómo evitarlo)`,
    `Documental: El imperio oculto detrás de ${keyword}`
];

export const generateOptimizationTips = (keyword) => [
    "Usa colores de alto contraste (Naranja, Amarillo, Cian) en la miniatura contra fondos oscuros.",
    "Evita intros lentas. Empieza con una afirmación fuerte o una pregunta en los primeros 3 segundos.",
    "Agrega subtítulos dinámicos con emojis animados durante el 100% del video para retener atención.",
    "Menciona o muestra el resultado final en el segundo 15, y luego explica cómo se llegó ahí.",
    "Pon '2024' o '(Nueva Estrategia)' en el título y actualízalo cada año para mantener Evergreen.",
    `Usa tags ocultos y hashtags de la competencia directamente en la descripción del video.`
];

export const generateChatgptPrompt = (keyword) => `Actúa como un guionista de YouTube experto en el nicho '${keyword}'. Tu objetivo es retener a la audiencia el 100% del video.
Escribe un guion de 8 minutos con esta estructura:
1. HOOK (0:00 - 0:30): Muestra el resultado final o haz una promesa masiva que despierte intriga (Curiosity Gap). Usa lenguaje urgente.
2. INTRO (0:30 - 1:00): Justifica por qué tú (o la historia) tiene la autoridad para hablar de esto.
3. DESARROLLO (1:00 - 6:30): Divide el contenido en 3 fases claras. Usa la técnica 'Open Loop' (abre un misterio al inicio de cada bloque y resuélvelo al final).
4. CLÍMAX Y CALL TO ACTION (6:30 - 8:00): Entrega la revelación final y pide suscripción usando ingeniería social inversa (ej: "Solo suscríbete si de verdad vas a aplicar esto").
Tono: Dinámico, misterioso y directo al grano.`;

export const generateMidjourneyPrompt = (keyword) => `/imagine prompt: A cinematic, hyper-realistic Youtube thumbnail about ${keyword}, high contrast, dramatic lighting, vivid colors, neon accents, 8k resolution, shot on Arri Alexa, extremely detailed, depth of field, blurred background, mysterious atmosphere, --ar 16:9 --v 6.0 --style raw`;

export const generateCompetitorHooks = () => [
    `Shock Inicial: Empiezan mostrando el error más grave que todos cometen en este nicho antes de saludar.`,
    "Visual Bizarro: Ponen en pantalla una imagen generada por IA que no tiene sentido hasta que escuchas la explicación.",
    "Pregunta al Dolor: Abren diciendo '¿Estás cansado de intentar X y siempre fracasar? No eres tú, es el sistema...'",
    "Promesa Rápida: 'En los próximos 5 minutos vas a descubrir el método exacto para dominar esto, sin gastar 1 dólar.'"
];

export const generateAiProductionToolkit = () => ({
    "voice_ai": "ElevenLabs",
    "voice_id_suggested": "Adam (Profundo/Misterio) o Marcus (Autoridad)",
    "music_style": "Dark Synthwave o Lo-Fi Cinematic (Suno AI / Epidemic Sound)",
    "editing_pace": "Cortes rápidos cada 3-4 segundos. B-Roll constante."
});

export const generateReadyHooks = (keyword) => [
    `El 99% de las personas que intentan '${keyword}' están cometiendo este error oculto y perdiendo dinero...`,
    `¿Y si te dijera que todo lo que sabes sobre '${keyword}' es mentira? Mira esto...`,
    `Hoy te voy a revelar el sistema exacto de '${keyword}' que usan los millonarios, y toma 5 minutos.`
];

// --- trends.js logic ---
export const getTrendsMock = () => {
    const base_niches = [
        ["Trading de Criptomonedas", 25.0, "Extrema"], ["Inversión en Bolsa Urbana", 22.0, "Alta"],
        ["Tarjetas de Crédito y Viajes", 28.0, "Alta"], ["Bienes Raíces para Jóvenes", 24.0, "Media"],
        ["SaaS y Negocios Digitales", 26.0, "Media"], ["Desarrollo Web Fullstack", 16.0, "Media"],
        ["Ciberseguridad Práctica", 17.0, "Baja"], ["Gadgets y Hardware", 12.0, "Extrema"],
        ["Ecosistema Apple", 14.0, "Alta"], ["Fitness y Calistenia", 8.0, "Muy Alta"],
        ["Dietas Keto/Veganas", 9.0, "Alta"], ["Yoga y Mindfulness", 6.0, "Media"],
        ["Psicología Oscura", 11.0, "Baja"], ["Estoicismo Práctico", 10.0, "Media"],
        ["Relaciones y Habilidades Sociales", 7.0, "Media"], ["Documentales True Crime", 12.0, "Alta"],
        ["Misterios y Casos Resueltos", 9.0, "Media"], ["Casos Médicos Reales", 10.0, "Baja"],
        ["Minecraft y Mods", 2.0, "Extrema"], ["Roblox Roleplay", 1.5, "Extrema"],
        ["GTA 6 Análisis", 3.0, "Alta"], ["Valorant/CS2 eSports", 4.0, "Alta"],
        ["Vlogs de Mochileros", 5.0, "Muy Alta"], ["Vida Minimalista", 6.0, "Media"],
        ["Nómadas Digitales", 14.0, "Media"], ["Fotografía de Calle", 11.0, "Alta"],
        ["Edición VFX en Premiere", 13.0, "Media"], ["Tutoriales de CapCut", 8.0, "Alta"],
        ["Aprender Inglés Rápido", 9.0, "Alta"], ["Marketing de Afiliados", 21.0, "Alta"],
        ["E-commerce y Shopify", 20.0, "Media"], ["Cuidado de Mascotas Exóticas", 5.0, "Baja"],
        ["Adiestramiento Canino", 6.0, "Media"], ["Huertos en Casa", 4.0, "Media"],
        ["Recetas Económicas", 3.5, "Extrema"], ["Cocina Asiática", 5.5, "Media"],
        ["Historias de Conflictos Militares", 7.0, "Baja"], ["Exploración Espacial Explicada", 6.5, "Media"],
        ["Física Cuántica para Tontos", 8.0, "Baja"], ["Reviews de Autos Usados", 12.0, "Media"],
        ["Mecánica y Tuner", 9.0, "Media"], ["Carpintería y Resina", 7.5, "Media"],
        ["Supervivencia y Bushcraft", 6.0, "Media"], ["Historias de Terror (Reddit)", 5.0, "Alta"],
        ["Casos Paranormales", 4.5, "Media"], ["ASMR de Lluvia y Teclado", 3.0, "Alta"],
        ["Consejos Universitarios", 4.5, "Alta"], ["Resúmenes Animados de Libros", 11.0, "Media"],
        ["Dropshipping Local", 19.0, "Alta"], ["Ventas B2B", 24.0, "Baja"],
        ["Productividad y Notion", 15.0, "Media"], ["Setup de Escritorios", 10.0, "Media"]
    ];

    const ai_faceless_niches = [
        ["Escenarios '¿Qué pasaría si...?' (Imágenes 3D IA hiperrealistas)", 14.5, "Alta"],
        ["Reconstrucción Histórica de Ciudades (Midjourney/Runway)", 20.0, "Media"],
        ["Consejos de Abundancia por Avatar de Sabio (Rabino/Monje IA)", 24.0, "Baja"],
        ["Documentales de Civilizaciones Perdidas y Anunnaki", 17.5, "Media"],
        ["Evolución Especulativa y Biología (Arte IA Bizarro)", 15.0, "Alta"],
        ["Tecnología Ancestral Oculta y Misterios (Estilo Secret Origins)", 18.0, "Media"],
        ["Visualización del Fin del Mundo y Dinosaurios (Sora/AI Video)", 16.0, "Baja"],
        ["Cuentos Infantiles (Midjourney + ElevenLabs)", 14.0, "Media"],
        ["Documentales Históricos Recreados con IA", 16.5, "Media"],
        ["Noticias tech narradas por AI Avatar", 18.0, "Media"],
        ["Recetas generadas por ChatGPT visualizadas", 12.0, "Baja"],
        ["Resúmenes de películas (Voz IA + Stock)", 8.5, "Alta"],
        ["Meditaciones guiadas con Voz Clonada", 15.0, "Baja"],
        ["Tutoriales de Python con Claude 3 Opus", 24.0, "Baja"],
        ["Canal de Curiosidades Diarias (100% Automático)", 10.0, "Muy Alta"],
        ["Creación de Lo-Fi Beats con Suno AI", 6.0, "Media"],
        ["Finanzas para Gen Z con IA animada", 26.0, "Media"],
        ["Canal de motivación estoica (Voz profunda AI)", 13.0, "Alta"]
    ];

    const modifiers = [
        [" (Paso a Paso)", 1.1], [" con IA", 1.4], [" en 2024", 1.2],
        [" para Principiantes", 0.9], [" (Faceless Automatizado)", 1.5], [" (Masterclass)", 1.5],
        [" Explicado", 1.0], [" Sin Inversión", 0.8], [" Rentable", 1.2],
        [" Ninja", 1.1], [" Automático", 1.3], [" para Introvertidos", 0.9]
    ];

    let niches = [];

    base_niches.forEach(([name, cpm, comp]) => {
        niches.push({ name, base_cpm: cpm, competition: comp });
    });

    ai_faceless_niches.forEach(([name, cpm, comp]) => {
        niches.push({ name, base_cpm: cpm, competition: comp });
    });

    const combined_base = [...base_niches, ...ai_faceless_niches];
    for (let i = 0; i < 120; i++) {
        const base = combined_base[Math.floor(Math.random() * combined_base.length)];
        const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
        niches.push({
            name: `${base[0]}${mod[0]}`,
            base_cpm: parseFloat((base[1] * mod[1]).toFixed(2)),
            competition: base[2]
        });
    }

    niches = niches.map(niche => {
        const interest = Math.random() * (1.8 - 0.5) + 0.5;
        const comp_penalties = { "Baja": 1, "Media": 3, "Alta": 6, "Muy Alta": 8, "Extrema": 12 };
        const comp_penalty = comp_penalties[niche.competition] || 5;

        const score = (niche.base_cpm * 2.5) - (comp_penalty * 1.5) * interest;
        const trend_score = parseFloat(Math.max(score, 1.0).toFixed(2));

        const floor = parseFloat((niche.base_cpm * 0.8).toFixed(2));
        const ceil = parseFloat((niche.base_cpm * 1.8).toFixed(2));

        return {
            ...niche,
            trend_score,
            estimated_cpm: `$${floor} - $${ceil}`
        };
    });

    // Remove duplicates
    const seen = new Set();
    const unique_niches = niches.filter(n => {
        if (!seen.has(n.name)) {
            seen.add(n.name);
            return true;
        }
        return false;
    });

    return unique_niches.sort((a, b) => b.trend_score - a.trend_score);
};
