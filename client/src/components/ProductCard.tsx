import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";
import type { Product } from "../types/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition duration-300 flex flex-col group"
    >
      <div className="overflow-hidden rounded-xl bg-slate-50">
        <img
          src={product.image}
          alt={product.title}
          className="h-52 w-full object-contain p-2 group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        <p className="text-xs text-slate-400 uppercase tracking-wide">
          {product.category}
        </p>
        <h2 className="mt-1 font-semibold line-clamp-2 text-sm leading-snug flex-1">
          {product.title}
        </h2>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-lg">₹ {product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-80 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
