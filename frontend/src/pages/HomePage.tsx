import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center gap-5 font-bold text-xl">
        <p className="text-second-text">Something went wrong</p>
        <button
          className=" bg-primary text-white px-4 rounded-xl py-2 hover:bg-secondary active:scale-95 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </section>
  );
};

export default HomePage;
