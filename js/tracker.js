/**
 * Water Tracker JavaScript - Fixed calculations for daily, weekly, and monthly tracking
 */

let usageChart = null;
let breakdownChart = null;
let impactChart = null;
let monthlyTrendChart = null;

// Water-saving tips
const waterTips = [
    "Take shorter showers - reducing by just 2 minutes can save 20 liters per day",
    "Fix leaky faucets - a single drip can waste 20 liters per day",
    "Use a dishwasher instead of hand washing - it uses less water",
    "Install low-flow showerheads - can save up to 50% of water",
    "Water your garden in the early morning or evening to reduce evaporation",
    "Use a broom instead of a hose to clean driveways and sidewalks",
    "Collect rainwater for garden watering",
    "Turn off the tap while brushing teeth - saves 10 liters per day",
    "Only run the dishwasher and washing machine with full loads",
    "Use a bucket instead of a hose when washing your car"
];

/**
 * Initialize tracker page
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usage-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Load existing data if available
    loadSavedData();
    
    // Load and display impact data
    loadImpactData();
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        householdSize: parseInt(document.getElementById('household-size').value) || 1,
        showers: parseFloat(document.getElementById('showers').value) || 0,
        showerDuration: parseFloat(document.getElementById('shower-duration').value) || 0,
        dishwasher: parseFloat(document.getElementById('dishwasher').value) || 0, // per week
        laundry: parseFloat(document.getElementById('laundry').value) || 0, // per week
        carWash: parseFloat(document.getElementById('car-wash').value) || 0, // per month
        garden: parseFloat(document.getElementById('garden').value) || 0, // minutes per week
        toilet: parseFloat(document.getElementById('toilet').value) || 0 // per day per person
    };
    
    // Calculate water usage
    const calculations = calculateWaterUsage(formData);
    
    // Save to local storage with today's date
    saveUsageData(calculations);
    
    // Display dashboard
    displayDashboard(calculations);
}

/**
 * Calculate water usage based on inputs - FIXED VERSION
 */
function calculateWaterUsage(data) {
    // Average water usage per activity (in liters)
    const SHOWER_PER_MIN = 9; // liters per minute
    const DISHWASHER_PER_LOAD = 15; // liters per load
    const LAUNDRY_PER_LOAD = 50; // liters per load
    const CAR_WASH = 100; // liters per wash
    const GARDEN_PER_MIN = 10; // liters per minute (with hose)
    const TOILET_PER_FLUSH = 6; // liters per flush
    const OTHER_DAILY = 20; // Other daily activities (handwashing, cooking, etc.)
    
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    // Calculate DAILY usage (convert everything to daily)
    const daily = {
        shower: (data.showers * data.showerDuration * SHOWER_PER_MIN),
        toilet: (data.toilet * TOILET_PER_FLUSH * data.householdSize),
        dishwasher: (data.dishwasher / 7 * DISHWASHER_PER_LOAD), // weekly to daily
        laundry: (data.laundry / 7 * LAUNDRY_PER_LOAD), // weekly to daily
        garden: (data.garden / 7 * GARDEN_PER_MIN), // weekly minutes to daily
        carWash: (data.carWash / 30 * CAR_WASH), // monthly to daily
        other: OTHER_DAILY
    };
    
    const dailyTotal = Object.values(daily).reduce((sum, val) => sum + val, 0);
    
    // Calculate WEEKLY usage (daily * 7, but adjust for weekly/monthly activities)
    const weekly = {
        shower: daily.shower * 7,
        toilet: daily.toilet * 7,
        dishwasher: (data.dishwasher * DISHWASHER_PER_LOAD), // direct weekly calculation
        laundry: (data.laundry * LAUNDRY_PER_LOAD), // direct weekly calculation
        garden: (data.garden * GARDEN_PER_MIN), // direct weekly calculation
        carWash: (data.carWash / 30 * CAR_WASH * 7), // monthly prorated to weekly
        other: daily.other * 7
    };
    const weeklyTotal = Object.values(weekly).reduce((sum, val) => sum + val, 0);
    
    // Calculate MONTHLY usage (daily * 30, but adjust for weekly/monthly activities)
    const monthly = {
        shower: daily.shower * 30,
        toilet: daily.toilet * 30,
        dishwasher: (data.dishwasher / 7 * 30 * DISHWASHER_PER_LOAD), // weekly to monthly
        laundry: (data.laundry / 7 * 30 * LAUNDRY_PER_LOAD), // weekly to monthly
        garden: (data.garden / 7 * 30 * GARDEN_PER_MIN), // weekly to monthly
        carWash: (data.carWash * CAR_WASH), // direct monthly calculation
        other: daily.other * 30
    };
    const monthlyTotal = Object.values(monthly).reduce((sum, val) => sum + val, 0);
    
    return {
        date: dateStr,
        daily: {
            total: Math.round(dailyTotal),
            breakdown: daily
        },
        weekly: {
            total: Math.round(weeklyTotal),
            breakdown: weekly
        },
        monthly: {
            total: Math.round(monthlyTotal),
            breakdown: monthly
        },
        formData: data // Store form data for future reference
    };
}

