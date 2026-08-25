import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

//FC =React.FunctionComponent
const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [_error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          //We must add user token to continue and add "Bearer" before token
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed To fetch User Cart, Please try again");
      }

      const cart = await response.json();

      const cartItemMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        }),
      );

      setCartItem(cartItemMapped);
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add item to cart");
        return;
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to fetch cart");
        return;
      }

      const cartItemMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        }),
      );

      setCartItem([...cartItemMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("Failed to update item from cart");
        return;
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to fetch cart");
        return;
      }

      const cartItemMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        }),
      );

      setCartItem([...cartItemMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCartItem = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to delete item from cart");
        return;
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to fetch cart");
        return;
      }

      const cartItemMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        }),
      );

      setCartItem([...cartItemMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to empty cart");
        return;
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to fetch cart");
        return;
      }

      setCartItem([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItem,
        totalAmount,
        addItemToCart,
        updateCartItem,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
