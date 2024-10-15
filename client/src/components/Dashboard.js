import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const apiUrl = `${process.env.REACT_APP_API_URL}/inventories/overview`;
    const token = localStorage.getItem('StocklyToken');
    const [overview, setOverview] = useState({
      totalProducts: 0,
      expiringProducts: 0,
      lowStockProducts: 0,
    });

    const getInventoryOverview = useCallback( async () => {
        if (!token) {
        navigate('/');
        return;
        }
        try {
            // Simulating API call
            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` },
              });
            console.log("API response:", response.data);
            setOverview({
                totalProducts: response.data.totalProducts,
                expiringProducts: response.data.expiringProducts,
                lowStockProducts: response.data.lowStockProducts,
            });
        } catch (error) {
            console.error('Error fetching inventory overview:', error);
        }
    },[apiUrl]);

    // Run getInventoryOverview only once after the component mounts
    useEffect(() => {
        console.log('getInventoryOverview');
        getInventoryOverview();
    }, [getInventoryOverview]); // Empty dependency array ensures it runs only on mount

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto p-6">
                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-medium">Total Products</h3>
                            <p className="text-2xl font-bold">{overview.totalProducts}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-medium">Expiring Products Alerts</h3>
                            <p className="text-2xl font-bold">{overview.expiringProducts}</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-medium">Low Stock Alerts</h3>
                            <p className="text-2xl font-bold">{overview.lowStockProducts}</p>
                        </div>
                        {/* <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-medium">Products added to inventory</h3>
                            <p className="text-2xl font-bold">Coming soon!</p>
                        </div> */}
                    </div>
                </section>

                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <Link to="/add-product" className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 text-center mb-2 md:mb-0 flex items-center justify-center h-12">
                            Add New Product
                        </Link>
                        <Link to="/products" className="bg-yellow-600 text-white py-2 px-4 rounded shadow hover:bg-yellow-700 text-center mb-2 md:mb-0 flex items-center justify-center h-12">
                            View Products
                        </Link>
                        <Link to="/category" className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 text-center mb-2 md:mb-0 flex items-center justify-center h-12">
                            View Categories
                        </Link>
                    </div>
                </section>


                {/* <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Recent Activity feature coming soon!</li>
                    </ul>
                </section> */}
            </main>
        </div>
    );
}

export default Dashboard;
