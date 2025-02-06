
import React, { createContext, useContext, useState } from "react";
import { Product } from "../types";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (sku: string, updatedProduct: Product) => void;
  deleteProducts: (skus: string[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const addProduct = (product: Product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (sku: string, updatedProduct: Product) => {
    const updatedProducts = products.map((p) => (p.sku === sku ? updatedProduct : p));
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProducts = (skus: string[]) => {
    const updatedProducts = products.filter((p) => !skus.includes(p.sku));
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};