//purpose is to define the types of the product object and the product type
export interface Product {
    sku: string;
    name: string;
    price: number;
    imageUrl: string;
    type: "DVD" | "Book" | "Furniture";
    size?: number;
    weight?: number; 
    height?: number; 
    width?: number; 
    length?: number; 
  }
  
  export type ProductType = "DVD" | "Book" | "Furniture";