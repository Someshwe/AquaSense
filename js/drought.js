/**
 * Drought Monitor - Fresh Implementation
 * Monitors water levels across India with real-time warnings
 */

// India Water Level Dataset
const INDIA_WATER_DATA = {
    states: [
        { name: 'Maharashtra', region: 'West', reservoirs: [
            { name: 'Ujani Dam', capacity: 117000000, current: 35000000, location: 'Solapur' },
            { name: 'Khadakwasla Dam', capacity: 30000000, current: 12000000, location: 'Pune' },
            { name: 'Tansa Dam', capacity: 20000000, current: 8000000, location: 'Thane' }
        ], rainfall: 45 },
        { name: 'Karnataka', region: 'South', reservoirs: [
            { name: 'Krishna Raja Sagara', capacity: 49000000, current: 25000000, location: 'Mysore' },
            { name: 'Tungabhadra Dam', capacity: 101000000, current: 45000000, location: 'Bellary' },
            { name: 'Almatti Dam', capacity: 123000000, current: 60000000, location: 'Bagalkot' }
        ], rainfall: 52 },
        { name: 'Tamil Nadu', region: 'South', reservoirs: [
            { name: 'Mettur Dam', capacity: 93000000, current: 55000000, location: 'Salem' },
            { name: 'Bhavani Sagar', capacity: 32000000, current: 18000000, location: 'Erode' }
        ], rainfall: 58 },
        { name: 'Gujarat', region: 'West', reservoirs: [
            { name: 'Sardar Sarovar', capacity: 9500000000, current: 3500000000, location: 'Narmada' },
            { name: 'Ukai Dam', capacity: 7410000000, current: 2800000000, location: 'Tapi' }
        ], rainfall: 38 },
        { name: 'Rajasthan', region: 'North', reservoirs: [
            { name: 'Bisalpur Dam', capacity: 1100000000, current: 280000000, location: 'Tonk' },
            { name: 'Jawai Dam', capacity: 560000000, current: 120000000, location: 'Pali' }
        ], rainfall: 25 },
        { name: 'Madhya Pradesh', region: 'Central', reservoirs: [
            { name: 'Indira Sagar', capacity: 12300000000, current: 5500000000, location: 'Khandwa' },
            { name: 'Omkareshwar', capacity: 2900000000, current: 1200000000, location: 'Khandwa' }
        ], rainfall: 42 },
        { name: 'Uttar Pradesh', region: 'North', reservoirs: [
            { name: 'Rihand Dam', capacity: 10600000000, current: 4800000000, location: 'Sonbhadra' },
            { name: 'Matatila Dam', capacity: 1130000000, current: 420000000, location: 'Lalitpur' }
        ], rainfall: 48 },
        { name: 'Andhra Pradesh', region: 'South', reservoirs: [
            { name: 'Srisailam Dam', capacity: 8720000000, current: 4200000000, location: 'Kurnool' },
            { name: 'Nagarjuna Sagar', capacity: 11560000000, current: 5500000000, location: 'Nalgonda' }
        ], rainfall: 55 },
        { name: 'Telangana', region: 'South', reservoirs: [
            { name: 'Sriram Sagar', capacity: 3100000000, current: 1200000000, location: 'Nizamabad' },
            { name: 'Nizam Sagar', capacity: 2900000000, current: 950000000, location: 'Nizamabad' }
        ], rainfall: 50 },
        { name: 'Punjab', region: 'North', reservoirs: [
            { name: 'Bhakra Dam', capacity: 9628000000, current: 4200000000, location: 'Bilaspur' },
            { name: 'Pong Dam', capacity: 8570000000, current: 3800000000, location: 'Kangra' }
        ], rainfall: 62 },
        { name: 'Haryana', region: 'North', reservoirs: [
            { name: 'Kaushalya Dam', capacity: 300000000, current: 120000000, location: 'Panchkula' }
        ], rainfall: 40 },
        { name: 'West Bengal', region: 'East', reservoirs: [
            { name: 'Durgapur Barrage', capacity: 500000000, current: 280000000, location: 'Bardhaman' },
            { name: 'Farakka Barrage', capacity: 2200000000, current: 1200000000, location: 'Murshidabad' }
        ], rainfall: 68 },
        { name: 'Odisha', region: 'East', reservoirs: [
            { name: 'Hirakud Dam', capacity: 8100000000, current: 4200000000, location: 'Sambalpur' },
            { name: 'Indravati', capacity: 2700000000, current: 1400000000, location: 'Kalahandi' }
        ], rainfall: 72 },
        { name: 'Kerala', region: 'South', reservoirs: [
            { name: 'Idukki Dam', capacity: 1460000000, current: 850000000, location: 'Idukki' },
            { name: 'Idamalayar', capacity: 1100000000, current: 650000000, location: 'Ernakulam' }
        ], rainfall: 88 },
        { name: 'Himachal Pradesh', region: 'North', reservoirs: [
            { name: 'Pandoh Dam', capacity: 410000000, current: 250000000, location: 'Mandi' }
        ], rainfall: 75 },
        { name: 'Jharkhand', region: 'East', reservoirs: [
            { name: 'Maithon Dam', capacity: 1200000000, current: 450000000, location: 'Dhanbad' },
            { name: 'Panchet Hill', capacity: 1500000000, current: 550000000, location: 'Dhanbad' }
        ], rainfall: 35 },
        { name: 'Chhattisgarh', region: 'Central', reservoirs: [
            { name: 'Hasdeo Bango', capacity: 3100000000, current: 1200000000, location: 'Korba' }
        ], rainfall: 48 },
        { name: 'Bihar', region: 'East', reservoirs: [
            { name: 'Kosi Barrage', capacity: 1800000000, current: 850000000, location: 'Supaul' }
        ], rainfall: 55 },
        { name: 'Assam', region: 'Northeast', reservoirs: [
            { name: 'Kopili', capacity: 500000000, current: 320000000, location: 'Dima Hasao' }
        ], rainfall: 95 },
        { name: 'Uttarakhand', region: 'North', reservoirs: [
            { name: 'Tehri Dam', capacity: 3540000000, current: 1800000000, location: 'Tehri' }
        ], rainfall: 70 }
    ]
};

