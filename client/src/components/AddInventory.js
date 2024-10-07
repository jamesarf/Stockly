import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const AddInventory = () => {
    let productID = useParams().id;
    const [formData, setFormData] = useState({
        productID: productID,
        quantity: '',
        expirationDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/inventories?productID=${formData.productID}&expirationDate=${formData.expirationDate}`);
            if (response.data.length > 0) {
                const inventoryId = response.data[0]._id;
                await axios.put(`http://localhost:5000/inventories/${inventoryId}`, 
                {
                    quantity: parseInt(formData.quantity) + parseInt(response.data[0].quantity)
                }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                alert("Updated inventory successfully");
            } else {
                // No match found, add new inventory
                await axios.post('http://localhost:5000/inventory', formData);
                console.log('Inventory added successfully!');
                alert('Inventory added successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding/updating inventory. Please try again.');
        }
    };
    
    return (
        <div>
            <h3>Add Inventory</h3>
            <form className="form"  onSubmit={handleSubmit}>
                <div className="input-title">
                    <span>Quantity:</span>
                </div>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <div className="input-title">
                    <span>Expiration Date:</span>
                </div>
                <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    required
                />
                <button className="btn btn-success" type="submit">
                    Add Inventory
                </button>
            </form>
        </div>
    );
};

export default AddInventory;
