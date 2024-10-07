import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subForCatId, setSubForCatId] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/categories");
            console.log("categories", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const handleSubmitCategory = async () => {
        try {
            const result = await axios.post(`http://localhost:5000/categories`, { name: categoryName });
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
            await axios.post(`http://localhost:5000/subcategories`, { categoryId, name: subcategoryName });
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
            await axios.delete(`http://localhost:5000/categories/${categoryId}`);
            setCategories(categories.filter(cat => cat._id !== categoryId));
            alert('Category deleted successfully');
            // fetchAllCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if(!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:5000/subcategories/${subcategoryId}`);
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
    }, []);

    return (
        <div>
            <div className="d-flex flex-row justify-content-center">
                <div className="p-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputCategory" 
                        placeholder={!categoryName && "Type category name here.."}
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                    />
                </div>
                <div className="p-2">
                    <button 
                        className="btn btn-primary mb-2"
                        onClick={() => handleSubmitCategory()}
                    >
                        Add Category
                    </button>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <div className="p-2">
                    <table 
                    className="table table-bordered border-primary"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category</th>
                                <th scope="col">Subcategories</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category.name}</td>
                                    <td>
                                        <ul style={{ listStyleType: "none", minWidth: '385px', paddingLeft:'0' }}>
                                            {category.subcategories.map((subcategory, index) => (
                                                <li key={subcategory._id} className="p-1 d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <span className="fw-bold">{index+1}.</span>
                                                        <span className="p-3">{subcategory.name}</span>
                                                    </div>
                                                    
                                                    <button 
                                                        className="btn btn-sm btn-danger" 
                                                        onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                                                    >
                                                        <i class="fas fa-times"></i>
                                                    </button></li>
                                            ))}
                                        </ul>
                                        {subForCatId === category._id && 
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Add subcategory..." 
                                                    value={subcategoryName}
                                                    onChange={(e) => setSubcategoryName(e.target.value)}
                                                />
                                                <div className="input-group-append">
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => handleSubmitSubcategory(category._id)}
                                                    >
                                                        Add
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger mx-2"
                                                        onClick={() => setSubForCatId('')}
                                                    >
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-danger me-2"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
                                            Del Cat
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-success"
                                            onClick={() => setSubForCatId(category._id)}
                                        >
                                            Add Sub-cat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Category;
