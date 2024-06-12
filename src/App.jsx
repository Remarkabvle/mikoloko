import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Products from './components/products/Products'
// import Single from './components/products/SingleProduct'




function App() {
  return (
   <section>
    <Navbar/>
    <Products/>
    {/* <Single></Single> */}
   </section>
  );
}

export default App;
