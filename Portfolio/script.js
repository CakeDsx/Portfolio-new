import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({ startOnLoad: true });

// Fetch all projects from the server and display them
async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:3000/projects');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const projects = await response.json();
        displayProjects(projects);
        return projects;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
}

// Display projects on the page
function displayProjects(projects) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = ''; // Clear previous projects
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <small>Created at: ${new Date(project.created_at).toLocaleString()}</small>
        `;
        projectList.appendChild(projectElement);
    });
}

// Add a new project to the server
async function createProject(newProject) {
    try {
        const response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const project = await response.json();
        fetchProjects(); // Refresh the list of projects
        console.log('Created Project:', project);
    } catch (error) {
        console.error('Failed to create project:', error);
    }
}

// Handle the project form submission
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;

    const newProject = {
        name: name,
        description: description,
    };

    createProject(newProject);

    // Clear the form fields
    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
});

// Fetch and display the projects when the page loads
fetchProjects();
