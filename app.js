// ========================================
// FETCH PROJECTS FROM JSON FILE
// ========================================

async function loadProjects() {
    try {
        // Fetch the projects.json file
        const response = await fetch('projects.json');
        const data = await response.json();
        
        // Display projects on the page
        displayProjects(data);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        
        // Show error message to user
        const backendContainer = document.getElementById('backend-projects');
        const frontendContainer = document.getElementById('frontend-projects');
        
        if (backendContainer) {
            backendContainer.innerHTML = '<p class="text-danger">Error loading projects. Please try again later.</p>';
        }
        if (frontendContainer) {
            frontendContainer.innerHTML = '<p class="text-danger">Error loading projects. Please try again later.</p>';
        }
    }
}

// ========================================
// DISPLAY PROJECTS ON THE PAGE
// ========================================

function displayProjects(data) {
    const backendContainer = document.getElementById('backend-projects');
    const frontendContainer = document.getElementById('frontend-projects');
    
    // If containers don't exist, we're not on the portfolio page
    if (!backendContainer || !frontendContainer) return;
    
    // Clear existing content
    backendContainer.innerHTML = '';
    frontendContainer.innerHTML = '';
    
    // Display backend projects
    if (data.backend.length === 0) {
        backendContainer.innerHTML = '<p class="text-muted">No backend projects yet.</p>';
    } else {
        data.backend.forEach(project => {
            backendContainer.innerHTML += createProjectCard(project);
        });
    }
    
    // Display frontend projects
    if (data.frontend.length === 0) {
        frontendContainer.innerHTML = '<p class="text-muted">No frontend projects yet.</p>';
    } else {
        data.frontend.forEach(project => {
            frontendContainer.innerHTML += createProjectCard(project);
        });
    }
}

// ========================================
// CREATE PROJECT CARD HTML
// ========================================

function createProjectCard(project) {
    const githubButton = project.github 
        ? `<a href="${project.github}" target="_blank" class="btn btn-outline-dark">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="vertical-align: middle; margin-right: 5px;">
               <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
             </svg>
             View on GitHub
           </a>`
        : '';
    
    const liveButton = project.live 
        ? `<a href="${project.live}" target="_blank" class="btn btn-dark">
             Live Preview →
           </a>`
        : '';
    
    return `
        <div class="col-12 mb-3">
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div>
                    ${githubButton}
                    ${liveButton}
                </div>
            </div>
        </div>
    `;
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});