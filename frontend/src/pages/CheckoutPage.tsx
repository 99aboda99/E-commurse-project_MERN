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
      <div className="w-full max-w-2xl mx-auto bg-white py-8 sm:py-12 px-4 sm:px-8 my-8 sm:my-16 rounded-2xl shadow-md text-center border border-gray-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Thank you for your purchase. Redirecting to home page...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white py-6 sm:py-8 px-4 sm:px-8 my-6 sm:my-12 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl sm:text-4xl font-bold text-left text-gray-900 mb-6 pb-4 border-b border-gray-100">
        Checkout
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Delivery Address Box */}
      <fieldset className="border border-gray-300 rounded-xl p-3 mb-6 w-full focus-within:border-blue-500 transition-colors">
        <legend className="px-2 text-xs sm:text-sm text-gray-500 font-medium">
          Delivery Address
        </legend>
        <input
          type="text"
          ref={addressRef}
          placeholder="Enter delivery address"
          className="w-full px-2 py-1 outline-none text-gray-800 text-sm sm:text-base"
        />
      </fieldset>

      {/* Cart Summary Box */}
      <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6 w-full bg-gray-50/50">
        <div className="flex flex-col gap-4">
          {cartItem.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2 border-b border-gray-100 last:border-b-0 pb-3 sm:pb-2"
            >
              <div className="flex flex-row items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-md bg-white p-1 shrink-0"
                />
                <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
              </div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold self-end sm:self-auto shrink-0">
                {item.quantity} x {item.unitPrice} EGP
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 text-right text-base sm:text-lg text-gray-900 font-bold">
          Total Amount: {totalAmount.toFixed(2)} EGP
        </div>
      </div>

      {/* PAY NOW Button */}
      <button
        onClick={handlePayNow}
        disabled={cartItem.length === 0}
        className="w-full py-3.5 bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-semibold text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
