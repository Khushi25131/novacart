const FAKESTORE_API = "https://fakestoreapi.com";

export const getAllProducts = async (req, res) => {
  try {
    const response = await fetch(`${FAKESTORE_API}/products`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${FAKESTORE_API}/products/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
