import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const MyOrderPage = () => {
  const { myOrder, getMyOrder } = useAuth();

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <main className="w-full min-h-[calc(100vh-4.5rem)] py-6 sm:py-10 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white py-6 sm:py-8 px-4 sm:px-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-6">My Orders</h1>
        <div className="flex flex-col gap-6">
          {myOrder.map(({ _id, orderItems, address, totalAmount }) => (
            <section key={_id} className="border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 bg-gray-50/50">
              <div className="flex flex-row justify-between items-center pb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Order ID</span>
                <span className="text-xs sm:text-sm font-mono text-gray-500 bg-gray-200/60 px-2.5 py-1 rounded-md">
                  #{_id.slice(-8)}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {orderItems.map(({ productImage, productTitle, quantity }, index) => (
                  <div key={index} className="flex flex-row justify-between items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                    <div className="flex flex-row items-center gap-3">
                      <img
                        src={productImage}
                        alt={productTitle}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-md shrink-0 bg-gray-50 p-1"
                      />
                      <p className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2">{productTitle}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 shrink-0 bg-gray-100 px-2.5 py-1 rounded-lg">
                      Qty: {quantity}
                    </span>
                  </div>
                ))}
                <div className="mt-2 pt-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm sm:text-base">
                  <p className="text-gray-600 font-medium truncate">
                    <span className="text-gray-500">Address:</span> {address}
                  </p>
                  <p className="font-bold text-gray-900 shrink-0">
                    Total: <span className="text-primary">{totalAmount.toFixed(2)} EGP</span>
                  </p>
                </div>
              </div>
            </section>
          ))}
          {myOrder.length === 0 && (
            <p className="text-center text-gray-500 py-8">No orders found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyOrderPage;
