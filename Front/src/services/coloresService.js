import axios from "axios";

const API = "http://localhost:3000/api/colores";

// Obtener todos los colores
export const getColores = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Crear un nuevo color
export const createColor = async (data) => {
  await axios.post(API, data);
};

// Editar un color existente por ID
export const updateColor = async (id, data) => {
  await axios.put(`${API}/${id}`, data);
};
