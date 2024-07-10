import express from 'express';
import  mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user.mjs';
import authRoutes from './routes/authRoutes.js';
import bcrypt from 'bcrypt'; 

dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

  
app.post('/register', async (req, res) => {
  const { confirmpassword, password, email } = req.body;
  try {
    const newUser = new User({ confirmpassword, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Compare the provided password with the hashed password stored in MongoDB
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log("Success");
    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ authenticated: false, message: 'Login failed. Please try again.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});