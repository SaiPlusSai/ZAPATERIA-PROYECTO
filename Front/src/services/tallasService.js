import axios from "axios";

const API = "http://localhost:3000/api/tallas";

// Agrega varias tallas a un producto
export const agregarTallas = async ({ producto_id, tallas }) => {
  await axios.post(API, { producto_id, tallas });
};

// Obtiene las tallas de un producto específico
export const getTallasDeProducto = async (productoId) => {
  const res = await axios.get(`${API}/${productoId}`);
  return res.data;
};

// Edita una talla específica
export const editarTalla = async (id, cambios) => {
  await axios.put(`${API}/${id}`, cambios);
};
