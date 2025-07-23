import { supabase } from '../supabaseClient.js';


export async function crearMarca(req, res) {
  const { nombre } = req.body;
  const { data, error } = await supabase.from('marcas').insert([{ nombre }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}

export async function listarMarcas(req, res) {
  const { data, error } = await supabase.from('marcas').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
export async function editarMarca(req, res) {
  const { id } = req.params; // id de la marca a editar
  const { nombre } = req.body;
  const { data, error } = await supabase
    .from('marcas')
    .update({ nombre })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}