import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  deleteProducto,
} from "../services/productosService";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: "",
    marca_id: "",
    modelo: "",
    color_id: "",
    material_id: "",
    imagen_url: "",
    precio_compra: "",
    precio_venta: ""
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await createProducto(nuevoProducto);
    console.log("Producto creado:", res?.data);
    alert("Producto creado con éxito");
    setNuevoProducto({
      codigo: "",
      marca_id: "",
      modelo: "",
      color_id: "",
      material_id: "",
      imagen_url: "",
      precio_compra: "",
      precio_venta: ""
    });
    fetchProductos();
  } catch (error) {
    console.error("Error al crear producto:", error.response?.data || error.message);
    alert("Error al crear producto: " + (error.response?.data?.error || error.message));
  }
};


  const handleDelete = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Productos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
        <input type="text" name="codigo" placeholder="Código" value={nuevoProducto.codigo} onChange={handleChange} />
        <input type="text" name="marca_id" placeholder="Marca ID" value={nuevoProducto.marca_id} onChange={handleChange} />
        <input type="text" name="modelo" placeholder="Modelo" value={nuevoProducto.modelo} onChange={handleChange} />
        <input type="text" name="color_id" placeholder="Color ID" value={nuevoProducto.color_id} onChange={handleChange} />
        <input type="text" name="material_id" placeholder="Material ID" value={nuevoProducto.material_id} onChange={handleChange} />
        <input type="text" name="imagen_url" placeholder="Imagen URL" value={nuevoProducto.imagen_url} onChange={handleChange} />
        <input type="number" name="precio_compra" placeholder="Precio de Compra" value={nuevoProducto.precio_compra} onChange={handleChange} />
        <input type="number" name="precio_venta" placeholder="Precio de Venta" value={nuevoProducto.precio_venta} onChange={handleChange} />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.modelo} (código: {prod.codigo}) - Bs. {prod.precio_venta}
            <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: "1rem" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosPage;
