import { useEffect, useState } from "react";
import {
  getProductos,
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

  const [productoEditando, setProductoEditando] = useState(null);
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
    alert("🚧 Edición aún no implementada en backend (PUT)");
    setProductoEditando(null);
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
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    await deleteProducto(id);
    fetchProductos();
  };

  const iniciarEdicion = (producto) => {
    setProductoEditando(producto);
    setNuevoProducto({ ...producto });
  };

  const cancelarEdicion = () => {
    setProductoEditando(null);
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
  };

  const getNombre = (id, lista) => {
    const item = lista.find((el) => el.id === id);
    return item?.nombre || "N/A";
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#1f2937" }}>Productos registrados</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem"
      }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1rem",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <img
              src={prod.imagen_url || "https://via.placeholder.com/250"}
              alt={prod.modelo}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
            />
            <h3 style={{ margin: "0.5rem 0", color: "#111827" }}>{prod.modelo}</h3>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>Código: {prod.codigo}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>Marca: {getNombre(prod.marca_id, marcas)}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>Color: {getNombre(prod.color_id, colores)}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>Material: {getNombre(prod.material_id, materiales)}</p>
            <p style={{ fontWeight: "bold", marginTop: "0.3rem", color: "#16a34a" }}>Precio Bs: {prod.precio_venta}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.7rem", justifyContent: "center" }}>
              <button
                onClick={() => handleDelete(prod.id)}
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "5px"
                }}
              >❌</button>
              <button
                onClick={() => iniciarEdicion(prod)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "5px"
                }}
              >✏️</button>
            </div>
          </div>
        ))}
      </div>

      {productoEditando && (
        <form onSubmit={handleSubmit} style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "white",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Editar Producto</h3>
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

          <button type="submit">Actualizar Producto</button>
          <button onClick={cancelarEdicion} type="button">Cancelar edición</button>
        </form>
      )}
    </div>
  );
};

export default ProductosPage;
