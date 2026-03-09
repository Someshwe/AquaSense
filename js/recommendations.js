/**
 * Recommendations JavaScript
 */

// Predefined recommendations dataset - 100 water conservation recommendations
const PREDEFINED_RECOMMENDATIONS = {
    high_shower: [
        {
            title: "Reduce Shower Time",
            description: "You're using a significant amount of water in showers. Try reducing your shower time by 2-3 minutes. This can save up to 20-30 liters per day. Consider using a shower timer or playing shorter songs."
        },
        {
            title: "Install Low-Flow Showerhead",
            description: "A low-flow showerhead can reduce water usage by up to 50% without sacrificing water pressure. This simple change can save thousands of liters annually."
        },
        {
            title: "Take Navy Showers",
            description: "Try the 'Navy shower' technique: turn off water while soaping up, then turn it back on to rinse. This can cut shower water usage in half."
        },
        {
            title: "Use Shower Bucket",
            description: "Place a bucket in your shower to collect water while waiting for it to heat up. Use this water for plants or cleaning."
        },
        {
            title: "Shower Less Frequently",
            description: "Consider showering every other day if possible, or take shorter showers on alternate days. This can significantly reduce your water consumption."
        },
        {
            title: "Install Shower Timer",
            description: "Use a waterproof timer or app to limit shower time to 5 minutes. This helps build awareness and saves water consistently."
        },
        {
            title: "Lower Water Temperature",
            description: "Reducing shower temperature slightly can save energy and encourage shorter showers, indirectly saving water."
        },
        {
            title: "Use Water-Saving Showerhead",
            description: "Invest in a high-quality water-saving showerhead that maintains pressure while reducing flow rate by 40-60%."
        },
        {
            title: "Shower with a Partner",
            description: "Showering together can be fun and save water, though this may not be practical for everyone."
        },
        {
            title: "Install Flow Restrictor",
            description: "Add a flow restrictor to your existing showerhead to reduce water flow without replacing the entire fixture."
        }
    ],
    high_toilet: [
        {
            title: "Install Dual-Flush Toilet",
            description: "Dual-flush toilets allow you to use less water for liquid waste. This can reduce toilet water usage by 30-50%."
        },
        {
            title: "Check for Leaks",
            description: "A leaking toilet can waste hundreds of liters per day. Add food coloring to the tank - if it appears in the bowl without flushing, you have a leak that needs fixing."
        },
        {
            title: "Don't Use Toilet as Trash",
            description: "Every unnecessary flush wastes water. Dispose of tissues and small items in a trash can instead of flushing them."
        },
        {
            title: "Install Toilet Tank Bank",
            description: "Place a water-filled bottle or tank bank in your toilet tank to displace water and reduce the amount used per flush."
        },
        {
            title: "Adjust Flush Volume",
            description: "If you have an older toilet, adjust the float to reduce the amount of water in the tank, saving water with each flush."
        },
        {
            title: "Fix Running Toilets Immediately",
            description: "A running toilet can waste up to 200 liters per day. Check and fix the flapper valve or fill valve promptly."
        },
        {
            title: "Use 'If It's Yellow, Let It Mellow'",
            description: "For liquid waste, consider not flushing every time. This can save significant water, though it may not be suitable for all households."
        },
        {
            title: "Upgrade to High-Efficiency Toilet",
            description: "Modern high-efficiency toilets use only 4-6 liters per flush compared to older models that use 13-20 liters."
        },
        {
            title: "Check Toilet Seal",
            description: "Ensure the toilet bowl seal is tight to prevent water from constantly running into the bowl."
        },
        {
            title: "Install Toilet Flapper",
            description: "Replace old or worn toilet flappers to prevent leaks and ensure efficient flushing."
        }
    ],
    high_garden: [
        {
            title: "Water During Cool Hours",
            description: "Water your garden early morning or evening to reduce evaporation. This ensures more water reaches plant roots instead of evaporating."
        },
        {
            title: "Use Drip Irrigation",
            description: "Drip irrigation systems deliver water directly to plant roots, reducing waste by up to 60% compared to sprinklers."
        },
        {
            title: "Collect Rainwater",
            description: "Install a rain barrel to collect rainwater for garden use. This free water source can significantly reduce your water bill and usage."
        },
        {
            title: "Choose Native Plants",
            description: "Native plants are adapted to local conditions and require less water. Consider replacing water-intensive plants with drought-resistant varieties."
        },
        {
            title: "Mulch Your Garden",
            description: "Apply mulch around plants to retain soil moisture, reduce evaporation, and decrease watering frequency by up to 50%."
        },
        {
            title: "Use Soaker Hoses",
            description: "Soaker hoses deliver water directly to the soil, reducing evaporation and runoff compared to overhead sprinklers."
        },
        {
            title: "Group Plants by Water Needs",
            description: "Plant water-loving plants together and drought-tolerant plants separately to avoid overwatering."
        },
        {
            title: "Install Smart Irrigation Timer",
            description: "Use a smart irrigation controller that adjusts watering based on weather conditions and soil moisture levels."
        },
        {
            title: "Water Deeply but Less Frequently",
            description: "Deep watering encourages deep root growth, making plants more drought-resistant and reducing overall water needs."
        },
        {
            title: "Use Greywater for Plants",
            description: "Collect and use greywater from showers and laundry (with appropriate detergents) to water non-edible plants."
        },
        {
            title: "Install Rain Sensor",
            description: "Add a rain sensor to your irrigation system to prevent watering during or after rainfall."
        },
        {
            title: "Choose Drought-Resistant Grass",
            description: "Replace water-intensive grass varieties with drought-resistant types that require less frequent watering."
        },
        {
            title: "Use Compost to Retain Moisture",
            description: "Add compost to garden soil to improve water retention and reduce the need for frequent watering."
        },
        {
            title: "Check for Leaks in Irrigation",
            description: "Regularly inspect irrigation systems for leaks, broken sprinkler heads, or misaligned spray patterns."
        },
        {
            title: "Water at Root Level",
            description: "Focus watering at the base of plants rather than spraying leaves, which reduces evaporation and prevents disease."
        }
    ],
    high_dishwasher: [
        {
            title: "Run Full Loads Only",
            description: "Wait until your dishwasher is full before running it. Running partial loads wastes water and energy."
        },
        {
            title: "Scrape, Don't Rinse",
            description: "Modern dishwashers don't require pre-rinsing. Simply scrape food scraps into the compost or trash before loading dishes."
        },
        {
            title: "Use Eco Mode",
            description: "If your dishwasher has an eco or energy-saving mode, use it. It uses less water while still cleaning effectively."
        },
        {
            title: "Skip Pre-Rinse Cycle",
            description: "Most modern dishwashers can handle dishes without pre-rinsing. Just scrape off large food particles."
        },
        {
            title: "Load Dishes Efficiently",
            description: "Properly load dishes to maximize space and ensure water reaches all items, avoiding the need for a second wash."
        },
        {
            title: "Use Energy Star Dishwasher",
            description: "Energy Star certified dishwashers use significantly less water than older models, saving up to 50% more water."
        },
        {
            title: "Clean Filter Regularly",
            description: "A clean dishwasher filter ensures efficient operation and prevents the need for multiple wash cycles."
        },
        {
            title: "Hand Wash Large Items",
            description: "For large pots and pans that take up too much space, consider hand washing to maximize dishwasher efficiency."
        },
        {
            title: "Use Appropriate Detergent",
            description: "Use the right amount of quality detergent to ensure dishes get clean in one cycle, avoiding re-washing."
        },
        {
            title: "Skip Heat Dry Cycle",
            description: "Use air-dry or towel-dry dishes instead of the heat-dry cycle, which also saves energy."
        }
    ],
    high_laundry: [
        {
            title: "Wash Full Loads",
            description: "Only run the washing machine when you have a full load. This maximizes water efficiency and reduces the number of wash cycles."
        },
        {
            title: "Use Cold Water",
            description: "Most modern detergents work well in cold water, saving energy and reducing the need for hot water."
        },
        {
            title: "Choose Efficient Settings",
            description: "Use the appropriate water level setting for your load size. Many machines have sensors that adjust automatically."
        },
        {
            title: "Upgrade to High-Efficiency Washer",
            description: "High-efficiency washing machines use 40-50% less water than traditional top-loading machines."
        },
        {
            title: "Pre-Treat Stains",
            description: "Pre-treating stains before washing ensures clothes get clean in one cycle, avoiding the need for re-washing."
        },
        {
            title: "Use Appropriate Load Size",
            description: "Match the water level to the actual load size. Don't use the large load setting for small loads."
        },
        {
            title: "Reuse Towels",
            description: "Hang towels to dry and reuse them multiple times before washing, reducing laundry frequency."
        },
        {
            title: "Wash Dark Clothes Together",
            description: "Group similar colors and fabrics to avoid color bleeding, which might require re-washing."
        },
        {
            title: "Use Concentrated Detergent",
            description: "Concentrated detergents work better in less water, ensuring effective cleaning with reduced water usage."
        },
        {
            title: "Skip Extra Rinse Cycle",
            description: "Unless necessary, skip the extra rinse cycle. Modern detergents rinse clean in one cycle."
        },
        {
            title: "Maintain Your Washer",
            description: "Regular maintenance ensures your washer operates efficiently and doesn't require multiple cycles to clean clothes."
        },
        {
            title: "Air Dry Clothes",
            description: "Use a clothesline or drying rack instead of a dryer, which also saves energy and extends clothing life."
        }
    ],
    general: [
        {
            title: "Fix Leaky Faucets",
            description: "A single dripping faucet can waste up to 20 liters per day. Fix leaks promptly to prevent unnecessary water loss."
        },
        {
            title: "Turn Off Tap While Brushing",
            description: "Don't let the water run while brushing your teeth or washing dishes. This simple habit can save 10-15 liters per day."
        },
        {
            title: "Use a Broom Instead of Hose",
            description: "For cleaning driveways and sidewalks, use a broom instead of a hose. This can save hundreds of liters per cleaning session."
        },
        {
            title: "Install Faucet Aerators",
            description: "Faucet aerators mix air with water, reducing flow while maintaining pressure. They're inexpensive and easy to install."
        },
        {
            title: "Monitor Your Usage",
            description: "Track your water usage regularly using our tracker. Awareness is the first step toward conservation."
        },
        {
            title: "Fix Leaks Immediately",
            description: "Even small leaks can waste significant amounts of water over time. Fix them as soon as you notice them."
        },
        {
            title: "Use a Cup for Drinking Water",
            description: "Instead of letting the tap run to get cold water, keep a pitcher in the refrigerator for cold drinking water."
        },
        {
            title: "Wash Fruits and Vegetables in a Bowl",
            description: "Instead of running water, fill a bowl to wash produce, then reuse that water for plants."
        },
        {
            title: "Install Water-Saving Devices",
            description: "Install low-flow fixtures, aerators, and other water-saving devices throughout your home to reduce overall consumption."
        },
        {
            title: "Educate Family Members",
            description: "Teach children and family members about water conservation to create lasting habits and reduce household usage."
        },
        {
            title: "Use a Pool Cover",
            description: "If you have a pool, use a cover to reduce evaporation, which can save thousands of liters annually."
        },
        {
            title: "Check Water Meter Regularly",
            description: "Monitor your water meter to detect leaks early. If it's moving when no water is being used, you have a leak."
        },
        {
            title: "Insulate Hot Water Pipes",
            description: "Insulating pipes reduces the time needed to get hot water, saving both water and energy."
        },
        {
            title: "Use Efficient Appliances",
            description: "When replacing appliances, choose Energy Star certified models that use less water and energy."
        },
        {
            title: "Reuse Cooking Water",
            description: "After boiling vegetables or pasta, let the water cool and use it to water plants (without salt or oil)."
        },
        {
            title: "Take Shorter Baths",
            description: "If you prefer baths, reduce the water level and bath frequency, or switch to showers for daily cleaning."
        },
        {
            title: "Install Water-Saving Toilets",
            description: "Replace old toilets with low-flow or dual-flush models to significantly reduce water usage."
        },
        {
            title: "Use a Bucket for Car Washing",
            description: "Wash your car with a bucket and sponge instead of a hose, which can save hundreds of liters per wash."
        },
        {
            title: "Check for Hidden Leaks",
            description: "Regularly inspect pipes, hoses, and connections for leaks, especially in basements and crawl spaces."
        },
        {
            title: "Use Greywater Systems",
            description: "Consider installing a greywater system to reuse water from sinks, showers, and laundry for irrigation."
        },
        {
            title: "Plant Drought-Resistant Landscaping",
            description: "Replace water-intensive landscaping with drought-resistant plants, rocks, and mulch to reduce outdoor water needs."
        },
        {
            title: "Use a Watering Can",
            description: "For small gardens or potted plants, use a watering can instead of a hose for more precise and efficient watering."
        },
        {
            title: "Fix Running Toilets",
            description: "A running toilet wastes enormous amounts of water. Check and fix the flapper or fill valve immediately."
        },
        {
            title: "Use Efficient Showerheads",
            description: "Replace old showerheads with water-efficient models that maintain pressure while reducing flow."
        },
        {
            title: "Collect and Reuse Water",
            description: "Place buckets to collect water from various sources (AC condensation, dehumidifiers) for plant watering."
        },
        {
            title: "Avoid Overwatering",
            description: "Learn the water needs of your plants and avoid overwatering, which wastes water and can harm plants."
        },
        {
            title: "Use a Dishpan for Washing",
            description: "When hand-washing dishes, use a dishpan instead of running water continuously."
        },
        {
            title: "Install Smart Water Monitors",
            description: "Use smart water monitoring devices to track usage in real-time and identify areas for improvement."
        },
        {
            title: "Practice Water-Wise Cooking",
            description: "Use minimal water when cooking, steam instead of boil when possible, and reuse cooking water."
        },
        {
            title: "Create a Water Conservation Plan",
            description: "Develop a household water conservation plan with specific goals and track progress regularly."
        },
        {
            title: "Use a Water Filter Pitcher",
            description: "Instead of running tap water to get cold filtered water, use a water filter pitcher stored in the refrigerator."
        },
        {
            title: "Install Pressure-Reducing Valve",
            description: "High water pressure wastes water. Install a pressure-reducing valve to maintain optimal pressure and reduce waste."
        },
        {
            title: "Use Basin for Hand Washing",
            description: "When washing hands, use a basin instead of running water continuously. This can save several liters per wash."
        },
        {
            title: "Choose Efficient Car Wash",
            description: "Commercial car washes often recycle water. If washing at home, use a bucket and sponge instead of a hose."
        },
        {
            title: "Fix Leaky Pipes Promptly",
            description: "Even small pipe leaks can waste significant water. Inspect pipes regularly and fix issues immediately."
        },
        {
            title: "Use Efficient Ice Makers",
            description: "If your ice maker uses a lot of water, consider making ice in trays or upgrading to a more efficient model."
        },
        {
            title: "Install Water-Saving Fixtures",
            description: "Replace old fixtures with WaterSense labeled products that use at least 20% less water than standard models."
        },
        {
            title: "Practice Smart Landscaping",
            description: "Design your landscape to minimize water needs by grouping plants, using mulch, and choosing appropriate species."
        },
        {
            title: "Use Timer for Outdoor Watering",
            description: "Set timers for sprinklers and irrigation systems to avoid overwatering and ensure you don't forget to turn them off."
        },
        {
            title: "Check Appliance Efficiency",
            description: "Regularly check that appliances like dishwashers and washing machines are operating efficiently and not wasting water."
        },
        {
            title: "Use Efficient Cleaning Methods",
            description: "Choose cleaning methods that use less water, such as steam cleaning or microfiber cloths that require less water."
        },
        {
            title: "Participate in Water Conservation Programs",
            description: "Join local water conservation programs and initiatives to learn new techniques and stay motivated."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('get-recommendations-btn');
    if (btn) {
        btn.addEventListener('click', generateRecommendations);
    }
    
    // Load saved recommendations if available
    loadSavedRecommendations();
});

function generateRecommendations() {
    const btn = document.getElementById('get-recommendations-btn');
    const loading = document.getElementById('loading-state');
    const container = document.getElementById('recommendations-container');
    
    // Show loading state
    btn.disabled = true;
    loading.classList.remove('hidden');
    container.innerHTML = '';
    
    // Simulate brief loading for better UX
    setTimeout(() => {
        try {
            // Get usage data from local storage
            const history = storage.get('usage_history') || [];
            const latestUsage = history.length > 0 ? history[history.length - 1] : null;
            
            if (!latestUsage) {
                // If no usage data, show general recommendations (3 random ones)
                const recommendations = getRandomRecommendations(3);
                displayRecommendations(recommendations);
                storage.set('recommendations', recommendations);
                loading.classList.add('hidden');
                btn.disabled = false;
                return;
            }
            
            // Analyze usage patterns and get relevant recommendations (exactly 3)
            const recommendations = analyzeUsageAndRecommend(latestUsage);
            
            displayRecommendations(recommendations);
            
            // Save recommendations
            storage.set('recommendations', recommendations);
            
        } catch (error) {
            console.error('Failed to generate recommendations:', error);
            container.innerHTML = `
                <div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>Failed to generate recommendations. Please try again later.</p>
                </div>
            `;
        } finally {
            loading.classList.add('hidden');
            btn.disabled = false;
        }
    }, 800);
}

function analyzeUsageAndRecommend(usageData) {
    const dailyBreakdown = usageData.daily?.breakdown || {};
    const dailyTotal = usageData.daily?.total || 0;
    
    const recommendations = [];
    const usedCategories = new Set();
    
    // Define thresholds (in liters per day)
    const HIGH_THRESHOLD = 50;
    const MEDIUM_THRESHOLD = 25;
    
    // Check shower usage
    if (dailyBreakdown.shower > HIGH_THRESHOLD) {
        const showerRecs = getRecommendationsByCategory('high_shower', 2);
        recommendations.push(...showerRecs);
        usedCategories.add('high_shower');
    }
    
    // Check toilet usage
    if (dailyBreakdown.toilet > HIGH_THRESHOLD) {
        const toiletRecs = getRecommendationsByCategory('high_toilet', 2);
        recommendations.push(...toiletRecs);
        usedCategories.add('high_toilet');
    }
    
    // Check garden usage
    if (dailyBreakdown.garden > MEDIUM_THRESHOLD) {
        const gardenRecs = getRecommendationsByCategory('high_garden', 2);
        recommendations.push(...gardenRecs);
        usedCategories.add('high_garden');
    }
    
    // Check dishwasher usage
    if (dailyBreakdown.dishwasher > MEDIUM_THRESHOLD) {
        const dishwasherRecs = getRecommendationsByCategory('high_dishwasher', 2);
        recommendations.push(...dishwasherRecs);
        usedCategories.add('high_dishwasher');
    }
    
    // Check laundry usage
    if (dailyBreakdown.laundry > MEDIUM_THRESHOLD) {
        const laundryRecs = getRecommendationsByCategory('high_laundry', 2);
        recommendations.push(...laundryRecs);
        usedCategories.add('high_laundry');
    }
    
    // If total usage is high, add general recommendations
    if (dailyTotal > 150) {
        const generalRecs = getRecommendationsByCategory('general', 2);
        recommendations.push(...generalRecs);
    }
    
    // If no specific recommendations, add general ones
    if (recommendations.length === 0) {
        const generalRecs = getRandomRecommendations(3);
        return generalRecs;
    }
    
    // Remove duplicates and ensure we have exactly 3 recommendations
    const uniqueRecs = Array.from(new Map(recommendations.map(rec => [rec.title, rec])).values());
    
    // If we have less than 3, fill with random recommendations from all categories
    if (uniqueRecs.length < 3) {
        const needed = 3 - uniqueRecs.length;
        const additionalRecs = getRandomRecommendations(needed, uniqueRecs.map(r => r.title));
        uniqueRecs.push(...additionalRecs);
    }
    
    // Return exactly 3 recommendations
    return uniqueRecs.slice(0, 3);
}

function getRecommendationsByCategory(category, count) {
    const categoryRecs = PREDEFINED_RECOMMENDATIONS[category] || PREDEFINED_RECOMMENDATIONS.general;
    const shuffled = [...categoryRecs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, categoryRecs.length));
}

// Get random recommendations from all categories
function getRandomRecommendations(count, excludeTitles = []) {
    // Collect all recommendations from all categories
    const allRecommendations = [];
    Object.keys(PREDEFINED_RECOMMENDATIONS).forEach(category => {
        PREDEFINED_RECOMMENDATIONS[category].forEach(rec => {
            if (!excludeTitles.includes(rec.title)) {
                allRecommendations.push(rec);
            }
        });
    });
    
    // Shuffle and return requested count
    const shuffled = [...allRecommendations].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-container');
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <p>No recommendations available at this time.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recommendations.map((rec, index) => {
        const title = rec.title || 'Recommendation';
        const description = rec.description || '';
        
        return `
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-4">
                <div class="flex items-start space-x-4">
                    <div class="text-3xl">💡</div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">${title}</h3>
                        <p class="text-gray-700 leading-relaxed">${description}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadSavedRecommendations() {
    const saved = storage.get('recommendations');
    if (saved && saved.length > 0) {
        displayRecommendations(saved);
    }
}