// Rainfall data
const RAINFALL_DATA = {
    historical: [
        { month: 'Jan', rainfall: 85, year: 2024 },
        { month: 'Feb', rainfall: 72, year: 2024 },
        { month: 'Mar', rainfall: 95, year: 2024 },
        { month: 'Apr', rainfall: 68, year: 2024 },
        { month: 'May', rainfall: 45, year: 2024 },
        { month: 'Jun', rainfall: 32, year: 2024 },
        { month: 'Jul', rainfall: 28, year: 2024 },
        { month: 'Aug', rainfall: 35, year: 2024 },
        { month: 'Sep', rainfall: 58, year: 2024 },
        { month: 'Oct', rainfall: 78, year: 2024 },
        { month: 'Nov', rainfall: 92, year: 2024 },
        { month: 'Dec', rainfall: 88, year: 2024 },
        { month: 'Jan', rainfall: 82, year: 2025 },
        { month: 'Feb', rainfall: 75, year: 2025 },
        { month: 'Mar', rainfall: 68, year: 2025 },
        { month: 'Apr', rainfall: 55, year: 2025 },
        { month: 'May', rainfall: 42, year: 2025 },
        { month: 'Jun', rainfall: 38, year: 2025 },
        { month: 'Jul', rainfall: 25, year: 2025 },
        { month: 'Aug', rainfall: 30, year: 2025 },
        { month: 'Sep', rainfall: 52, year: 2025 },
        { month: 'Oct', rainfall: 70, year: 2025 },
        { month: 'Nov', rainfall: 85, year: 2025 },
        { month: 'Dec', rainfall: 80, year: 2025 }
    ],
    average: 65
};

// Initialize the drought monitor
function initDroughtMonitor() {
    console.log('Initializing Drought Monitor...');
    
    // Update timestamp
    updateTimestamp();
    
    // Load and display states
    loadStatesData();
    
    // Load rainfall data
    loadRainfallData();
    
    // Load user impact
    loadUserImpact();
    
    // Update stats
    updateStats();
    
    // Set up auto-refresh every 5 minutes
    setInterval(() => {
        loadStatesData();
        updateStats();
        updateTimestamp();
    }, 300000);
    
    console.log('Drought Monitor initialized successfully');
}