/**
 * Get impact data with proper daily/weekly/monthly calculations
 */
function getImpactData() {
    const impacts = storage.get('impact_data') || [];
    const currentUser = getCurrentUser();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!currentUser) {
        return {
            totalSaved: 0,
            monthlySaved: 0,
            weeklySaved: 0,
            dailySaved: 0,
            monthlyTrend: [],
            methods: {},
            dailyBreakdown: {},
            weeklyBreakdown: {},
            monthlyBreakdown: {}
        };
    }
    
    // Filter impacts for current user
    const userImpacts = impacts.filter(impact => impact.userId === currentUser.id);
    
    // Calculate totals
    const totalSaved = userImpacts.reduce((sum, impact) => sum + (impact.liters || 0), 0);
    
    // Get current date info
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentWeek = getWeekNumber(today);
    
    // Calculate DAILY saved (today only)
    const todayStr = today.toISOString().split('T')[0];
    const todayImpacts = userImpacts.filter(impact => {
        const impactDate = new Date(impact.date);
        impactDate.setHours(0, 0, 0, 0);
        return impactDate.getTime() === today.getTime();
    });
    const dailySaved = todayImpacts.reduce((sum, impact) => sum + (impact.liters || 0), 0);
    
    // Calculate WEEKLY saved (current week)
    const weekStart = getWeekStart(today);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weeklyImpacts = userImpacts.filter(impact => {
        const impactDate = new Date(impact.date);
        impactDate.setHours(0, 0, 0, 0);
        return impactDate >= weekStart && impactDate <= weekEnd;
    });
    const weeklySaved = weeklyImpacts.reduce((sum, impact) => sum + (impact.liters || 0), 0);
    
    // Calculate MONTHLY saved (current month)
    const monthlyImpacts = userImpacts.filter(impact => {
        const impactDate = new Date(impact.date);
        return impactDate.getMonth() === currentMonth && impactDate.getFullYear() === currentYear;
    });
    const monthlySaved = monthlyImpacts.reduce((sum, impact) => sum + (impact.liters || 0), 0);
    
    // Group by method for all time
    const methods = {};
    userImpacts.forEach(impact => {
        const method = impact.method || 'Other';
        methods[method] = (methods[method] || 0) + (impact.liters || 0);
    });
    
    // Group by method for daily/weekly/monthly
    const dailyBreakdown = {};
    todayImpacts.forEach(impact => {
        const method = impact.method || 'Other';
        dailyBreakdown[method] = (dailyBreakdown[method] || 0) + (impact.liters || 0);
    });
    
    const weeklyBreakdown = {};
    weeklyImpacts.forEach(impact => {
        const method = impact.method || 'Other';
        weeklyBreakdown[method] = (weeklyBreakdown[method] || 0) + (impact.liters || 0);
    });
    
    const monthlyBreakdown = {};
    monthlyImpacts.forEach(impact => {
        const method = impact.method || 'Other';
        monthlyBreakdown[method] = (monthlyBreakdown[method] || 0) + (impact.liters || 0);
    });
    
    // Create monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const monthImpacts = userImpacts.filter(impact => {
            const impactDate = new Date(impact.date);
            return impactDate.getMonth() === date.getMonth() && impactDate.getFullYear() === date.getFullYear();
        });
        const monthTotal = monthImpacts.reduce((sum, impact) => sum + (impact.liters || 0), 0);
        monthlyTrend.push({
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            saved: monthTotal
        });
    }
    
    return {
        totalSaved,
        monthlySaved,
        weeklySaved,
        dailySaved,
        monthlyTrend,
        methods,
        dailyBreakdown,
        weeklyBreakdown,
        monthlyBreakdown,
        impactCount: userImpacts.length
    };
}

/**
 * Get week number for a date
 */
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get start of week (Monday)
 */
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

/**
 * Display dashboard with calculations
 */
