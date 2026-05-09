import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import type { RootState } from "./redux/store";
import { loadCart } from "./redux/slices/cartSlice";
import { fetchCartFromServer } from "./services/cartService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // On page reload, restore cart from server if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartFromServer()
        .then((items) => dispatch(loadCart(items)))
        .catch(console.error);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
