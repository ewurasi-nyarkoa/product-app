
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import AddEditProductPage from "../pages/AddEditProductPage";
import { ProductProvider } from "../context/ProductContext";

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/new-product" element={<AddEditProductPage />} />
          <Route path="/edit-product/:sku" element={<AddEditProductPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;