import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Compare from './Compare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components/:id" element={<ProductDetail />} />
        <Route path="/compare/:id1/:id2" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
