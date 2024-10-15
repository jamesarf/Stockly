import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useParams, useNavigate } from "react-router-dom";
import countries from '../countries';

const UpdateProduct = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('StocklyToken');
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
		description: "",
		category: "",
		subcategory: "",
		price: "",
		netWeight: "",
		grossWeight: "",
		height: "",
		width: "",
		length: "",
		barcode: "",
		country: "",
		image: null,
  });
	
  const fetchAllCategory = useCallback( async (category) => {
	if (!token) {
        navigate('/');
        return;
    }
    try {
      const response = await axios.get(`${apiUrl}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
		if(category){
			const filteredCategories = response.data.filter(cat => cat._id === category);
			if (filteredCategories.length > 0) {
				setSubcategories(filteredCategories[0].subcategories || []);
			}else{
				setSubcategories([]);
			}
		}
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
}, [apiUrl]);

  const handleSelectCategory = (selectedCategory) => {
		setFormData({ ...formData, category: selectedCategory })
		const category = categories.filter((category) => category._id === selectedCategory )
		setSubcategories(category[0].subcategories);
	}

	const fetchProductDetails = useCallback(async () => {
		try {
		  const response = await axios.get(`${apiUrl}/products/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
		  setFormData({
			...response.data,
			category: response.data.category._id, // Set category ID
			subcategory: response.data.subcategory._id, // Set sub-category ID
		  });
		} catch (error) {
		  console.error("Error fetching products:", error);
		}
	  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
	setMessage('Processing');
    const data = new FormData();
    data.append("name", formData.name);
		data.append("description",formData.description);
		data.append("category", formData.category);
		data.append("subcategory", formData.subcategory);
		data.append("price", formData.price);
		data.append("netWeight", formData.netWeight);
		data.append("grossWeight", formData.grossWeight);
		data.append("height", formData.height);
		data.append("width", formData.width);
		data.append("length", formData.length);
		data.append("barcode", formData.barcode);
		data.append("country", formData.country);
		data.append("image", formData.image);

    try {
      await axios.put(`${apiUrl}/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
		  	Authorization: `Bearer ${token}`
        },
      });
      
	  setTimeout(() => {
		setMessage("Updated successfully");
		setTimeout(() => {
			return navigate (`/product-details/${id}`);
			// window.location.href = `/product-details/${id}`;
		}, 2000);
	}, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
	  setMessage('Error adding/updating inventory. Please try again.');
    }
  };

  useEffect(() => {
    fetchAllCategory(formData.category);
}, [formData.category, fetchAllCategory]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
		<div className='container mx-auto p-6'>
			{message && <Loader text={message} />}
			{message && (
                
                <div className={`mt-4 p-3 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                    
                </div>
            )}
			<h3 className="text-2xl font-semibold mb-6">Update Product</h3>
			<form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Product Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Name</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="text"
							placeholder="Name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
						/>
					</div>
					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Description</label>
						<textarea 
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
							rows="3"
							placeholder="Description"
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
						></textarea>
					</div>
					{/* Category */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Category</label>
						<select
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							value={formData.category}
							onChange={(e) => handleSelectCategory(e.target.value)}
						>
							<option value=''>Select Category</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>{category.name}</option>
							))}
						</select>
					</div>
					{/* Sub-category */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Sub-category</label>
						<select
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							value={formData.subcategory}
							onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
						>
							<option value=''>Select Sub-category</option>
							{subcategories.map((subcategory) => (
								<option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
							))}
						</select>
					</div>
					{/* Price */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Price</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Price"
							value={formData.price}
							onChange={(e) => setFormData({ ...formData, price: e.target.value })}
							required
						/>
					</div>
					{/* Net Weight */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Net Weight</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Net Weight"
							value={formData.netWeight}
							onChange={(e) => setFormData({ ...formData, netWeight: e.target.value })}
							required
						/>
					</div>
					{/* Gross Weight */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Gross Weight</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Gross Weight"
							value={formData.grossWeight}
							onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })}
							required
						/>
					</div>
					{/* Dimensions */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Height</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Height"
							value={formData.height}
							onChange={(e) => setFormData({ ...formData, height: e.target.value })}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Width</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Width"
							value={formData.width}
							onChange={(e) => setFormData({ ...formData, width: e.target.value })}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Length</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="number"
							placeholder="Length"
							value={formData.length}
							onChange={(e) => setFormData({ ...formData, length: e.target.value })}
							required
						/>
					</div>
					{/* Barcode */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Barcode</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="text"
							placeholder="Barcode"
							value={formData.barcode}
							onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
						/>
					</div>
					{/* Country */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Country</label>
						<select
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							value={formData.country}
							onChange={(e) => setFormData({ ...formData, country: e.target.value })}
						>
							<option value=''>Select Country</option>
							{countries.map((country, index) => (
								<option key={index} value={country}>{country}</option>
							))}
						</select>
					</div>
					{/* Image */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Product Image</label>
						<input
							className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
							type="file"
							onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
				>
					Update Product
				</button>
			</form>
		</div>
	);
}

export default UpdateProduct;
