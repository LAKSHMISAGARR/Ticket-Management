// server.js
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
//import authRoutes from './src/routes/auth';
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());
app.use(json());

// Mock user database (replace with actual database logic)
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Login endpoint
app.post('LoginForm', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});