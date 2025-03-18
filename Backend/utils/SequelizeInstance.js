const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging queries (optional)
});

// Function to test connection and sync database
const initializeDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.sync({ force: false }); // Sync models without dropping tables
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


// Call the function
initializeDB();

module.exports = { sequelize, DataTypes };