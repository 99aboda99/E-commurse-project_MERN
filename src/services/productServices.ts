import productModel from "../models/productModel.js";

export const getAllProduct = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Dell Laptop",
      image:
        "https://m.media-amazon.com/images/I/61+9ew81AfL. AC_UF1000,1000_QL80 _. jpg",
      price: 15000,
      stock: 10,
    },
  ];

  const existingProduct = await getAllProduct();
  if (existingProduct.length === 0) {
    await productModel.insertMany(products);
  }
};
