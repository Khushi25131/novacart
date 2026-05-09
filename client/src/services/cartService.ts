import api from "./api";

export const fetchCartFromServer = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const syncCartToServer = async (items: unknown[]) => {
  const response = await api.put("/cart", { items });
  return response.data;
};
