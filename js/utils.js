/**
 * Utility functions for AquaSense frontend
 */

/**
 * Get OpenAI API Key from local storage
 * Users need to set this in settings
 */
function getOpenAIKey() {
    const key = storage.get('openai_api_key');
    if (!key) {
        throw new Error('OpenAI API key not set. Please set it in settings.');
    }
    return key;
}

/**
 * Set OpenAI API Key
 */
function setOpenAIKey(key) {
    storage.set('openai_api_key', key);
}

/**
 * Check if OpenAI API Key is set
 */
function hasOpenAIKey() {
    return storage.get('openai_api_key') !== null;
}

/**
 * Make OpenAI API call directly from frontend
 */
async function callOpenAI(messages, options = {}) {
    const apiKey = getOpenAIKey();
    
    const defaultOptions = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 500,
        ...options
    };
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: defaultOptions.model,
                messages: messages,
                temperature: defaultOptions.temperature,
                max_tokens: defaultOptions.max_tokens
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'OpenAI API request failed');
        }
        
        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API call error:', error);
        throw error;
    }
}

/**
 * Generate image using DALL-E
 */
async function generateImageDALLE(prompt, options = {}) {
    const apiKey = getOpenAIKey();
    
    const defaultOptions = {
        model: 'dall-e-3',
        size: '1024x1024',
        quality: 'standard',
        n: 1,
        ...options
    };
    
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: defaultOptions.model,
                prompt: prompt,
                size: defaultOptions.size,
                quality: defaultOptions.quality,
                n: defaultOptions.n
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'DALL-E API request failed');
        }
        
        const result = await response.json();
        return result.data[0].url;
    } catch (error) {
        console.error('DALL-E API call error:', error);
        throw error;
    }
}

/**
 * Local storage utilities
 */
const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

/**
 * Generate or retrieve session ID
 */
function getSessionId() {
    let sessionId = storage.get('aquasense_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        storage.set('aquasense_session_id', sessionId);
    }
    return sessionId;
}

/**
 * Format date for display
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format liters for display
 */
function formatLiters(liters) {
    if (liters >= 1000) {
        return (liters / 1000).toFixed(2) + ' kL';
    }
    return liters.toFixed(2) + ' L';
}
