import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const MyOrderPage = () => {
  const { myOrder, getMyOrder } = useAuth();

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <main className="flex flex-row items-center justify-center w-full h-full">
      <div className="m-auto w-3/5 py-5 mt-20 bg-white rounded-xl">
        <h1 className="text-5xl text-center">My Order</h1>
        <hr className="w-3/4 mx-auto mt-8 mb-2.5" />
        <div className="w-3/4 mx-auto flex flex-col gap-5">
          {myOrder.map(({ _id, orderItems, address, totalAmount }) => (
            <section className="px-3.5 py-1.5 border border-gray-500/50 rounded-xl flex flex-col">
              <p className="text-center">Order num. # {_id.slice(19)}</p>
              <div>
                {orderItems.map(({ productImage, productTitle, quantity }) => (
                  <div className="flex flex-row justify-around items-center">
                    <img
                      src={productImage}
                      alt={productTitle}
                      className="h-14"
                    />
                    <p>{productTitle}</p>
                    <p>Quantity: {quantity}</p>
                  </div>
                ))}
                <div className="mt-5 flex flex-row justify-around">
                  <p>Address: {address}</p>
                  <p>Total Amount: {totalAmount.toFixed(2)} EGP</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyOrderPage;
