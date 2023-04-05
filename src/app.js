import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const app = express();

// Connecting to the database
mongoose.connect(process.env.CONNECTIONSTRING);

// Enabling Cors
app.use(cors());

// Enabling Json
app.use(express.json());

// Enabling routes
app.use(routes);

app.listen(3333, () => {
  console.log('Servidor rodando: http://localhost:3333');
});
