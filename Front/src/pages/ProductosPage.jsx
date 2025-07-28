import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  deleteProducto,
} from "../services/productosService";
import { getMarcas } from "../services/marcasService";
import { getColores } from "../services/coloresService";
import { getMateriales } from "../services/materialesService";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [colores, setColores] = useState([]);
  const [materiales, setMateriales] = useState([]);

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
    fetchExtras();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const fetchExtras = async () => {
    const [marcasData, coloresData, materialesData] = await Promise.all([
      getMarcas(),
      getColores(),
      getMateriales()
    ]);
    setMarcas(marcasData);
    setColores(coloresData);
    setMateriales(materialesData);
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
      <form onSubmit={handleSubmit} style={{
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "400px"
      }}>
        <input type="text" name="codigo" placeholder="Código" value={nuevoProducto.codigo} onChange={handleChange} />
        
        <select name="marca_id" value={nuevoProducto.marca_id} onChange={handleChange}>
          <option value="">Seleccione una marca</option>
          {marcas.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>

        <input type="text" name="modelo" placeholder="Modelo" value={nuevoProducto.modelo} onChange={handleChange} />
        
        <select name="color_id" value={nuevoProducto.color_id} onChange={handleChange}>
          <option value="">Seleccione un color</option>
          {colores.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select name="material_id" value={nuevoProducto.material_id} onChange={handleChange}>
          <option value="">Seleccione un material</option>
          {materiales.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>

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
