import { Router } from 'express';
const router = Router();

// Example users data (replace with actual user authentication logic)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// POST /login - Authenticate user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find user based on username and password
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // If user is found, return success message or token (for JWT implementation)
    res.json({ authenticated: true, message: 'Login successful' });
  } else {
    // If user is not found, return error message
    res.status(401).json({ authenticated: false, message: 'Invalid credentials' });
  }
});

// Example endpoint for registration (replace with actual registration logic)
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Simulate registration (in real app, save to database)
  users.push({ id: users.length + 1, username, password });
  
  res.status(201).json({ message: 'User registered successfully' });
});

export default router;