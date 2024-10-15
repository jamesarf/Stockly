import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetailsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('StocklyToken');
  const navigate = useNavigate();
  const params = useParams();
  const inputRef = useRef(null);
  const [decrement, setDecrement] = useState({
    id: '',
    quantity: '',
  });
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: {},
    subcategory: {},
    price: "",
    netWeight: "",
    grossWeight: "",
    height: "",
    width: "",
    length: "",
    barcode: "",
    country: "",
    imageUrl: null,
    inventories: [],
  });

  const fetchProductDetails = async () => {
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const productResponse = await axios.get(`${apiUrl}/products/${params.id}`,{
        headers: { Authorization: `Bearer ${token}` },
      }); 
      setProduct({
        ...productResponse.data,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleUpdateInventory = async () => {
    if (!token) {
			navigate('/');
			return;
		}
    if (decrement.quantity > 0) {
      try {
        await axios.put(`${apiUrl}/inventories/${decrement.id}`, {quantity: decrement.quantity}, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
      } catch (error) {
        console.error("Error updating inventory", error);
      }
    } else {
      try {
        await axios.delete(`${apiUrl}/inventories/${decrement.id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
      } catch (error) {
        console.error("Error deleting inventory:", error);
      }
    }
    setDecrement({ id: '', quantity: '' });
    fetchProductDetails();
  }

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    product.inventories.forEach(inventory => {
      totalQuantity += inventory.quantity;
    });
    return totalQuantity;
  };  

  const calculateDueDate = (d) => {
    const currentDate = new Date();
    const otherDate = new Date(d);
    const differenceInMilliseconds = otherDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  const handleQuantityChange = (inventoryId, quantity, value) => {
    if (value >= 0 && value <= quantity) {
      setDecrement({ ...decrement, quantity: value });
    } else {
      alert(`Quantity must not be less than 0 or greater than ${quantity}`);
      setDecrement({ ...decrement, quantity: quantity });
    }
  }

  useEffect(() => {
    fetchProductDetails();
    inputRef.current && inputRef.current.focus();
  }, [params.id, apiUrl]);

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className={`w-full md:w-1/3 mb-6 md:mb-0 flex justify-center`}>
          <div className="relative">
            <img
              src={`${apiUrl}/uploads/${product.imageUrl}`}
              className="w-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
              alt={product.name}
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold">Click to enlarge</p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className={`w-full md:w-2/3 flex flex-col justify-between`}>
          <div className='px-10'>
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <h3 className="text-xl text-gray-600 mt-2">Code: {product.code}</h3>
            {calculateTotalQuantity() > 0 ? (
              <p className="text-green-500 font-semibold mt-2">In Stock</p>
            ) : (
              <p className="text-red-500 font-semibold mt-2">Out of Stock</p>
            )}

            <div className="mt-4">
              <p className="text-gray-700"><strong>Category:</strong> {product.category.name}</p>
              <p className="text-gray-700"><strong>Sub-category:</strong> {product.subcategory.name}</p>
              <p className="text-gray-700"><strong>Country of Origin:</strong> {product.country}</p>
              <h3 className="text-xl font-semibold my-4">${product.price}</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Dimensions and Weight */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p className="text-gray-700"><strong>Net Weight:</strong> {product.netWeight} g</p>
              <p className="text-gray-700"><strong>Gross Weight:</strong> {product.grossWeight} g</p>
              <p className="text-gray-700"><strong>Height:</strong> {product.height} cm</p>
              <p className="text-gray-700"><strong>Width:</strong> {product.width} cm</p>
              <p className="text-gray-700"><strong>Length:</strong> {product.length} cm</p>
            </div>

            {/* Update Button */}
            <Link
              className="inline-block mt-6 mr-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
              to={`/product/${product._id}`}
            >
              Update Product
            </Link>

            {/* Add to Inventory Button */}
            <Link
              className="inline-block mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
              to={`/add-inventory/${product._id}`}
            >
              Add Inventory
            </Link>

          </div>
        </div>
      </div>

      {calculateTotalQuantity() > 0 && (
        <div className="my-10">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Expiration Date</th>
                <th className="py-2 px-4 border-b">Expires in (days)</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.inventories
                .slice()
                .sort((a, b) => calculateDueDate(a.expirationDate) - calculateDueDate(b.expirationDate))
                .map((inventory) => (
                  <tr key={inventory._id} className={calculateDueDate(inventory.expirationDate) < 31 ? "bg-red-100" : ""}>
                    {inventory._id === decrement.id ? (
                      <td>
                        <input
                          ref={inputRef}
                          className="border border-gray-300 rounded w-16"
                          type="number"
                          value={decrement.quantity}
                          onChange={(e) => handleQuantityChange(inventory._id, inventory.quantity, e.target.value)}
                        />
                      </td>
                    ) : (
                      <td className="py-2 px-4 border-b">{inventory.quantity}</td>
                    )}
                    <td className="py-2 px-4 border-b">{inventory.expirationDate.split('T')[0]}</td>
                    <td className="py-2 px-4 border-b">{calculateDueDate(inventory.expirationDate)} days</td>
                    {inventory._id === decrement.id ? (
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={handleUpdateInventory}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                          onClick={() => setDecrement({ id: '', quantity: '' })}
                        >
                          Cancel
                        </button>
                      </td>
                    ) : (
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => setDecrement({ id: inventory._id, quantity: inventory.quantity })}
                        >
                          Decrease
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              <tr>
                <td colSpan="4" className="py-2 px-4 font-semibold">
                  Total: {calculateTotalQuantity()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
