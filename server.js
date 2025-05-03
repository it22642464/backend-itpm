import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import wasteCollectionRequestRoutes from './routes/wasteCollectionRequestRoutes.js';
// const cors = require('cors');
import cors from "cors";

// Load environment variables
dotenv.config();

// Create an express app
const app = express();

// Middleware
app.use(cors());

app.use(express.json()); 
// app.use(cors({
//   origin: process.env.CLIENT_URL
// }));


app.use((req, res, next) => {
  console.log("A new request received at " + Date.now());
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/wasteCollectionRequest', wasteCollectionRequestRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    // Listen to port 4000
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

 