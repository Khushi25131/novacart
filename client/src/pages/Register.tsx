import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { setCredentials } from "../redux/slices/authSlice";
import type { User } from "../types/user";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      dispatch(setCredentials({ user: data.user as User, token: data.token }));
      toast.success("Welcome to NovaCart!");
      navigate("/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || "Registration failed. Please try again.");
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
            Start your<br />journey today.
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join millions of shoppers and discover products you'll love.
          </p>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
              Free shipping on orders over ₹999
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
              Hassle-free 30-day returns
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
              Exclusive member-only discounts
            </li>
          </ul>
        </div>

        <p className="text-slate-600 text-sm">© 2025 NovaCart. All rights reserved.</p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h1 className="text-3xl font-bold mb-1">Create Account</h1>
            <p className="text-slate-500 mb-8">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

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
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
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
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
