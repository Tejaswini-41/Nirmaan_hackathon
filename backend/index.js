// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploads.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
