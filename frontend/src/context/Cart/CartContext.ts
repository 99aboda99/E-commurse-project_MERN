import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItem: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  deleteCartItem: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItem: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateCartItem: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
