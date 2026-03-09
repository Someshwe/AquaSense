/**
 * AquaMate Chatbot JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-container');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (form) {
        form.addEventListener('submit', handleChatSubmit);
    }
    
    // Example questions
    const exampleButtons = document.querySelectorAll('.example-question');
    exampleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.textContent.trim();
            handleChatSubmit(new Event('submit'));
        });
    });
    
    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
});

async function handleChatSubmit(e) {
    e.preventDefault();
    
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Add user message
    addMessage(message, 'user');
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        const systemPrompt = `You are AquaMate, a friendly water conservation assistant. 
        You help users understand their water usage and provide practical tips for saving water. 
        Be conversational, encouraging, and helpful. Keep responses concise and actionable.`;
        
        const reply = await callOpenAI([
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": message}
        ], {
            temperature: 0.7,
            max_tokens: 200
        });
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add bot response
        addMessage(reply || 'I apologize, but I encountered an error. Please try again.', 'bot');
        
    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator(typingId);
        const errorMsg = error.message.includes('API key') 
            ? 'Please set your OpenAI API key in settings to use the chatbot.'
            : 'I apologize, but I encountered an error. Please try again.';
        addMessage(errorMsg, 'bot');
    }
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const container = document.getElementById('chat-container');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="flex-1 bg-gray-100 rounded-lg p-4 ml-12">
                <p class="text-gray-700">${escapeHtml(message)}</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                👤
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-10 h-10 rounded-full water-gradient flex items-center justify-center text-white font-bold">
                🌊
            </div>
            <div class="flex-1 bg-blue-50 rounded-lg p-4">
                <p class="text-gray-700">${escapeHtml(message)}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingId = 'typing-' + Date.now();
    
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'flex items-start space-x-3';
    typingDiv.innerHTML = `
        <div class="w-10 h-10 rounded-full water-gradient flex items-center justify-center text-white font-bold">
            🌊
        </div>
        <div class="flex-1 bg-blue-50 rounded-lg p-4">
            <div class="flex space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    
    const container = document.getElementById('chat-container');
    container.scrollTop = container.scrollHeight;
    
    return typingId;
}

function removeTypingIndicator(id) {
    const typingDiv = document.getElementById(id);
    if (typingDiv) {
        typingDiv.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

