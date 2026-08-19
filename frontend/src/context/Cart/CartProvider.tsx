import { type FC, type PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";

//FC =React.FunctionComponent
const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const[cartItem, setCartItem] = useState<CartItem[]>([])
    const[totalAmount, setTotalAmount] = useState<number>(0)

    const addItemToCart = (productId: string) =>{
        console.log(productId)
    }
  return (
    <CartContext.Provider
      value={{cartItem, totalAmount, addItemToCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
