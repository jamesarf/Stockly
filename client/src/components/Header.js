import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // const user = localStorage.getItem('reactAuthUser');
  // console.log(user)
  return (
    <nav className="bg-indigo-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl no-underline font-bold">Inventory Management Dashboard</Link>
        <button className="text-white md:hidden focus:outline-none" aria-label="Toggle navigation">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {/* {user && ( */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:bg-indigo-700 px-3 py-2 no-underline rounded">Home</Link>
          <Link to="/add-product" className="text-white hover:bg-indigo-600 px-3 py-2 no-underline rounded">Add Product</Link>
          <Link to="/category" className="text-white hover:bg-indigo-500 px-3 py-2 no-underline rounded">Category</Link>
        </div>
        {/* )} */}
      </div>
    </nav>
  );
}

export default Header;
