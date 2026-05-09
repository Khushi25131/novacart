import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";
import { getAllProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.slice(0, 8)))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="bg-black text-white px-6 py-28 text-center">
        <p className="text-slate-400 uppercase tracking-widest text-sm mb-4">
          New Season Arrivals
        </p>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Shop the Best.<br />Live the Best.
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Discover premium products across fashion, electronics, jewellery and more — all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Shop Now
          </Link>
          <Link
            to="/register"
            className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Join Free
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">20+</p>
            <p className="text-slate-400 text-sm mt-1">Product Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Free</p>
            <p className="text-slate-400 text-sm mt-1">Shipping over ₹999</p>
          </div>
          <div>
            <p className="text-2xl font-bold">30-Day</p>
            <p className="text-slate-400 text-sm mt-1">Easy Returns</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
              Hand-picked
            </p>
            <h2 className="text-3xl font-bold">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow animate-pulse">
                <div className="h-52 bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="mx-6 mb-16 bg-black text-white rounded-3xl px-10 py-14 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2">Ready to start shopping?</h3>
          <p className="text-slate-400">Create a free account and get exclusive deals.</p>
        </div>
        <Link
          to="/register"
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold whitespace-nowrap hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
