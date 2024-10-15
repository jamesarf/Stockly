import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/register`, { name, email, password });
      setMessage(response?.data?.message || 'Registration successful! Redirecting...');
      localStorage.setItem('StocklyToken', response.data.token); // Store token
      localStorage.setItem('StocklyUser', JSON.stringify(response.data.user)); // Store user info
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration. Please try again.');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('StocklyUser');
    const token = localStorage.getItem('StocklyToken');
    if (user && token) {
      navigate('/');
    }
  }, [navigate]);

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        {loading && <Loader />}
        {message && <p className="text-green-600 text-center">{message}</p>} {/* Display success message */}
        {error && <p className="text-red-600 text-center">{error}</p>} {/* Display error message */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {loading ? 'Processing...' : 'Sign up'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?
            <button
              onClick={navigateToLogin}
              className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
