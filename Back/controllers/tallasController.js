import { supabase } from '../supabaseClient.js';


export async function agregarTallas(req, res) {
  const { producto_id, tallas } = req.body;
 
  const dataToInsert = tallas.map(t => ({
    producto_id,
    talla: t.talla,
    stock: t.stock
  }));

  const { data, error } = await supabase
    .from('tallas_producto')
    .insert(dataToInsert);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}


export async function listarTallasDeProducto(req, res) {
  const { productoId } = req.params;

  const { data, error } = await supabase
    .from('tallas_producto')
    .select('*')
    .eq('producto_id', productoId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}


export async function editarTalla(req, res) {
  const { id } = req.params;
  const cambios = req.body; 

  const { data, error } = await supabase
    .from('tallas_producto')
    .update(cambios)
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

