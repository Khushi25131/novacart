import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import SearchBar from "../components/SearchBar";

import type { Product } from "../types/product";

import { getAllProducts } from "../services/productService";

const Products = () => {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data =
          await getAllProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  const filteredProducts =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) {
    return (
      <h1 className="text-center py-20 text-2xl">
        Loading products...
      </h1>
    );
  }

  return (
    <div className="px-6 py-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <h1 className="text-4xl font-bold">
          All Products
        </h1>

        <div className="w-full md:w-[400px]">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

      </div>

      {filteredProducts.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            No products found
          </h2>

          <p className="text-slate-500 mt-2">
            Try searching something else.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Products;