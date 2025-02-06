// src/pages/AddEditProductPage.tsx
import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import { Product, ProductType } from "../types";

const AddEditProductPage: React.FC = () => {
  const { sku } = useParams<{ sku?: string }>();
  const { products, addProduct, editProduct } = useProductContext();
  const navigate = useNavigate();

  const isEditMode = !!sku;
  const product = isEditMode ? products.find((p) => p.sku === sku) : null;

  const [formData, setFormData] = useState<Product>({
    sku: product?.sku || "",
    name: product?.name || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    type: product?.type || "DVD",
    size: product?.size || 0,
    weight: product?.weight || 0,
    height: product?.height || 0,
    width: product?.width || 0,
    length: product?.length || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      editProduct(sku, formData);
    } else {
      addProduct(formData);
    }
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        {formData.type === "DVD" && (
          <div>
            <label>Size (MB)</label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {formData.type === "Book" && (
          <div>
            <label>Weight (Kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {formData.type === "Furniture" && (
          <div>
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
            <label>Width</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              required
            />
            <label>Length</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditProductPage;