import { type ICartItem, cartModel } from "../models/cartModel.js";
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

//*Make one cart for user only if user doesn't have an active one
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

//*Add items to current cart
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
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
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

//* Update item in current cart
interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existedItem = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId,
  );

  if (!existedItem) {
    return { data: "Item doesn't exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }

  //Calculate the total amount
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId,
  );

  let total = calculateTotalAmount({ cartItems: otherCartItems });

  existedItem.quantity = quantity;
  total += existedItem.quantity * existedItem.unitPrice;

  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

//* Clear the current active cart
interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

//* Delete item from cart
interface DeleteItemFromCart {
  userId: string;
  productId: any;
}

export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemFromCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existedItem = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId,
  );
  if (!existedItem) {
    return { data: "Item doesn't exist in cart", statusCode: 400 };
  }

  //Set the cart items to all items except the one to be deleted
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId,
  );

  cart.items = otherCartItems;

  //Calculate the total amount

  cart.totalAmount = calculateTotalAmount({ cartItems: otherCartItems });

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

const calculateTotalAmount = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, item) => {
    sum += item.quantity * item.unitPrice;
    return sum;
  }, 0);
  return total;
};
