import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    // Dispatch logout first (clears auth.user), then clearCart.
    // The store subscriber won't overwrite the saved cart because user is already null.
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold tracking-tight">
          NovaCart
        </Link>

        <nav className="flex gap-8 items-center">
          <Link to="/" className="text-sm font-medium hover:text-slate-500 transition">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-slate-500 transition">
            Products
          </Link>

          <Link to="/cart" className="relative text-sm font-medium hover:text-slate-500 transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2.5 -right-4 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                Hi, <span className="font-semibold">{user?.name?.split(" ")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium hover:text-slate-500 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
