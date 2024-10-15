import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isAuthorized, setIsAuthorized] = useState(false); // Initialize as false
  const navigate = useNavigate();
  const token = localStorage.getItem('StocklyToken');
  const apiUrl = `${process.env.REACT_APP_API_URL}/protected`;

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthorized(true);
      } catch (err) {
        localStorage.removeItem('StocklyUser');
        localStorage.removeItem('StocklyToken');
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [token, apiUrl]);

  const logout = () => {
    localStorage.removeItem('StocklyUser');
    localStorage.removeItem('StocklyToken');
    setIsAuthorized(false); // Set to false after logout
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl no-underline font-bold">Stockly</Link>
        <button className="text-white md:hidden focus:outline-none" aria-label="Toggle navigation">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-white hover:bg-indigo-700 px-3 py-2 no-underline rounded">Home</Link>
          {isAuthorized ? (
            <>
              <Link to="/products" className="text-white hover:bg-indigo-600 px-3 py-2 no-underline rounded">Products</Link>
              <Link to="/add-product" className="text-white hover:bg-indigo-600 px-3 py-2 no-underline rounded">Add Product</Link>
              <Link to="/category" className="text-white hover:bg-indigo-500 px-3 py-2 no-underline rounded">Category</Link>
              <button
                className="text-white bg-indigo-600 px-3 py-2 no-underline rounded hover:bg-indigo-700"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/register" className="text-white hover:bg-indigo-700 px-3 py-2 no-underline rounded">Sign up</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
