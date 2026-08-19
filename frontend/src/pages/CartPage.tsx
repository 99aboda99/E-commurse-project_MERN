import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { addItemToCart, cartItem } = useCart();
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");

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

      const data = await response.json();

      setCart(data);
    };

    fetchCart();
  }, [token]);

  console.log(cart);

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
