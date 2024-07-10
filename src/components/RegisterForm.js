import React, { useState } from 'react';
//import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    try {
        const response = await axios.post('http://localhost:3000/register', {
            confirmpassword: formData.confirmPassword,
            email: formData.email,
            password: formData.password,
          });
      console.log('Registration successful:', response.data);
      navigate('/login');
      // Optionally, redirect to login or dashboard after successful registration
    } catch (error) {
      console.error('Registration error:', error);
    } 
  };

  return (
        <section>
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div className="inputbox">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      </div>
      <div className="inputbox">
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      </div>
      <div className="inputbox">
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      </div>
      <button type="submit">Register</button>
      <div className="register">
            <p>Don't have an account? 
              <button type="button" onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
                Login
              </button>
            </p>
          </div>
    </form>
    </section>
  );
};

export default RegisterForm;