const express = require('express');
const bodyParser = require('body-parser');
const { Project, Task } = require('./models');

const app = express();
app.use(bodyParser.json());

// Route: Alle Projekte abrufen
app.get('/projects', async (req, res) => {
  const projects = await Project.findAll({ include: Task });
  res.json(projects);
});

// Route: Neues Projekt erstellen
app.post('/projects', async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

// Route: Neue Aufgabe zu einem Projekt hinzufügen
app.post('/projects/:projectId/tasks', async (req, res) => {
  const project = await Project.findByPk(req.params.projectId);
  const task = await project.createTask(req.body);
  res.json(task);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
