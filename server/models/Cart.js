import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  rating: { rate: Number, count: Number },
  quantity: { type: Number, default: 1 },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
