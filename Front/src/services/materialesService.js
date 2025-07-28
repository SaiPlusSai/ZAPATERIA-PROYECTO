import axios from "axios";

const API = "http://localhost:3000/api/materiales";

// Obtener todos los materiales
export const getMateriales = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Crear un nuevo material
export const createMaterial = async (data) => {
  await axios.post(API, data);
};

// Editar un material existente
export const updateMaterial = async (id, data) => {
  await axios.put(`${API}/${id}`, data);
};
