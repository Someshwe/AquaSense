/**
 * Community Hub JavaScript
 */

let map = null;
let markers = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    const createBtn = document.getElementById('create-project-btn');
    const cancelBtn = document.getElementById('cancel-project-btn');
    const form = document.getElementById('project-form');
    const modal = document.getElementById('create-project-modal');
    
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleProjectSubmit);
    }
});

// Initialize Google Map
function initMap() {
    // Default center (can be customized)
    const center = { lat: 37.7749, lng: -122.4194 }; // San Francisco
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
        mapTypeId: 'terrain'
    });
    
    // Load projects and add markers
    loadProjects();
}

async function loadProjects() {
    try {
        // Load projects from local storage
        const projects = storage.get('community_projects') || [];
        
        displayProjects(projects);
        updateStats(projects);
        updateMapMarkers(projects);
        
    } catch (error) {
        console.error('Failed to load projects:', error);
        document.getElementById('projects-container').innerHTML = `
            <p class="text-gray-600">Unable to load projects. Please try again later.</p>
        `;
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    
    if (projects.length === 0) {
        container.innerHTML = `
            <p class="text-gray-600 text-center py-8">No projects yet. Be the first to create one!</p>
        `;
        return;
    }
    
    container.innerHTML = projects.map(project => {
        const typeColors = {
            cleanup: 'bg-blue-100 text-blue-800',
            harvesting: 'bg-green-100 text-green-800',
            conservation: 'bg-purple-100 text-purple-800',
            education: 'bg-yellow-100 text-yellow-800'
        };
        
        const typeColor = typeColors[project.project_type] || 'bg-gray-100 text-gray-800';
        
        return `
            <div class="border rounded-lg p-4 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="text-lg font-semibold">${project.name || 'Untitled Project'}</h3>
                        <p class="text-sm text-gray-600">${project.location || 'Location not specified'}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${typeColor}">
                        ${project.project_type || 'general'}
                    </span>
                </div>
                <p class="text-gray-700 mb-4">${project.description || 'No description provided.'}</p>
                <button class="text-blue-600 hover:underline text-sm">Join Project →</button>
            </div>
        `;
    }).join('');
}

function updateStats(projects) {
    document.getElementById('total-projects').textContent = projects.length;
    // Mock data for participants and impact
    document.getElementById('total-participants').textContent = projects.length * 5;
    document.getElementById('total-impact').textContent = formatLiters(projects.length * 10000);
}

function updateMapMarkers(projects) {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // Add markers for each project
    projects.forEach(project => {
        if (project.latitude && project.longitude) {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(project.latitude), lng: parseFloat(project.longitude) },
                map: map,
                title: project.name
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="p-2">
                        <h3 class="font-semibold">${project.name}</h3>
                        <p class="text-sm text-gray-600">${project.location}</p>
                        <p class="text-sm mt-2">${project.description || ''}</p>
                    </div>
                `
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
            
            markers.push(marker);
        }
    });
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: 'project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-description').value,
        location: document.getElementById('project-location').value,
        project_type: document.getElementById('project-type').value,
        latitude: null, // Could be enhanced with geocoding
        longitude: null,
        createdAt: new Date().toISOString()
    };
    
    try {
        // Save to local storage
        const projects = storage.get('community_projects') || [];
        projects.push(formData);
        storage.set('community_projects', projects);
        
        // Close modal and reload projects
        document.getElementById('create-project-modal').classList.add('hidden');
        document.getElementById('project-form').reset();
        loadProjects();
        
        alert('Project created successfully!');
        
    } catch (error) {
        console.error('Failed to create project:', error);
        alert('Failed to create project. Please try again.');
    }
}

