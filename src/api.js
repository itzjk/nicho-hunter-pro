import {
    searchVideosMock,
    calculateMetrics,
    generateActionPlan,
    generateVideoIdeas,
    generateOptimizationTips,
    generateChatgptPrompt,
    generateMidjourneyPrompt,
    generateCompetitorHooks,
    generateAiProductionToolkit,
    generateReadyHooks,
    getTrendsMock
} from './mockBackend';

// Mocks database for search history within the session
let historyStore = [];

export const searchNiche = async (keyword) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const videos = searchVideosMock(keyword);
    const { virality_score, estimated_cpm } = calculateMetrics(videos);

    const result = {
        keyword,
        virality_score,
        estimated_cpm,
        top_videos: videos,
        action_plan: generateActionPlan(keyword),
        video_ideas: generateVideoIdeas(keyword),
        optimization_tips: generateOptimizationTips(keyword),
        chatgpt_prompt: generateChatgptPrompt(keyword),
        midjourney_prompt: generateMidjourneyPrompt(keyword),
        competitor_hooks: generateCompetitorHooks(keyword),
        ai_production_toolkit: generateAiProductionToolkit(keyword),
        ready_hooks: generateReadyHooks(keyword),
        message: "Analysis complete"
    };

    // Keep history
    historyStore.unshift({
        keyword,
        virality_score,
        estimated_cpm,
        top_video_titles: videos.slice(0, 5).map(v => v.title),
        created_at: new Date().toISOString()
    });
    // limit history to 10
    if (historyStore.length > 10) { historyStore.pop(); }

    return result;
};

export const getHistory = async (limit = 10) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return historyStore.slice(0, limit);
};

export const subscribeAlert = async (email, niche_keyword) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: "Successfully subscribed to daily alerts" };
};

export const getPremiumCheckout = async (keyword, email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { checkout_url: "https://buy.stripe.com/test_premium_mock" };
};

export const getTrends = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return getTrendsMock();
};
