import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { cartItem } = useCart();

  return(
    <div className="w-4/5 m-auto bg-white py-5 mt-5 rounded-xl">
      <div className="w-full text-center">My Cart</div>
      <br />
      {cartItem.map((item) => (
      <div>{item.title}</div>
      ))}
    </div>
  )
};

export default CartPage;
