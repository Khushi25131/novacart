import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { addToCart } from "../redux/slices/cartSlice";

import type { Product } from "../types/product";

import { getSingleProduct } from "../services/productService";

const ProductDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        if (!id) return;

        const data =
          await getSingleProduct(id);

        setProduct(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);

  if (loading) {

    return (
      <h1 className="text-center py-20 text-2xl">
        Loading product...
      </h1>
    );
  }

  if (!product) {

    return (
      <h1 className="text-center py-20 text-2xl">
        Product not found
      </h1>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="bg-white rounded-2xl p-10 shadow">

          <img
            src={product.image}
            alt={product.title}
            className="h-[450px] w-full object-contain"
          />

        </div>

        <div>

          <p className="text-slate-500 uppercase tracking-wide">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-4">
            {product.title}
          </h1>

          <p className="mt-6 text-slate-600 leading-8">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">

            <span className="text-4xl font-bold">
              ₹ {product.price}
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
              ⭐ {product.rating.rate}
            </span>

          </div>

          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success("Added to cart!");
            }}
            className="mt-10 bg-black text-white px-8 py-4 rounded-xl hover:opacity-90 transition"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;