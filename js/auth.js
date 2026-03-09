/**
 * Authentication system using local storage
 */

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    const user = storage.get('current_user');
    return user !== null && user !== undefined;
}

/**
 * Get current user
 */
function getCurrentUser() {
    return storage.get('current_user');
}

/**
 * Register a new user
 */
function signup(email, password, name) {
    // Validate input
    if (!email || !password || !name) {
        throw new Error('All fields are required');
    }
    
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    
    // Check if user already exists
    const users = storage.get('users') || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        email: email,
        password: password, // In production, this should be hashed
        name: name,
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    storage.set('users', users);
    
    // Auto login
    storage.set('current_user', {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
    });
    
    return newUser;
}

/**
 * Login user
 */
function login(email, password) {
    const users = storage.get('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    // Set current user (without password)
    storage.set('current_user', {
        id: user.id,
        email: user.email,
        name: user.name
    });
    
    return {
        id: user.id,
        email: user.email,
        name: user.name
    };
}

/**
 * Logout user
 */
function logout() {
    storage.remove('current_user');
}

/**
 * Update user profile
 */
function updateProfile(name) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('Not logged in');
    }
    
    const users = storage.get('users') || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    users[userIndex].name = name;
    storage.set('users', users);
    
    // Update current user
    currentUser.name = name;
    storage.set('current_user', currentUser);
    
    return currentUser;
}

/**
 * Check authentication and redirect if needed
 */
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'auth.html';
        return false;
    }
    return true;
}