// Calculate state water level percentage
function calculateStateLevel(state) {
    const totalCapacity = state.reservoirs.reduce((sum, r) => sum + r.capacity, 0);
    const totalCurrent = state.reservoirs.reduce((sum, r) => sum + r.current, 0);
    return totalCapacity > 0 ? (totalCurrent / totalCapacity) * 100 : 0;
}

// Get warning level for a percentage
function getWarningLevel(percentage) {
    if (percentage < 30) return { level: 'critical', color: 'red', icon: '🚨', message: 'CRITICAL: Immediate action required' };
    if (percentage < 50) return { level: 'severe', color: 'orange', icon: '🔥', message: 'SEVERE: Urgent conservation needed' };
    if (percentage < 70) return { level: 'moderate', color: 'yellow', icon: '⚠️', message: 'MODERATE: Increased conservation recommended' };
    return { level: 'normal', color: 'green', icon: '✅', message: 'NORMAL: Continue conservation efforts' };
}

// Load and display states data
function loadStatesData() {
    const container = document.getElementById('states-container');
    if (!container) return;
    
    const formatNum = typeof formatNumber === 'function' ? formatNumber : (n) => n.toLocaleString();
    
    const colorClasses = {
        critical: {
            border: 'border-red-200',
            text: 'text-red-600',
            bg: 'bg-red-500',
            textDark: 'text-red-700',
            bgLight: 'bg-red-50'
        },
        severe: {
            border: 'border-orange-200',
            text: 'text-orange-600',
            bg: 'bg-orange-500',
            textDark: 'text-orange-700',
            bgLight: 'bg-orange-50'
        },
        moderate: {
            border: 'border-yellow-200',
            text: 'text-yellow-600',
            bg: 'bg-yellow-500',
            textDark: 'text-yellow-700',
            bgLight: 'bg-yellow-50'
        },
        normal: {
            border: 'border-green-200',
            text: 'text-green-600',
            bg: 'bg-green-500',
            textDark: 'text-green-700',
            bgLight: 'bg-green-50'
        }
    };
    
    container.innerHTML = INDIA_WATER_DATA.states.map(state => {
        const percentage = calculateStateLevel(state);
        const warning = getWarningLevel(percentage);
        const totalReservoirs = state.reservoirs.length;
        const colors = colorClasses[warning.level];
        
        return `
            <div class="bg-white border-2 ${colors.border} rounded-lg p-4 hover:shadow-lg transition-all ${warning.level === 'critical' ? 'warning-card' : ''}">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-lg text-gray-800">${state.name}</h3>
                        <p class="text-sm text-gray-600">${state.region} Region</p>
                    </div>
                    <span class="text-3xl">${warning.icon}</span>
                </div>
                <div class="mb-3">
                    <div class="flex justify-between text-sm mb-2">
                        <span class="text-gray-600">Water Level</span>
                        <span class="font-bold ${colors.text}">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div class="${colors.bg} h-3 rounded-full progress-bar" style="width: ${percentage}%"></div>
                    </div>
                </div>
                <div class="text-xs text-gray-600 mb-2">
                    <div>Rainfall: ${state.rainfall} mm</div>
                    <div>Reservoirs: ${totalReservoirs}</div>
                </div>
                <div class="text-xs font-semibold ${colors.textDark} ${colors.bgLight} rounded px-2 py-1">
                    ${warning.message}
                </div>
            </div>
        `;
    }).join('');
}

