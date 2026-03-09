/**
 * AI Content Generator JavaScript
 */

// Predefined water conservation slogans
const PREDEFINED_SLOGANS = [
    "Every Drop Counts - Save Water Today",
    "Conserve Water, Conserve Life",
    "Water is Life - Don't Waste It",
    "Save Water, Save Earth",
    "Drop by Drop, We Make a Difference",
    "Turn Off the Tap, Turn On Conservation",
    "Water Wisely, Live Sustainably",
    "Every Drop Saved is a Drop Earned",
    "Protect Our Water, Protect Our Future",
    "Be Water Smart, Start Saving Today",
    "Water Conservation Starts With You",
    "Save Water, Secure Tomorrow",
    "Think Before You Drink - Conserve Water",
    "Water is Precious - Use It Wisely",
    "Small Changes, Big Impact on Water",
    "Conserve Today, Thrive Tomorrow",
    "Water Conservation: Our Shared Responsibility",
    "Every Drop Matters - Join the Movement",
    "Save Water, Save Lives",
    "Water Conservation: Simple Actions, Lasting Impact"
];

document.addEventListener('DOMContentLoaded', () => {
    const sloganBtn = document.getElementById('generate-slogan-btn');
    const imageBtn = document.getElementById('generate-image-btn');
    
    if (sloganBtn) {
        sloganBtn.addEventListener('click', generateSlogan);
    }
    
    if (imageBtn) {
        imageBtn.addEventListener('click', generateImage);
    }
});

function generateSlogan() {
    const btn = document.getElementById('generate-slogan-btn');
    const container = document.getElementById('slogan-container');
    const text = document.getElementById('slogan-text');
    
    btn.disabled = true;
    btn.textContent = 'Generating...';
    container.classList.add('hidden');
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
        // Randomly select a slogan from predefined list
        const randomIndex = Math.floor(Math.random() * PREDEFINED_SLOGANS.length);
        const slogan = PREDEFINED_SLOGANS[randomIndex];
        
        text.textContent = slogan;
        container.classList.remove('hidden');
        
        btn.disabled = false;
        btn.textContent = 'Generate Slogan';
    }, 500);
}

async function generateImage() {
    const btn = document.getElementById('generate-image-btn');
    const promptInput = document.getElementById('image-prompt');
    const container = document.getElementById('image-container');
    const image = document.getElementById('generated-image');
    
    const prompt = promptInput.value.trim() || 'water conservation, nature, blue and green colors';
    
    btn.disabled = true;
    btn.textContent = 'Generating...';
    container.classList.add('hidden');
    
    try {
        const imageUrl = await generateImageDALLE(
            `Beautiful illustration of ${prompt}, water conservation theme, modern digital art style`
        );
        
        if (imageUrl) {
            image.src = imageUrl;
            container.classList.remove('hidden');
        } else {
            alert('Failed to generate image. Please try again.');
        }
        
    } catch (error) {
        console.error('Failed to generate image:', error);
        const errorMsg = error.message.includes('API key') 
            ? 'Please set your OpenAI API key in settings.'
            : 'Failed to generate image. Please try again.';
        alert(errorMsg);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Generate Image';
    }
}

