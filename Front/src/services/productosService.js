import axios from "axios";

const API = "http://localhost:3000/api/productos"; // Cambiar puerto si es necesario

export const getProductos = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createProducto = async (producto) => {
  await axios.post(API, producto);
};

export const deleteProducto = async (id) => {
  await axios.delete(`${API}/${id}`);
};
