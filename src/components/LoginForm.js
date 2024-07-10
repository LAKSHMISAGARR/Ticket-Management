import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [error, setError] = useState(null); // Define error state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email: formData.email,
      password: formData.password, })
      if (response && response.data) {
        console.log('Login response:', response.data);
        navigate('/dashboard');
      } else {
        console.error('Unexpected response structure:', response);
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
        <section>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="inputbox">
      <ion-icon name="mail-outline"></ion-icon>
      <input type="email" 
      name="email"
      placeholder="Email" 
      value={formData.email} 
      onChange={handleChange} 
      required />
      <label htmlFor="">Email</label>
      </div>
      
      <div className="inputbox">
      <ion-icon name="lock-closed-outline"></ion-icon>
        <input type="password"
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required />
        <label htmlFor="">Password</label>
     </div>
     {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Log in</button>
      <div className="register">
            <p>Don't have an account? 
              <button type="button" onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
                Register
              </button>
            </p>
          </div>
    </form>
    </section>
  );
};

export default LoginForm;