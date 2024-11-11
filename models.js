const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Projektmodell
const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

// Aufgabenmodell
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Geplant',
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  assignee: {
    type: DataTypes.STRING,
  },
});

// Beziehungen
Project.hasMany(Task);
Task.belongsTo(Project);

// Sync mit der Datenbank
sequelize.sync({ force: false })
  .then(() => console.log('Tables have been synced.'))
  .catch(err => console.error('Error syncing tables:', err));
