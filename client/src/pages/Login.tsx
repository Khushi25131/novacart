import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { setCredentials } from "../redux/slices/authSlice";
import { loadCart } from "../redux/slices/cartSlice";
import { fetchCartFromServer } from "../services/cartService";
import type { User } from "../types/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      dispatch(setCredentials({ user: data.user as User, token: data.token }));

      // Fetch this user's cart from the database
      const cartItems = await fetchCartFromServer();
      dispatch(loadCart(cartItems));

      toast.success(`Welcome back, ${data.user.name}!`);
      navigate("/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-between p-16">
        <Link to="/" className="text-2xl font-bold">NovaCart</Link>

        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Good to see<br />you again.
          </h2>
          <p className="text-slate-400 text-lg">
            Sign in and pick up right where you left off — your cart is waiting.
          </p>
        </div>

        <p className="text-slate-600 text-sm">© 2025 NovaCart. All rights reserved.</p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h1 className="text-3xl font-bold mb-1">Sign In</h1>
            <p className="text-slate-500 mb-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-black font-semibold hover:underline">
                Sign up
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Password</label>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