function displayDashboard(calculations) {
    // Show dashboard, hide form
    document.getElementById('input-form-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    
    // Get impact data
    const impactData = getImpactData();
    
    // Update stats - show both usage and savings
    const dailyUsage = calculations.daily.total;
    const weeklyUsage = calculations.weekly.total;
    const monthlyUsage = calculations.monthly.total;
    
    const dailySaved = impactData.dailySaved || 0;
    const weeklySaved = impactData.weeklySaved || 0;
    const monthlySaved = impactData.monthlySaved || 0;
    
    // Update usage display
    document.getElementById('daily-usage').textContent = formatLiters(dailyUsage);
    document.getElementById('weekly-usage').textContent = formatLiters(weeklyUsage);
    document.getElementById('monthly-usage').textContent = formatLiters(monthlyUsage);
    
    // Add savings display if not exists
    updateSavingsDisplay(dailySaved, weeklySaved, monthlySaved);
    
    // Calculate effective usage (usage - savings)
    const effectiveDaily = Math.max(0, dailyUsage - dailySaved);
    const effectiveWeekly = Math.max(0, weeklyUsage - weeklySaved);
    const effectiveMonthly = Math.max(0, monthlyUsage - monthlySaved);
    
    // Update progress bar (considering impact)
    const dailyGoal = 100; // liters per day goal
    const progress = Math.min((effectiveDaily / dailyGoal) * 100, 100);
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
    
    // Update progress info
    const progressInfo = document.getElementById('progress-info');
    if (progressInfo) {
        if (dailySaved > 0) {
            const savingsPercent = dailyUsage > 0 ? ((dailySaved / dailyUsage) * 100).toFixed(1) : 0;
            progressInfo.innerHTML = `
                <div class="mt-2">
                    <span class="text-green-600 font-semibold">✓ You're saving ${formatLiters(dailySaved)} daily (${savingsPercent}% reduction)!</span>
                    <br>
                    <span class="text-gray-600 text-sm">Effective usage: ${formatLiters(effectiveDaily)} (${formatLiters(dailyUsage)} usage - ${formatLiters(dailySaved)} saved)</span>
                </div>
            `;
        } else {
            progressInfo.innerHTML = `
                <div class="mt-2">
                    <span class="text-gray-600 text-sm">Track your conservation impact on the <a href="impact.html" class="text-blue-600 hover:underline">Impact</a> page to see adjusted progress!</span>
                </div>
            `;
        }
    }
    
    // Create charts with proper data
    createUsageChart(calculations, impactData, effectiveDaily, effectiveWeekly, effectiveMonthly);
    createBreakdownChart(calculations, 'daily'); // Show daily breakdown by default
    createImpactChart(impactData);
    createMonthlyTrendChart(impactData);
    
    // Display tips
    displayTips();
    
    // Display impact summary
    displayImpactSummary(impactData, calculations);
}

/**
 * Update savings display
 */
function updateSavingsDisplay(dailySaved, weeklySaved, monthlySaved) {
    // Check if savings cards exist, if not create them
    const statsSection = document.querySelector('.grid.sm\\:grid-cols-1.md\\:grid-cols-3.gap-6.mb-8');
    if (statsSection && !document.getElementById('daily-saved')) {
        // Add savings row after usage row
        const savingsRow = document.createElement('div');
        savingsRow.className = 'grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-8';
        savingsRow.innerHTML = `
            <div class="stat-card card-3d bg-green-50 rounded-xl shadow-lg p-6 stagger-item">
                <div class="text-sm text-gray-600 mb-2">Daily Saved</div>
                <div class="text-4xl font-bold text-green-600 pulse" id="daily-saved">0 L</div>
            </div>
            <div class="stat-card card-3d bg-green-50 rounded-xl shadow-lg p-6 stagger-item">
                <div class="text-sm text-gray-600 mb-2">Weekly Saved</div>
                <div class="text-4xl font-bold text-green-600 pulse" id="weekly-saved">0 L</div>
            </div>
            <div class="stat-card card-3d bg-green-50 rounded-xl shadow-lg p-6 stagger-item">
                <div class="text-sm text-gray-600 mb-2">Monthly Saved</div>
                <div class="text-4xl font-bold text-green-600 pulse" id="monthly-saved">0 L</div>
            </div>
        `;
        statsSection.parentNode.insertBefore(savingsRow, statsSection.nextSibling);
    }
    
    // Update savings values
    if (document.getElementById('daily-saved')) {
        document.getElementById('daily-saved').textContent = formatLiters(dailySaved);
    }
    if (document.getElementById('weekly-saved')) {
        document.getElementById('weekly-saved').textContent = formatLiters(weeklySaved);
    }
    if (document.getElementById('monthly-saved')) {
        document.getElementById('monthly-saved').textContent = formatLiters(monthlySaved);
    }
}

/**
 * Create usage trend chart with impact comparison - FIXED
 */
function createUsageChart(calculations, impactData, effectiveDaily, effectiveWeekly, effectiveMonthly) {
    const ctx = document.getElementById('usage-chart').getContext('2d');
    
    if (usageChart) {
        usageChart.destroy();
    }
    
    usageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Daily', 'Weekly', 'Monthly'],
            datasets: [
                {
                    label: 'Water Usage (Liters)',
                    data: [
                        calculations.daily.total,
                        calculations.weekly.total,
                        calculations.monthly.total
                    ],
                    backgroundColor: 'rgba(14, 165, 233, 0.6)',
                    borderColor: '#0ea5e9',
                    borderWidth: 2
                },
                {
                    label: 'Water Saved (Liters)',
                    data: [
                        impactData.dailySaved || 0,
                        impactData.weeklySaved || 0,
                        impactData.monthlySaved || 0
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: '#10b981',
                    borderWidth: 2
                },
                {
                    label: 'Effective Usage (Usage - Saved)',
                    data: [
                        effectiveDaily,
                        effectiveWeekly,
                        effectiveMonthly
                    ],
                    backgroundColor: 'rgba(59, 130, 246, 0.4)',
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Usage vs Savings Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Liters'
                    }
                }
            }
        }
    });
}

