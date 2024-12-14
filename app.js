import express from 'express';
import hotelRoutes from './src/routes/hotelRoute.js';
import sequelize from './src/config/database.js';

const app = express();

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Unable to create tables:', error);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/hotels', hotelRoutes);

export default app;
