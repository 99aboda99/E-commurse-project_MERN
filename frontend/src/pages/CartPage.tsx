import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { cartItem, totalAmount, updateCartItem, deleteCartItem } = useCart();

  const handleSum = async ({ productId, quantity }) => {
    quantity += 1;
    await updateCartItem(productId, quantity);
  };

  const handleMinus = async ({ productId, quantity }) => {
    if (quantity === 1) deleteCartItem(productId);

    quantity -= 1;
    await updateCartItem(productId, quantity);
  };

  return (
    <div className="w-4/5 m-auto bg-white py-5 mt-20 rounded-xl">
      <h1 className="w-full text-center text-5xl">My Cart</h1>
      <br />
      {cartItem.map((item) => (
        <div className="flex flex-row justify-around items-center">
          <div className="w-1/3 flex flex-row items-center">
            <img className="w-50" src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
          <p>{item.unitPrice}</p>
          <div className=" w-1/7 bg-primary text-text rounded-xl flex flex-row justify-center text-center">
            <button
              className="w-1/3 border-r py-3 px-3 rounded-l-xl border-r-secondary cursor-pointer hover:bg-secondary transition-all duration-300"
              onClick={() =>
                handleSum({
                  productId: item.productId,
                  quantity: item.quantity,
                })
              }
            >
              +
            </button>
            <div className="w-1/3 py-3 my-auto">{item.quantity}</div>
            <button
              className="w-1/3 py-3 px-3 rounded-r-xl border-l border-l-secondary cursor-pointer hover:bg-secondary transition-all duration-300"
              onClick={() =>
                handleMinus({
                  productId: item.productId,
                  quantity: item.quantity,
                })
              }
            >
              -
            </button>
          </div>
          <button
            className="p-3 rounded-xl text-text bg-primary hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center"
            onClick={() => deleteCartItem(item.productId)}
            title="Remove Item"
            aria-label="Remove Item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
      {cartItem.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <img src="/empty-cart.png" alt="Your cart is empty" className="w-64 h-64 object-contain mb-4" />
          <p className="text-xl font-semibold text-gray-600">Your cart is empty</p>
        </div>
      )}
      {cartItem.length !== 0 && (
        <div className="font-bold text-2xl ml-5 mt-10">
          Total Amount: {totalAmount.toFixed(2)} EGP
        </div>
      )}
    </div>
  );
};

export default CartPage;
