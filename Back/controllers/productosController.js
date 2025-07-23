import { supabase } from '../supabaseClient.js';

export async function crearProducto(req, res) {
  const {
    codigo, marca, nombre_modelo, color, material_id,
    imagen_url, precio_compra, precio_venta, tallas
  } = req.body;

  const { data: producto, error: prodError } = await supabase
    .from('productos')
    .insert([{
      codigo, marca, nombre_modelo, color, material_id,
      imagen_url, precio_compra, precio_venta
    }])
    .select(); 

  if (prodError) return res.status(500).json({ error: prodError.message });

  const productoId = producto[0].id;
  const tallasData = tallas.map(t => ({
    producto_id: productoId,
    talla: t.talla,
    stock: t.stock
  }));

  const { error: tallasError } = await supabase
    .from('tallas_producto')
    .insert(tallasData);

  if (tallasError) return res.status(500).json({ error: tallasError.message });

  res.status(201).json({ producto, tallas: tallasData });
}

export async function listarProductos(req, res) {
  const { data: productos, error } = await supabase.from('productos').select('*');
  if (error) return res.status(500).json({ error: error.message });

  // Obtener tallas asociadas
  const { data: tallas, error: tallasError } = await supabase.from('tallas_producto').select('*');
  if (tallasError) return res.status(500).json({ error: tallasError.message });

  const productosConTallas = productos.map(p => ({
    ...p,
    tallas: tallas.filter(t => t.producto_id === p.id)
  }));

  res.json(productosConTallas);
}

export async function editarProducto(req, res) {
  const { id } = req.params;
  const cambios = req.body;
  const { data, error } = await supabase.from('productos').update(cambios).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function eliminarProducto(req, res) {
  const { id } = req.params;
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: 'Producto eliminado' });
}

