import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Login = () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = useCallback( async (e) => {
    e.preventDefault();
    setError(''); 
    setMessage(''); 
    setLoading(true); // Set loading state

    try {
      const response = await axios.post(apiUrl, { email, password });
      setMessage(response?.data?.message || 'Login successful! Redirecting...');
      // Store token and user information in local storage
      localStorage.setItem('StocklyToken', response.data.token);
      localStorage.setItem('StocklyUser', JSON.stringify(response.data.user));
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      // Handle specific error response or network errors
      if (err.response) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setError('Network error. Please check your connection.');
        setLoading(false);
      }
    }
  },[apiUrl, email, password, navigate]);

  const navigateToSignup = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {loading && <Loader />}
        {/* {message && <p className="text-green-600 text-center">{message}</p>}  */}
        {error && <p className="text-red-600 text-center">{error}</p>} 
        
        <form onSubmit={handleLogin} className="space-y-4">
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
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={navigateToSignup}
              className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