// Update statistics counters
function updateStats() {
    const states = INDIA_WATER_DATA.states;
    const critical = states.filter(s => calculateStateLevel(s) < 30).length;
    const severe = states.filter(s => calculateStateLevel(s) >= 30 && calculateStateLevel(s) < 50).length;
    const moderate = states.filter(s => calculateStateLevel(s) >= 50 && calculateStateLevel(s) < 70).length;
    const normal = states.filter(s => calculateStateLevel(s) >= 70).length;
    
    document.getElementById('critical-count').textContent = critical;
    document.getElementById('severe-count').textContent = severe;
    document.getElementById('moderate-count').textContent = moderate;
    document.getElementById('normal-count').textContent = normal;
    
    // Update total reservoirs count
    const totalReservoirs = states.reduce((sum, s) => sum + s.reservoirs.length, 0);
    document.getElementById('total-reservoirs').textContent = totalReservoirs;
    
    // Show alert if critical states exist
    if (critical > 0 || severe > 0) {
        const alertBanner = document.getElementById('alert-banner');
        const alertMessage = document.getElementById('alert-message');
        if (alertBanner && alertMessage) {
            alertBanner.classList.remove('hidden');
            let message = '';
            if (critical > 0) message += `🚨 ${critical} state(s) in CRITICAL condition! `;
            if (severe > 0) message += `🔥 ${severe} state(s) in SEVERE condition! `;
            message += 'Immediate water conservation required.';
            alertMessage.innerHTML = `<span class="mr-2 text-2xl">⚠️</span><span>${message}</span>`;
        }
    }
}

// Load rainfall data
function loadRainfallData() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const currentRainfall = RAINFALL_DATA.historical.find(
        r => r.month === monthNames[currentMonth] && r.year === currentYear
    )?.rainfall || RAINFALL_DATA.average;
    
    document.getElementById('current-rainfall').textContent = `${currentRainfall} mm`;
    document.getElementById('avg-rainfall').textContent = `${RAINFALL_DATA.average} mm`;
    
    // Create chart
    if (typeof Chart !== 'undefined') {
        createRainfallChart();
    }
}

// Create rainfall chart
function createRainfallChart() {
    const canvas = document.getElementById('rainfall-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const last12Months = RAINFALL_DATA.historical.slice(-12);
    
    if (window.rainfallChart) {
        window.rainfallChart.destroy();
    }
    
    window.rainfallChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last12Months.map(r => r.month),
            datasets: [{
                label: 'Rainfall (mm)',
                data: last12Months.map(r => r.rainfall),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Average',
                data: last12Months.map(() => RAINFALL_DATA.average),
                borderColor: 'rgb(156, 163, 175)',
                borderDash: [5, 5],
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rainfall (mm)'
                    }
                }
            }
        }
    });
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('update-time').textContent = timeStr;
}

// Load user impact
function loadUserImpact() {
    const section = document.getElementById('user-impact-section');
    if (!section) return;
    
    if (typeof storage === 'undefined') {
        section.innerHTML = `
            <h2 class="text-2xl font-bold mb-4 flex items-center">
                <span class="mr-2">💧</span>
                Your Water Conservation Impact
            </h2>
            <p class="text-gray-600">Track your water savings and see how they contribute to reservoir levels.</p>
            <a href="impact.html" class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Submit Your Impact
            </a>
        `;
        return;
    }
    
    const impacts = storage.get('impact_data') || [];
    const totalSaved = impacts.reduce((sum, i) => sum + (i.liters || 0), 0);
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyImpacts = impacts.filter(i => {
        if (!i.date) return false;
        const date = new Date(i.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    const monthlySaved = monthlyImpacts.reduce((sum, i) => sum + (i.liters || 0), 0);
    
    const formatNum = typeof formatNumber === 'function' ? formatNumber : (n) => n.toLocaleString();
    
    section.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 flex items-center">
            <span class="mr-2">💧</span>
            Your Water Conservation Impact
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-blue-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">This Month</div>
                <div class="text-3xl font-bold text-blue-600">${formatNum(monthlySaved)} L</div>
            </div>
            <div class="bg-green-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Total Saved</div>
                <div class="text-3xl font-bold text-green-600">${formatNum(totalSaved)} L</div>
            </div>
            <div class="bg-purple-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Reservoir Contribution</div>
                <div class="text-3xl font-bold text-purple-600">${formatNum(Math.round(monthlySaved * 0.1))} L</div>
                <div class="text-xs text-gray-500 mt-1">10% of savings</div>
            </div>
        </div>
        <p class="mt-4 text-gray-600 text-sm">
            Your water conservation efforts help maintain healthy reservoir levels across India. 
            <a href="impact.html" class="text-blue-600 hover:underline">Submit more impact data</a> to contribute!
        </p>
    `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDroughtMonitor);
} else {
    initDroughtMonitor();
}

