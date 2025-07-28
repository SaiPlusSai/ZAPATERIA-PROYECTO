import axios from "axios";

const API = "http://localhost:3000/api/marcas";

// Obtener todas las marcas
export const getMarcas = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Crear una nueva marca
export const createMarca = async (data) => {
  await axios.post(API, data);
};

// Editar una marca existente
export const updateMarca = async (id, data) => {
  await axios.put(`${API}/${id}`, data);
};
