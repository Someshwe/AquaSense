/**
 * Main JavaScript for AquaSense homepage
 */

// Initialize mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            
            // Update aria-expanded
            mobileMenuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
    }
    
    // Initialize session
    if (typeof getSessionId === 'function') {
        getSessionId();
    }
    
    // Check API health
    checkApiHealth();
    
    // Handle scroll for transparent header
    handleNavbarScroll();
});

/**
 * Handle navbar transparency on scroll
 */
function handleNavbarScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Check if backend API is running
 */
async function checkApiHealth() {
    try {
        if (typeof apiCall === 'function') {
            const response = await apiCall('/health');
            console.log('API is healthy:', response);
        }
    } catch (error) {
        console.warn('API health check failed. Backend may not be running.');
    }
}

