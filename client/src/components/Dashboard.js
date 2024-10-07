import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const user = localStorage.getItem('reactAuthUser');
    //     if (!user) {
    //       navigate('/register');
    //     }
    //   }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">Inventory Management Dashboard</h1>
      </header> */}

      <main className="container mx-auto p-6">
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium">Total Products</h3>
              <p className="text-2xl font-bold">150</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium">Low Stock Alerts</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium">Pending Orders</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link to="/add-product" className="bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700 text-center mb-2 md:mb-0">Add New Product</Link>
            <Link to="/products" className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 text-center">View Products</Link>
            <Link to="/category" className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 text-center">View Categories</Link>
          </div>
        </section>

        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Product XYZ added to inventory.</li>
            <li>Product ABC low stock alert generated.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
