import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subForCatId, setSubForCatId] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const handleSubmitCategory = async () => {
        try {
            const result = await axios.post(`${apiUrl}/categories`, { name: categoryName });
            setCategoryName('');
            console.log("result", result.data)
            alert('Category added successfully!');
            fetchAllCategories();
        } catch (error) {
            console.log("Error adding Category", error);
        }
    }

    const handleSubmitSubcategory = async (categoryId) => {
        try {
            await axios.post(`${apiUrl}/subcategories`, { categoryId, name: subcategoryName });
            setSubcategoryName('');
            setSubForCatId('');
            fetchAllCategories();
            alert('Subcategory added successfully!');
            
        } catch (error) {
            console.log("Error adding Subcategory", error);
        }
    }

    const handleDeleteCategory = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if(!confirmDelete) return;
        try {
            await axios.delete(`${apiUrl}/categories/${categoryId}`);
            setCategories(categories.filter(cat => cat._id !== categoryId));
            alert('Category deleted successfully');
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if(!confirmDelete) return;
        try {
            await axios.delete(`${apiUrl}/subcategories/${subcategoryId}`);
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
    }

    useEffect(() => {
        fetchAllCategories();
    }, [apiUrl]);

    return (
        <div className="flex flex-col items-center py-6">
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    className="border rounded-md p-2 w-64 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder={!categoryName && "Type category name to add"}
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleSubmitCategory()}
                >
                    Add Category
                </button>
            </div>

            <div className="w-full max-w-4xl">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">#</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Category</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Subcategories</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id} className="border-t border-gray-200">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{category.name}</td>
                                <td className="py-3 px-4">
                                    <ul className="space-y-2">
                                        {category.subcategories.map((subcategory, index) => (
                                            <li key={subcategory._id} className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">{index + 1}.</span>
                                                    <span>{subcategory.name}</span>
                                                </div>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600 transition"
                                                    onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {subForCatId === category._id && (
                                        <div className="flex mt-2">
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
                                                className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600 transition"
                                                onClick={() => setSubForCatId('')}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="space-x-2">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
                                            Del Category
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                            onClick={() => setSubForCatId(category._id)}
                                        >
                                            Add Sub-cat
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
