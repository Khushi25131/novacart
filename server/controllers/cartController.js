import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const syncCart = async (req, res) => {
  try {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items },
      { upsert: true, new: true }
    );
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
