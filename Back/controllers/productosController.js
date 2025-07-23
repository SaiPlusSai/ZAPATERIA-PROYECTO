import { supabase } from '../supabaseClient.js';

export async function crearProducto(req, res) {
  const {
    codigo, marca_id, modelo, color_id, material_id,
    imagen_url, precio_compra, precio_venta
  } = req.body;

  const { data: producto, error: prodError } = await supabase
    .from('productos')
    .insert([{
      codigo,
      marca_id,
      modelo,
      color_id,
      material_id,
      imagen_url,
      precio_compra,
      precio_venta
    }])
    .select();

  if (prodError) return res.status(500).json({ error: prodError.message });

  res.status(201).json(producto[0]);
}

export async function listarProductos(req, res) {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function editarProducto(req, res) {
  const { id } = req.params;
  const cambios = req.body;

  const { data, error } = await supabase
    .from('productos')
    .update(cambios)
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function eliminarProducto(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('productos')
    .update({ activo: false })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: 'Producto marcado como inactivo', data });
}


export async function restaurarProducto(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('productos')
    .update({ activo: true })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: 'Producto restaurado', data });
}