/**
 * Create breakdown chart - with period selector
 */
function createBreakdownChart(calculations, period = 'daily') {
    const ctx = document.getElementById('breakdown-chart').getContext('2d');
    
    if (breakdownChart) {
        breakdownChart.destroy();
    }
    
    // Get breakdown for selected period
    const breakdown = period === 'daily' ? calculations.daily.breakdown :
                     period === 'weekly' ? calculations.weekly.breakdown :
                     calculations.monthly.breakdown;
    
    breakdownChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Shower', 'Toilet', 'Dishwasher', 'Laundry', 'Garden', 'Car Wash', 'Other'],
            datasets: [{
                data: [
                    Math.round(breakdown.shower || 0),
                    Math.round(breakdown.toilet || 0),
                    Math.round(breakdown.dishwasher || 0),
                    Math.round(breakdown.laundry || 0),
                    Math.round(breakdown.garden || 0),
                    Math.round(breakdown.carWash || 0),
                    Math.round(breakdown.other || 0)
                ],
                backgroundColor: [
                    '#0ea5e9',
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6',
                    '#f59e0b',
                    '#ef4444',
                    '#6b7280'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: `Usage Breakdown (${period.charAt(0).toUpperCase() + period.slice(1)})`
                }
            }
        }
    });
    
    // Add period selector if not exists
    addPeriodSelector(calculations);
}

/**
 * Add period selector for breakdown chart
 */
function addPeriodSelector(calculations) {
    const chartContainer = document.getElementById('breakdown-chart').parentElement;
    let selector = chartContainer.querySelector('.period-selector');
    
    if (!selector) {
        selector = document.createElement('div');
        selector.className = 'period-selector mb-4 flex gap-2 justify-center';
        selector.innerHTML = `
            <button class="period-btn active px-4 py-2 bg-blue-600 text-white rounded-lg" data-period="daily">Daily</button>
            <button class="period-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg" data-period="weekly">Weekly</button>
            <button class="period-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg" data-period="monthly">Monthly</button>
        `;
        chartContainer.insertBefore(selector, chartContainer.querySelector('canvas'));
        
        // Add event listeners
        selector.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                
                // Update button states
                selector.querySelectorAll('.period-btn').forEach(b => {
                    b.classList.remove('active', 'bg-blue-600', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-700');
                });
                e.target.classList.add('active', 'bg-blue-600', 'text-white');
                e.target.classList.remove('bg-gray-200', 'text-gray-700');
                
                // Update chart
                createBreakdownChart(calculations, period);
            });
        });
    }
}

/**
 * Display water-saving tips
 */
function displayTips() {
    const container = document.getElementById('tips-container');
    // Show 3 random tips
    const shuffled = waterTips.sort(() => 0.5 - Math.random());
    const selectedTips = shuffled.slice(0, 3);
    
    container.innerHTML = selectedTips.map(tip => `
        <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p class="text-gray-700">${tip}</p>
        </div>
    `).join('');
}

