'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

// Current file name (index.js) for avoiding self-import
const basename = path.basename(__filename);

// Get the environment, defaulting to 'development' if not set
const env = process.env.NODE_ENV || 'development';

// Load the configuration for the appropriate environment
const config = require(__dirname + '/../config/config.json')[env];

// Create an empty object to hold all models
const db = {};

let sequelize;

// Initialize Sequelize connection
if (config.use_env_variable) {
  // Use environment variable for database connection string
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Use config directly if no environment variable
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically load all models from the current directory (excluding this file)
fs
  .readdirSync(__dirname)  // Read the files in the current directory
  .filter(file => {
    // Exclude hidden files, the current file (index.js), and non .js files
    return (
      file.indexOf('.') !== 0 &&           // Exclude hidden files like .gitignore, .env, etc.
      file !== basename &&                 // Avoid including this file itself
      file.slice(-3) === '.js' &&           // Only include .js files (models)
      file.indexOf('.test.js') === -1      // Exclude test files (if any)
    );
  })
  .forEach(file => {
    // Dynamically require each model and add it to the `db` object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Add the model to the db object by name
  });

// Define model associations (if any exist)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    // Call the `associate` method if it's defined in the model
    db[modelName].associate(db);
  }
});

// Add the Sequelize instance and Sequelize constructor to the db object for easy access
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the models
module.exports = db;
