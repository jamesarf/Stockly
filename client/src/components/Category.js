import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('StocklyToken');
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subForCatId, setSubForCatId] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchAllCategories = async () => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const response = await axios.get(`${apiUrl}/categories`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmitCategory = async () => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const result = await axios.post(`${apiUrl}/categories`, { name: categoryName }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategoryName('');
            alert('Category added successfully!');
            fetchAllCategories();
        } catch (error) {
            console.log("Error adding Category", error);
        }
    };

    const handleSubmitSubcategory = async (categoryId) => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            await axios.post(`${apiUrl}/subcategories`, { categoryId, name: subcategoryName }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubcategoryName('');
            setSubForCatId('');
            fetchAllCategories();
            alert('Subcategory added successfully!');
        } catch (error) {
            console.log("Error adding Subcategory", error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        if (!token) {
            navigate('/');
            return;
        }
        try {
            await axios.delete(`${apiUrl}/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(categories.filter(cat => cat._id !== categoryId));
            alert('Category deleted successfully');
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        if (!token) {
            navigate('/');
            return;
        }
        try {
            await axios.delete(`${apiUrl}/subcategories/${subcategoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Subcategory deleted successfully');
            fetchAllCategories();
            setCategories(prevCategories =>
                prevCategories.map(category =>
                    category._id === categoryId
                        ? { ...category, subcategories: category.subcategories.filter(subcategory => subcategory._id !== subcategoryId) }
                        : category
                )
            );
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, [apiUrl]);

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col items-center mb-6">
                <div className="flex w-full max-w-md">
                    <input
                        type="text"
                        className="border rounded-l-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Type category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 transition"
                        onClick={handleSubmitCategory}
                    >
                        Add Category
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center w-full max-w-5xl mx-auto">
                {categories.map((category, index) => (
                    <div key={category._id} className="border rounded-lg p-4 shadow-md bg-white">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">{category.name}</h2>
                        <ul className="space-y-2">
                            {category.subcategories.map((subcategory, index) => (
                                <li key={subcategory._id} className="flex justify-between items-center">
                                    <span>{index + 1}. {subcategory.name}</span>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {subForCatId === category._id && (
                            <div className="flex mt-4">
                                <input
                                    type="text"
                                    className="border rounded-l-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="Add subcategory..."
                                    value={subcategoryName}
                                    onChange={(e) => setSubcategoryName(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
                                    onClick={() => handleSubmitSubcategory(category._id)}
                                >
                                    Add
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-600 transition"
                                    onClick={() => setSubForCatId('')}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                onClick={() => setSubForCatId(category._id)}
                            >
                                Add Sub-cat
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                onClick={() => handleDeleteCategory(category._id)}
                            >
                                Delete Category
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