/**
 * Save usage data to local storage with date tracking
 */
function saveUsageData(calculations) {
    const history = storage.get('usage_history') || [];
    const today = new Date().toISOString().split('T')[0];
    
    // Check if entry for today exists
    const todayIndex = history.findIndex(entry => entry.date === today);
    
    if (todayIndex >= 0) {
        // Update today's entry
        history[todayIndex] = calculations;
    } else {
        // Add new entry
        history.push(calculations);
    }
    
    // Keep only last 90 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);
    const recentHistory = history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= cutoffDate;
    });
    
    storage.set('usage_history', recentHistory);
}

/**
 * Load saved data
 */
function loadSavedData() {
    const history = storage.get('usage_history');
    const impactData = getImpactData();
    const today = new Date().toISOString().split('T')[0];
    
    // If there's impact data but no usage data, show impact-only view
    if (impactData.impactCount > 0 && (!history || history.length === 0)) {
        showImpactOnlyView(impactData);
        return;
    }
    
    if (history && history.length > 0) {
        // Find today's entry or most recent
        const todayEntry = history.find(entry => entry.date === today);
        const latest = todayEntry || history[history.length - 1];
        
        // If latest entry is from today, show dashboard
        if (latest.date === today) {
            displayDashboard(latest);
        } else {
            // Show form to enter today's data
            displayDashboard(latest); // Show previous data, but user can update
        }
    } else {
        // Show impact stats even if no usage data
        loadImpactData();
    }
}

/**
 * Show impact-only view when user has impact data but no usage data
 */
function showImpactOnlyView(impactData) {
    // Show dashboard section
    document.getElementById('dashboard-section').classList.remove('hidden');
    
    // Display impact stats
    loadImpactData();
    
    // Create impact charts
    createImpactChart(impactData);
    createMonthlyTrendChart(impactData);
    
    // Display impact summary
    displayImpactSummary(impactData, null);
    
    // Show message about usage tracking
    const usageChartsSection = document.querySelector('.grid.sm\\:grid-cols-1.md\\:grid-cols-2.gap-6.mb-8');
    if (usageChartsSection) {
        usageChartsSection.innerHTML = `
            <div class="card-3d bg-white rounded-xl shadow-lg p-6 hover-glow fade-in-on-scroll col-span-2">
                <h3 class="text-xl font-semibold mb-4">Usage Tracking</h3>
                <p class="text-gray-600 mb-4">Track your daily water usage to see detailed breakdowns and compare with your conservation efforts.</p>
                <button onclick="document.getElementById('input-form-section').classList.remove('hidden'); document.getElementById('dashboard-section').classList.add('hidden');" class="water-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Start Tracking Usage
                </button>
            </div>
        `;
    }
}

/**
 * Load and display impact data
 */
function loadImpactData() {
    const impactData = getImpactData();
    
    // Update impact stats if section exists
    const impactStatsSection = document.getElementById('impact-stats-section');
    if (impactStatsSection) {
        impactStatsSection.innerHTML = `
            <div class="grid sm:grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="stat-card card-3d bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6">
                    <div class="text-sm text-gray-600 mb-2">Total Saved</div>
                    <div class="text-4xl font-bold text-green-600 pulse">${formatLiters(impactData.totalSaved)}</div>
                    <div class="text-xs text-gray-500 mt-1">All time</div>
                </div>
                <div class="stat-card card-3d bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6">
                    <div class="text-sm text-gray-600 mb-2">This Month</div>
                    <div class="text-4xl font-bold text-blue-600 pulse">${formatLiters(impactData.monthlySaved)}</div>
                    <div class="text-xs text-gray-500 mt-1">Water conserved</div>
                </div>
                <div class="stat-card card-3d bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6">
                    <div class="text-sm text-gray-600 mb-2">This Week</div>
                    <div class="text-4xl font-bold text-purple-600 pulse">${formatLiters(impactData.weeklySaved)}</div>
                    <div class="text-xs text-gray-500 mt-1">Water conserved</div>
                </div>
                <div class="stat-card card-3d bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6">
                    <div class="text-sm text-gray-600 mb-2">Today</div>
                    <div class="text-4xl font-bold text-orange-600 pulse">${formatLiters(impactData.dailySaved)}</div>
                    <div class="text-xs text-gray-500 mt-1">Water conserved</div>
                </div>
            </div>
        `;
    }
}

