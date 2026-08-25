import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItem, totalAmount, updateCartItem, deleteCartItem, clearCart } =
    useCart();

  const handleSum = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    quantity += 1;
    await updateCartItem(productId, quantity);
  };

  const handleMinus = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    if (quantity === 1) deleteCartItem(productId);

    quantity -= 1;
    await updateCartItem(productId, quantity);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white py-6 px-4 sm:px-8 my-6 sm:my-12 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-row items-center justify-between pb-4 sm:pb-6 border-b border-gray-100 mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">My Cart</h1>
        {cartItem.length > 0 && (
          <button
            className="bg-red-500 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium hover:bg-red-600 transition-all duration-300 shadow-sm cursor-pointer"
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {cartItem.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/50"
          >
            <div className="flex flex-row items-center gap-4 w-full sm:w-1/2">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shrink-0 bg-white p-1"
                src={item.image}
                alt={item.title}
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                  {item.title}
                </p>
                <p className="text-primary font-bold text-sm sm:hidden mt-1">
                  {item.unitPrice} EGP
                </p>
              </div>
            </div>

            <p className="hidden sm:block font-bold text-primary text-base sm:text-lg shrink-0">
              {item.unitPrice} EGP
            </p>

            <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-4">
              <div className="bg-primary text-white rounded-xl flex flex-row items-center justify-center text-center overflow-hidden shrink-0">
                <button
                  className="px-3 py-1.5 hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-sm sm:text-base"
                  onClick={() =>
                    handleSum({
                      productId: item.productId,
                      quantity: item.quantity,
                    })
                  }
                >
                  +
                </button>
                <div className="px-3 py-1.5 font-medium text-sm sm:text-base min-w-[2rem] text-center">
                  {item.quantity}
                </div>
                <button
                  className="px-3 py-1.5 hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-sm sm:text-base"
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
                className="p-2.5 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all duration-300 cursor-pointer shrink-0"
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
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItem.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <img
            src="/empty-cart.png"
            alt="Your cart is empty"
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4"
          />
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            Your cart is empty
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 mt-6 gap-4">
          <div className="font-bold text-xl sm:text-2xl text-gray-800 text-center sm:text-left">
            Total Amount: {totalAmount.toFixed(2)} EGP
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full sm:w-auto bg-primary text-white py-3 px-8 rounded-xl font-semibold hover:bg-secondary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md text-center"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
