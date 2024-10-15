import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Category from "./components/Category";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetailsPage from "./components/ProductDetailsPage";
import AddInventory from "./components/AddInventory";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={ <ProtectedRoute redirectTo="/products" requiresAuth={true}><Dashboard/></ProtectedRoute>}/>
            <Route path="/login" element={ <ProtectedRoute redirectTo="/" requiresAuth={false}><Login/></ProtectedRoute> }/>
            <Route path="/register" element={<ProtectedRoute redirectTo="/" requiresAuth={false}><Register/></ProtectedRoute>} />
            <Route path="/products" element={ <ProtectedRoute redirectTo="/products" requiresAuth={true}><ProductList/></ProtectedRoute> }/>
            <Route path="/add-product" element={<ProtectedRoute redirectTo="/add-product" requiresAuth={true}><AddProduct/></ProtectedRoute>}/>
            <Route path="/category" element={<ProtectedRoute redirectTo="/category" requiresAuth={true}><Category/></ProtectedRoute>}/>
            <Route path="/product/:id" element={<ProtectedRoute redirectTo="/product/:id" requiresAuth={true}><UpdateProduct/></ProtectedRoute>}/>
            <Route path="/product-details/:id" element={<ProtectedRoute redirectTo="/product-details/:id" requiresAuth={true}><ProductDetailsPage/></ProtectedRoute>}/>
            <Route path="/add-inventory/:id" element={<ProtectedRoute redirectTo="/add-inventory/:id" requiresAuth={true}><AddInventory/></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}
export default App;
