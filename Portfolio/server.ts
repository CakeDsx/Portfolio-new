import { Hono } from 'hono';
import { serve } from 'hono/serve';

const app = new Hono();

interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

let projects: Project[] = []; // In-memory list to store projects

// Route to get all projects
app.get('/projects', (c) => {
  return c.json(projects);
});

// Route to add a new project
app.post('/projects', async (c) => {
  const body = await c.req.json<Project>();
  const newProject: Project = {
    id: projects.length + 1,
    ...body,
    created_at: new Date().toISOString(),
  };
  projects.push(newProject);
  return c.json(newProject, 201);
});

// Start the server on port 3000
serve(app, { port: 3000 });

console.log('Server running on http://localhost:3000');
