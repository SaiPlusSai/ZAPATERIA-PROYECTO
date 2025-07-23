import { supabase } from '../supabaseClient.js';

// ✅ Crear una nueva marca
export async function crearMarca(req, res) {
  const { nombre } = req.body;
  const { data, error } = await supabase.from('marcas').insert([{ nombre }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}

// ✅ Listar marcas
export async function listarMarcas(req, res) {
  const { data, error } = await supabase.from('marcas').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
