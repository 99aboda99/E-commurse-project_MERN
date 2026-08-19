import { useCart } from "../context/Cart/CartContext";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ _id, title, price, image }: ProductCardProps) => {
  const { addItemToCart } = useCart();

  return (
    <div className="flex-1 grow shrink min-w-55 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.75rem)] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group border border-gray-100">
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col grow justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-base sm:text-lg font-semibold text-second-text line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-lg sm:text-xl font-bold text-primary">
            {price} EGP
          </p>
        </div>

        <button
          onClick={() => addItemToCart(_id)}
          className="w-full bg-primary text-white py-2.5 px-4 rounded-xl font-medium text-sm sm:text-base hover:bg-secondary active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
