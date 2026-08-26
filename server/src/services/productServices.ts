import productModel from "../models/productModel.js";

export const getAllProduct = async () => {
  
  return { data: await productModel.find(), statusCode: 200 };
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image:
          "https://m.media-amazon.com/images/I/61+9ew81AfL.AC_UF1000,1000_QL80_.jpg",
        price: 15000,
        stock: 10,
      },
      {
        title: "HP Laptop",
        image:
          "https://i5.walmartimages.com/seo/HP-Laptop-15-dw0054wm-Intel-Core-i5-8265U-3-9-GHz-Win-10-Home-64-bit-UHD-Graphics-620-8-GB-RAM-256-GB-SSD-NVMe-15-6-IPS-1366-x-768-HD-Ethernet-Fast-E_18946f0d-08c6-4cee-95a9-0d9e6673551d_2.25fb509f76f829f3165a24f0a3966fec.jpeg",
        price: 20000,
        stock: 10,
      },
      {
        title: "Samsung Galaxy Book",
        image:
          "https://m.media-amazon.com/images/I/518Hl4n-60S._AC_UF894,1000_QL80_.jpg",
        price: 25000,
        stock: 10,
      },
    ];
    const { data: existingProduct } = await getAllProduct();
    if (existingProduct.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error(error);
  }
};
