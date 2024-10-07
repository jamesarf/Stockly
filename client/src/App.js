import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Category from "./components/Category";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetailsPage from "./components/ProductDetailsPage";
import AddInventory from "./components/AddInventory";
import Loader from './components/Loader';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={ <Dashboard/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/products" element={ <ProductList/> }/>
            <Route path="/loader" element={ <Loader/> }/>
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/category" element={<Category/>}/>
            <Route path="/product/:id" element={<UpdateProduct/>}/>
            <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>
            <Route path="/add-inventory/:id" element={<AddInventory/>}/>
          </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}
export default App;