/**
 * Create impact chart showing savings by method
 */
function createImpactChart(impactData) {
    const impactChartContainer = document.getElementById('impact-chart');
    if (!impactChartContainer) return;
    
    const ctx = impactChartContainer.getContext('2d');
    
    if (impactChart) {
        impactChart.destroy();
    }
    
    const methods = impactData.methods || {};
    const labels = Object.keys(methods);
    const data = Object.values(methods);
    
    if (labels.length === 0) {
        impactChartContainer.parentElement.innerHTML = `
            <div class="card-3d bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Conservation Impact</h3>
                <p class="text-gray-600 text-center py-8">No impact data yet. Submit your first impact to see your conservation progress!</p>
            </div>
        `;
        return;
    }
    
    impactChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#0ea5e9',
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6',
                    '#f59e0b',
                    '#ef4444',
                    '#06b6d4',
                    '#84cc16'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Water Saved by Method (All Time)'
                }
            }
        }
    });
}

/**
 * Create monthly trend chart
 */
function createMonthlyTrendChart(impactData) {
    const trendChartContainer = document.getElementById('monthly-trend-chart');
    if (!trendChartContainer) return;
    
    const ctx = trendChartContainer.getContext('2d');
    
    if (monthlyTrendChart) {
        monthlyTrendChart.destroy();
    }
    
    const trend = impactData.monthlyTrend || [];
    const labels = trend.map(t => t.month);
    const data = trend.map(t => t.saved);
    
    if (labels.length === 0 || data.every(d => d === 0)) {
        trendChartContainer.parentElement.innerHTML = `
            <div class="card-3d bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Monthly Conservation Trend</h3>
                <p class="text-gray-600 text-center py-8">Start tracking your impact to see monthly trends!</p>
            </div>
        `;
        return;
    }
    
    monthlyTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Water Saved (Liters)',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '6-Month Conservation Trend'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Liters Saved'
                    }
                }
            }
        }
    });
}

/**
 * Display impact summary with usage comparison
 */
function displayImpactSummary(impactData, calculations) {
    const summaryContainer = document.getElementById('impact-summary');
    if (!summaryContainer) return;
    
    if (impactData.impactCount === 0) {
        summaryContainer.innerHTML = `
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <p class="text-gray-700">Start tracking your water conservation impact! Visit the <a href="impact.html" class="text-blue-600 hover:underline font-semibold">Impact</a> page to submit your first conservation action.</p>
            </div>
        `;
        return;
    }
    
    const topMethods = Object.entries(impactData.methods || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    
    let usageComparison = '';
    if (calculations) {
        const dailyUsage = calculations.daily.total;
        const dailySaved = impactData.dailySaved || 0;
        const effectiveDaily = Math.max(0, dailyUsage - dailySaved);
        const savingsPercent = dailyUsage > 0 ? ((dailySaved / dailyUsage) * 100).toFixed(1) : 0;
        
        usageComparison = `
            <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <h5 class="text-md font-semibold mb-2 text-gray-800">💧 Usage vs Savings (Today)</h5>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="text-sm text-gray-600">Usage</div>
                        <div class="text-lg font-bold text-blue-600">${formatLiters(dailyUsage)}</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-600">Saved</div>
                        <div class="text-lg font-bold text-green-600">${formatLiters(dailySaved)}</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-600">Effective</div>
                        <div class="text-lg font-bold text-purple-600">${formatLiters(effectiveDaily)}</div>
                    </div>
                </div>
                ${savingsPercent > 0 ? `
                    <div class="mt-2 text-center">
                        <span class="text-sm text-gray-600">You're saving <strong class="text-green-600">${savingsPercent}%</strong> of your daily usage!</span>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    summaryContainer.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
            <h4 class="text-lg font-semibold mb-3 text-gray-800">🎉 Your Conservation Impact</h4>
            <p class="text-gray-700 mb-4">You've saved <strong class="text-green-600">${formatLiters(impactData.totalSaved)}</strong> of water through <strong>${impactData.impactCount}</strong> conservation actions!</p>
            ${topMethods.length > 0 ? `
                <div class="mt-4">
                    <p class="text-sm font-semibold text-gray-600 mb-2">Top Conservation Methods:</p>
                    <ul class="list-disc list-inside space-y-1">
                        ${topMethods.map(([method, liters]) => `
                            <li class="text-gray-700"><strong>${method}</strong>: ${formatLiters(liters)} saved</li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            ${usageComparison}
        </div>
    `;
}
