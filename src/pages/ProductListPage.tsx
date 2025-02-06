
import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ProductListPage: React.FC = () => {
  const { products, deleteProducts } = useProductContext();
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  const handleCheckboxChange = (sku: string) => {
    setSelectedSkus((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  };

  const handleMassDelete = () => {
    deleteProducts(selectedSkus);
    setSelectedSkus([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex justify-between mb-4">
        <Link to="/new-product" className="bg-blue-500 text-white px-4 py-2 rounded">
          ADD
        </Link>
        <button
          onClick={handleMassDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          MASS DELETE
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.sku} className="border p-4 rounded">
            <input
              type="checkbox"
              checked={selectedSkus.includes(product.sku)}
              onChange={() => handleCheckboxChange(product.sku)}
            />
            <h2 className="text-xl font-semibold">
              <a href={product.imageUrl} target="_blank" rel="noopener noreferrer">
                {product.name}
              </a>
            </h2>
            <p>Price: ${product.price}</p>
            {product.type === "DVD" && <p>Size: {product.size} MB</p>}
            {product.type === "Book" && <p>Weight: {product.weight} Kg</p>}
            {product.type === "Furniture" && (
              <p>Dimensions: {product.height}x{product.width}x{product.length}</p>
            )}
            <Link to={`/edit-product/${product.sku}`} className="text-blue-500">
              EDIT
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;