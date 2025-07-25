import { supabase } from '../supabaseClient.js';

export async function crearMaterial(req, res) {
  const { nombre } = req.body;
  const { data, error } = await supabase.from('materiales').insert([{ nombre }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}

export async function listarMateriales(req, res) {
  const { data, error } = await supabase.from('materiales').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
export async function editarMaterial(req, res) {
  const { id } = req.params; // id del material a editar
  const { nombre } = req.body;
  const { data, error } = await supabase
    .from('materiales')
    .update({ nombre })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}