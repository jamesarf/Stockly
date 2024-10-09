import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import countries from '../countries.js';


const AddProduct = () => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [loading, setLoading] = useState(false);
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
		inventory: [],
	});
	
	

	const fetchAllCategory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
	const handleSelectCategory = (selectedCategory) => {
		setFormData({ ...formData, category: selectedCategory })
		const category = categories.filter((category) => category._id === selectedCategory )
		setSubcategories(category[0].subcategories);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
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
		data.append("inventory", JSON.stringify(formData.inventory));

		try {
			const res = await axios.post(`${apiUrl}/products`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			});
			setFormData({
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
				image: "",
				inventory: [],
			});
			
			setTimeout(() => {
				setLoading(false);
				window.location.href = `/product-details/${res.data._id}`;
			}, 4000);
		} catch (error) {
	    	console.error("Error adding product:", error);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	

	useEffect(() => {
		fetchAllCategory();
	},[formData,apiUrl])


	return (
		<div className='container addProductContainer'>	
			{loading && <Loader/>}
			<h3 className="">Add Product</h3>
			<form className="" onSubmit={handleSubmit}>
			<div className='row'>
				<div className='col p-2'>
					<div className="input-title">
						<span>Name</span>
					</div>
					<input
						className='form-control'
						type="text"
						placeholder="Name"
						value={formData.name}
						onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
						}
						required
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col p-2'>
					<div className="input-title">
						<span>Description</span>
					</div>
					<textarea 
						className="form-control" 
						rows="3" 
						type="text"
						placeholder="Description"
						value={formData.description}
						onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
						}>
					</textarea>
				</div>
			</div>
			<div className='row'>
				
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Category</span>
					</div>
					<select 
						className='form-control'
						value={formData.category} 
						// onChange={(e) => setFormData({ ...formData, category: e.target.value })}
						onChange={(e) => handleSelectCategory(e.target.value)}
					>
						<option value=''>Select Category </option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>{category.name}</option>
						))}
					</select>
				</div>  

				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Sub-category</span>
					</div>
						<select 
							className='form-control'
							value={formData.subcategory} 
							onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
						>
							<option value=''>Select Sub-category </option>
							{subcategories.map((subcategory) => (
								<option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
							))}
						</select>
				</div>  
			</div>  
			  
			<div className='row'>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Price</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Price"
					value={formData.price}
					onChange={(e) =>
					setFormData({ ...formData, price: e.target.value })
					}
					required
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
					<span>Net Weight</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Net Weight"
					value={formData.netWeight}
					onChange={(e) =>
					setFormData({ ...formData, netWeight: e.target.value })
					}
					required
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
					<span>Gross Weight</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Gross Weight"
					value={formData.grossWeight}
					onChange={(e) =>
					setFormData({ ...formData, grossWeight: e.target.value })
					}
					required
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Height</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Height"
					value={formData.height}
					onChange={(e) =>
					setFormData({ ...formData, height: e.target.value })
					}
					required
					/>
				</div>
					
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Width</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Width"
					value={formData.width}
					onChange={(e) =>
						setFormData({ ...formData, width: e.target.value })
					}
					required
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Length</span>
					</div>
					<input
					className='form-control'
					type="number"
					placeholder="Length"
					value={formData.length}
					onChange={(e) =>
						setFormData({ ...formData, length: e.target.value })
					}
					required
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Barcode</span>
					</div>
					<input
						className='form-control'
						type="text"
						placeholder="Barcode"
						value={formData.barcode}
						onChange={(e) =>
							setFormData({ ...formData, barcode: e.target.value })
						}
					/>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Country</span>
					</div>
					<select
						className='form-control'
						value={formData.country}
						onChange={(e) => setFormData({ ...formData, country: e.target.value })}
					>
						<option value=''>Select Country</option>
						{countries.map((country, index) => (
							<option key={index} value={country}>{country}</option>
						))}
					</select>
				</div>
				<div className='col-md-4 p-2'>
					<div className="input-title">
						<span>Image</span>
					</div>
					<input
					className='form-control'
					type="file"
					accept="image/*"
					onChange={(e) =>
					setFormData({ ...formData, image: e.target.files[0] })
					}
					required
					/>
				</div>
			</div>
			  
			  
			  <button className="btn btn-success" type="submit">
			    Add Product
			  </button>
			</form>
		</div>
	)
}

export default AddProduct;