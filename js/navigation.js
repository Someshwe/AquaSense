/**
 * Navigation utilities - updates navigation with login/logout
 */

/**
 * Update navigation bar with auth status
 */
function updateNavigation() {
    // Check if auth functions exist
    if (typeof getCurrentUser === 'undefined') {
        // Auth not implemented yet, skip
        return;
    }
    
    const user = getCurrentUser();
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Update desktop auth container
    const desktopAuthContainer = nav.querySelector('.auth-container');
    if (desktopAuthContainer) {
        if (user) {
            // User is logged in - show profile dropdown with logout and settings
            desktopAuthContainer.innerHTML = `
                <div class="relative group">
                    <button class="nav-link px-4 py-2.5 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all flex items-center space-x-2 bg-transparent border-none text-white cursor-pointer font-bold uppercase text-sm tracking-wide" style="text-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                        <span>${user.name || user.email}</span>
                        <span class="text-xs">▼</span>
                    </button>
                    <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                        <div class="py-2">
                            <div class="px-4 py-2 border-b border-gray-200">
                                <p class="text-sm font-semibold text-gray-800">${user.name || 'User'}</p>
                                <p class="text-xs text-gray-500">${user.email}</p>
                            </div>
                            <a href="settings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">⚙️ Settings</a>
                            <button onclick="handleLogout()" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer">🚪 Logout</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login and signup
            desktopAuthContainer.innerHTML = `
                <a href="auth.html?tab=login" class="nav-link px-4 py-2.5 rounded-lg transition-all relative">Login</a>
                <a href="auth.html?tab=signup" class="nav-link px-4 py-2.5 rounded-lg transition-all relative hover:bg-white hover:bg-opacity-20 font-extrabold">Signup</a>
            `;
        }
    }
    
    // Update mobile menu - remove existing auth section first
    const mobileMenu = nav.querySelector('#mobile-menu');
    if (mobileMenu) {
        // Remove any existing auth sections (both hardcoded and dynamically added)
        // Check all child elements for auth links
        const allChildren = Array.from(mobileMenu.children);
        allChildren.forEach(child => {
            // Check if this element or its children contain auth links
            const hasAuthLinks = child.querySelector('a[href*="auth.html"]') || 
                                child.querySelector('a[href*="settings.html"]') ||
                                child.querySelector('button[onclick*="handleLogout"]');
            
            // Also check if it's our dynamically added auth section
            if (hasAuthLinks || child.classList.contains('auth-mobile')) {
                child.remove();
            }
        });
        
        // Create new auth section for mobile
        const authMobile = document.createElement('div');
        authMobile.className = 'auth-mobile border-t border-white border-opacity-30 pt-2 mt-2';
        
        if (user) {
            authMobile.innerHTML = `
                <div class="px-4 py-2">
                    <div class="text-sm font-semibold mb-1 text-white" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${user.name || 'User'}</div>
                    <div class="text-xs opacity-75 mb-3 text-white" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${user.email}</div>
                    <a href="settings.html" class="block py-3 px-4 hover:bg-white hover:bg-opacity-25 rounded-lg transition-all transform hover:translate-x-2 font-bold uppercase text-sm tracking-wide text-white" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">⚙️ Settings</a>
                    <button onclick="handleLogout()" class="block w-full text-left py-3 px-4 hover:bg-white hover:bg-opacity-25 rounded-lg transition-all transform hover:translate-x-2 font-bold uppercase text-sm tracking-wide text-white bg-transparent border-none cursor-pointer" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">🚪 Logout</button>
                </div>
            `;
        } else {
            authMobile.innerHTML = `
                <a href="auth.html?tab=login" class="block py-3 px-4 hover:bg-white hover:bg-opacity-25 rounded-lg transition-all transform hover:translate-x-2 font-bold uppercase text-sm tracking-wide text-white border border-white border-opacity-20 mb-2" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">Login</a>
                <a href="auth.html?tab=signup" class="block py-3 px-4 hover:bg-white hover:bg-opacity-35 rounded-lg transition-all transform hover:translate-x-2 font-extrabold uppercase text-sm tracking-wide text-white bg-white bg-opacity-20" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">Signup</a>
            `;
        }
        
        mobileMenu.appendChild(authMobile);
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    if (typeof logout === 'function') {
        logout();
    }
    // Update navigation immediately
    updateNavigation();
    // Redirect to home page
    window.location.href = 'index.html';
}

// Update navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        updateNavigation();
        
        // Mark active nav link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPage || href.includes(currentPage.split('.')[0]))) {
                link.classList.add('active');
            }
        });
    }, 100);
});
