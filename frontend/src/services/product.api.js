import API_BASE from "./api";

export const getProductsAPI = async (token) => {
  const res = await fetch(`${API_BASE}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};