import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
} from "../redux/store";

import {

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,

} from "../redux/slices/cartSlice";

const Cart = () => {

  const dispatch =
  useDispatch();

  const cartItems =
  useSelector(

    (
      state: RootState
    ) => state.cart.items

  );

  const totalPrice =
  cartItems.reduce(

    (acc, item) =>

      acc +
      item.price *
      item.quantity,

    0

  );

  if (
    cartItems.length === 0
  ) {

    return (

      <div className="text-center py-20">

        <h1 className="text-4xl font-bold">
          Your cart is empty
        </h1>

      </div>

    );
  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="space-y-6">

        {cartItems.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow flex flex-col md:flex-row gap-6 items-center"
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-32 w-32 object-contain"
            />

            <div className="flex-1">

              <h2 className="font-bold text-xl">
                {item.title}
              </h2>

              <p className="text-slate-500 mt-2">
                ₹ {item.price}
              </p>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  dispatch(
                    decreaseQuantity(
                      item.id
                    )
                  )
                }
                className="bg-slate-200 px-4 py-2 rounded-lg"
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    increaseQuantity(
                      item.id
                    )
                  )
                }
                className="bg-slate-200 px-4 py-2 rounded-lg"
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                dispatch(
                  removeFromCart(
                    item.id
                  )
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      <div className="mt-10 flex justify-between items-center">

        <h2 className="text-3xl font-bold">
          Total: ₹ {totalPrice.toFixed(2)}
        </h2>

        <button className="bg-black text-white px-8 py-4 rounded-xl">
          Proceed To Checkout
        </button>

      </div>

    </div>
  );
};

export default Cart;