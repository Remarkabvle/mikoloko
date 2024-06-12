import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import SingleProduct from './components/products/SingleProduct'

function App() {
  return (

      <section>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </section>
  );
}

export default App;
