import React from 'react'
import ProductCrud from '../components/product/ProductCrud'
import Home from '../components/home/Home'
import { Routes, Route } from "react-router-dom";


export default props => (
    <Routes>
        <Route exact path="/" element={<Home/>} />         
        <Route path="/products" element={<ProductCrud/>} />
        <Route path="*" element={<Home/>} />
    </Routes>
);