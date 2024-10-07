import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductDetailsPage = () => {
  const params = useParams();
  const inputRef = useRef(null);
  const [decrement, setDecrement] = useState({
    id: '',
    quantity: '',
  });
  const [product, setProduct] = useState({
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
		inventories: [],
  });

  const fetchProductDetails = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5000/products/${params.id}`);

      console.log("productResponse", productResponse.data);
      setProduct({
        ...productResponse.data,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleUpdateinventory = async () => {
    console.log("handleUpdateinventory", decrement);
    if(decrement.quantity > 0 ){
      try{
        await axios.put(`http://localhost:5000/inventories/${decrement.id}`, 
        {
            quantity: decrement.quantity
        }, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
      }catch(error){
        console.error("Error updating Inventory",error);
      }
    }else {
        try {
          await axios.delete(`http://localhost:5000/inventories/${decrement.id}`);
        } catch (error) {
          console.error("Error deleting product:", error);
        }
    }
    setDecrement({id:'',quantity:''});
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
    return  differenceInDays;
  }

  const handleQuantityChange = (inventoryId, quantity, value) => {
    if(value >= 0 && value <= quantity ){
      setDecrement({...decrement, quantity:value})
    }else{
      alert(`Quantity must not be less than 0 or greater than ${quantity}`);
      setDecrement({...decrement, quantity:quantity})
    }
  }
  
  useEffect(() => {
    fetchProductDetails();
    inputRef.current && inputRef.current.focus();
  }, [params.id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className={calculateTotalQuantity() > 0 ? "col-md-2" : "col-md-6"}>
          <img src={"http://localhost:5000/uploads/" + product.imageUrl } className="img-fluid" alt={product.name} />
        </div>
        <div className={calculateTotalQuantity() > 0 ? "col-md-4" : "col-md-6"}>
          <h2>{product.name}</h2>
          <h3>Code: {product.code}</h3>
          {calculateTotalQuantity() > 0 ? (
            <p className="text-primary">Available</p>
          ) : (
            <p className="text-danger">Stock Out</p>
          )}
          <p className="text-muted">Category: {product.category.name}</p>
          <p className="text-muted">Sub-category: {product.subcategory.name}</p>
          <h3>${product.price}</h3>
          <p className="text-muted">{product.description}</p>
          <p className="text-muted">Net Weight: {product.netWeight} g</p>
          <p className="text-muted">Gross Weight: {product.grossWeight} g</p>
          <p className="text-muted">Height: {product.height} cm</p>
          <p className="text-muted">Width: {product.width} cm</p>
          <p className="text-muted">Length: {product.length} cm</p>
            
          <Link className="btn btn-primary" to={"/product/"+product._id}> Update </Link>
        </div>
        { calculateTotalQuantity() > 0 && 
        <div className="col-md-6">
            <table className="product-list">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Expiration Date</th>
                  <th>Expires in (days)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.inventories
                  .slice().sort((a, b) => {
                    const daysA = calculateDueDate(a.expirationDate);
                    const daysB = calculateDueDate(b.expirationDate);
                    return daysA - daysB;
                  }).map((inventory) => (
                  <tr key={inventory._id} className="product-item" style={{ color: calculateDueDate(inventory.expirationDate) < 31 ? "red" : "inherit" }}>
                    {inventory._id === decrement.id? (
                      <td>
                        <input ref={inputRef} style={{ width: "100px" }} type="number" value={decrement.quantity} onChange={ (e) => handleQuantityChange(inventory._id,inventory.quantity, e.target.value)} />
                      </td>
                    ) : (
                      <td>{inventory.quantity}</td>
                    )}
                    <td>{inventory.expirationDate.split('T')[0]}</td>
                    <td>{calculateDueDate(inventory.expirationDate)} days</td>
                    {inventory._id === decrement.id? (
                      <td style={{ width: "200px" }}>
                        <button className='btn btn-sm btn-success m-2' onClick={ () => handleUpdateinventory()} > Confirm </button>
                        <button className='btn btn-sm btn-danger m-2' onClick={ () => setDecrement({id:'',quantity:''})} > Cancel </button>
                      </td>
                    ) : (
                      <td>
                        <button className='btn btn-sm btn-primary m-2' onClick={ () => setDecrement({id:inventory._id,quantity:inventory.quantity})} > Decrese </button>
                      </td>
                    )}
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className='fw-bold'>Total: {calculateTotalQuantity()}</td>
                </tr>
              </tbody>
            </table>
        </div>
        }
      </div>
    </div>
  );
};

export default ProductDetailsPage;
