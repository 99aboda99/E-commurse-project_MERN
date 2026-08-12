import type { ObjectId } from "mongoose";
import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Check if item already exists
  const existedItem = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId,
  );
  //* The parameter in find() function refers to interface -ICartItem-

  if (existedItem) {
    return { data: "Item already exists in the cart!", statusCode: 400 };
  }

  //Fetch product data
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  };

  if(product.stock < quantity) {
    return {data: "Low stock for items", statusCode: 400}
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  //* Sync totalAmount

  cart.totalAmount += product.price * 2;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
