import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from './Loader';

function ProductList() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('StocklyToken');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProducts(response.data);
        console.log("Products", response.data);
      } else if (response.status === 404) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    setLoading(true);
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const res = await axios.delete(`${apiUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setTimeout(() => {
          setLoading(false);
          fetchProducts();
        }, 500);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return String(product[searchBy].name ? product[searchBy].name : product[searchBy])
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    fetchProducts();
  }, [searchBy, apiUrl]);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6">Product List</h3>
      {loading && <Loader text="Loading" />}

      <div className="flex items-center mb-6">
        <input
          className="border rounded-md p-2 w-full mr-2"
          type="text"
          placeholder={`Search by products ${searchBy}...`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="mr-2">Search By:</span>
        <select
          className="border rounded-md p-2"
          value={searchBy}
          onChange={handleSearchByChange}
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-3 px-4 border-b">Code</th>
            <th className="py-3 px-4 border-b">Image</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Category</th>
            <th className="py-3 px-4 border-b">Price</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{product.code}</td>
              <td className="py-3 px-4 border-b">
                <img
                  src={`${apiUrl}/uploads/${product.imageUrl}`}
                  className="h-16 w-16 object-cover rounded-lg"
                  alt={product.name}
                />
              </td>
              <td className="py-3 px-4 border-b">{product.name}</td>
              <td className="py-3 px-4 border-b">{product.category?.name}</td>
              <td className="py-3 px-4 border-b">¥ {product.price}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex items-center space-x-2">
                  <Link
                    className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm hover:bg-blue-600 transition"
                    to={"/product-details/" + product._id}
                  >
                    View
                  </Link>
                  <Link
                    className="bg-green-500 text-white rounded-md px-3 py-2 text-sm hover:bg-green-600 transition"
                    to={"/add-inventory/" + product._id}
                  >
                    Add to Inventory
                  </Link>
                  <Link
                    className="bg-yellow-500 text-white rounded-md px-3 py-2 text-sm hover:bg-yellow-600 transition"
                    to={"/product/" + product._id}
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white rounded-md px-3 py-2 text-sm hover:bg-red-600 transition"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
