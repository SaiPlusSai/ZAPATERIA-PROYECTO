import { supabase } from '../supabaseClient.js';

export async function crearColor(req, res) {
  const { nombre } = req.body;
  const { data, error } = await supabase.from('colores').insert([{ nombre }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}


export async function listarColores(req, res) {
  const { data, error } = await supabase.from('colores').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
