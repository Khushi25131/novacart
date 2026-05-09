import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { syncCartToServer } from "../services/cartService";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// Sync cart to server (debounced so rapid clicks don't flood the API)
let syncTimer: ReturnType<typeof setTimeout>;

store.subscribe(() => {
  const { auth, cart } = store.getState();
  if (!auth.isAuthenticated) return;

  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncCartToServer(cart.items).catch(console.error);
  }, 600);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
