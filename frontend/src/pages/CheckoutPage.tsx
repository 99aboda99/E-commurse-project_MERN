import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartItem, totalAmount, clearCart } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayNow = async () => {
    if (!addressRef.current?.value.trim()) {
      setError("Please enter your delivery address");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: addressRef.current?.value }),
      });

      if (!response.ok) {
        setError("Checkout failed. Please try again.");
        return;
      }

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong during checkout.");
    }
  };

  if (success) {
    return (
      <div className="w-4/5 max-w-3xl m-auto bg-white py-12 px-8 mt-20 rounded-2xl shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center m-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Redirecting to home page...
        </p>
      </div>
    );
  }

  return (
    <div className="w-4/5 max-w-3xl m-auto bg-white py-8 px-10 mt-20 rounded-xl">
      <h1 className="text-4xl font-normal text-left text-gray-900 mb-6">
        Checkout
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Delivery Address Box */}
      <fieldset className="border border-gray-300 rounded-lg p-3 mb-6 w-full focus-within:border-blue-500 transition-colors">
        <legend className="px-2 text-sm text-gray-500 font-medium">
          Delivery Address
        </legend>
        <input
          type="text"
          ref={addressRef}
          placeholder="Enter delivery address"
          className="w-full px-2 py-1 outline-none text-gray-800 text-base"
        />
      </fieldset>

      {/* Cart Summary Box */}
      <div className="border border-gray-200 rounded-2xl p-6 mb-6 w-full bg-white">
        <div className="flex flex-col gap-4">
          {cartItem.map((item) => (
            <div
              key={item.productId}
              className="flex flex-row justify-between items-center py-2"
            >
              <div className="flex flex-row items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain rounded-md"
                />
                <p className="text-lg font-normal text-gray-800">
                  {item.title}
                </p>
              </div>
              <div className="text-base text-gray-700 font-normal">
                {item.quantity} x {item.unitPrice} EGP
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-4 pt-4 text-right text-lg text-gray-800 font-normal">
          Total Amount: {totalAmount.toFixed(2)} EGP
        </div>
      </div>

      {/* PAY NOW Button */}
      <button
        onClick={handlePayNow}
        disabled={cartItem.length === 0}
        className="w-full py-3.5 bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-medium text-base tracking-wider uppercase rounded-lg transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
