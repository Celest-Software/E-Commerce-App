import sequelize from './src/models/database.js';
import User from './src/models/user.model.js';


async function initDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Unable to sync the models:', error);
  }
}

initDB();
