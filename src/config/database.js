import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    { 
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
    }
  );

  async function createDatabaseIfNotExists() {
    try {
      await sequelize.authenticate();
      console.log('Connection to MySQL server has been established successfully.');
  
      // Check if the "travel" database exists
      const [rows] = await sequelize.query(`SHOW DATABASES LIKE '${DB_NAME}'`);
      if (rows.length === 0) {
        await sequelize.query(`CREATE DATABASE ${DB_NAME}`);
        console.log(`Database '${DB_NAME}' created successfully.`);
      }
      else {
        console.log(`Database '${DB_NAME}' already exists.`);
      }
  
      // After confirming or creating the database, reconnect with the 'travel' database
      sequelize.config.database = DB_NAME;
      await sequelize.close();
      
      const dbSequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASSWORD, 
        { 
          host: process.env.DB_HOST,
          dialect: 'mysql',
          port: process.env.DB_PORT,
        }
      );
  
      await dbSequelize.sync({ alter: true });
      console.log('Tables have been created or synced successfully.');
      
    }
    catch (error) {
      console.error('Unable to connect or create database:', error);
    }
  }
  
  await createDatabaseIfNotExists();
  
  export default sequelize;