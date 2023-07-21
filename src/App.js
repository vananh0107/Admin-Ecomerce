import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Order';
import Customers from './pages/Customers';
import Productlist from './pages/Productlist';
import Brandlist from './pages/Branlist';
import Categorylist from './pages/Categorylist';
import Colorlist from './pages/Colorlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Couponlist from './pages/Counponlist';
import AddCounpon from './pages/Addcounpon';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import DetailOrder from './pages/DetailOrder';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<DetailOrder />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-list/:id" element={<Addblog />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="orders" element={<Orders title="Orders" />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product-list/:id" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCounpon />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="brand-list/:id" element={<Addbrand />} />
          <Route path="category-list/:id" element={<Addcat />} />
          <Route path="color-list/:id" element={<Addcolor />} />
          <Route path="coupon-list/:id" element={<AddCounpon />} />
          <Route path="blog-category-list/:id" element={<Addblogcat />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="category" element={<Addcat />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
