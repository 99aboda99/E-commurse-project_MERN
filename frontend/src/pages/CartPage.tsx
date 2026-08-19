import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
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

  return <Typography variant="h2">My Cart</Typography>;
};

export default CartPage;
