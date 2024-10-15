import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Loader from './Loader'; //

const AddInventory = () => {
    let productID = useParams().id;
    const apiUrl = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('StocklyToken');
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        productID: productID,
        quantity: '',
        expirationDate: '',
    });
    const [message, setMessage] = useState(''); // State for message
    const [loading, setLoading] = useState(null); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
		if (!token) {
			navigate('/');
			return;
		}
        setLoading(true);
        try {
            const resp = await axios.post(`${apiUrl}/inventories`, formData, {
				headers: {
		  			"Authorization": `Bearer ${token}`
				},
			});
            console.log(resp);

            // Redirect to the product details page after 2 seconds

            setTimeout(() => {
                setLoading(false); // Stop loading
                setMessage('Inventory added successfully!'); 
                setTimeout(() => {
                    navigate(`/product-details/${productID}`); 
                }, 1000); 
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setMessage('Error adding/updating inventory. Please try again.'); // Set error message
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Inventory</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Quantity Input */}
                <div>
                    <label htmlFor="quantity" className="block text-gray-700 font-medium">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quantity"
                    />
                </div>
                
                {/* Expiration Date Input */}
                <div>
                    <label htmlFor="expirationDate" className="block text-gray-700 font-medium">
                        Expiration Date:
                    </label>
                    <input
                        type="date"
                        id="expirationDate"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Add Inventory
                    </button>
                </div>
            </form>

            {loading && <Loader/>}

            {/* Message Display */}
            {message && (
                
                <div className={`mt-4 p-3 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                    
                </div>
            )}
        </div>
    );
};

export default AddInventory;
