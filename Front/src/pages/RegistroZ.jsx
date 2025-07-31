import { useEffect, useState } from "react";
import {
  createProducto
} from "../services/productosService";
import { getMarcas } from "../services/marcasService";
import { getColores } from "../services/coloresService";
import { getMateriales } from "../services/materialesService";

const RegistroZ = () => {
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

    fetchExtras();
  }, []);

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducto(nuevoProducto);
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
    } catch (error) {
      console.error("Error al crear producto:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  const inputStyle = {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fdfdfd"
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{
        border: "1px solid #ccc",
        padding: "2rem 3rem",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "800px",
        width: "100%"
      }}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          Registrar nuevo producto
        </h2>

        <form onSubmit={handleSubmit} style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          alignItems: "center"
        }}>
          <label>Código del producto:</label>
          <input
            name="codigo"
            value={nuevoProducto.codigo}
            onChange={handleChange}
            placeholder="Ej: ZAP123"
            style={inputStyle}
          />

          <label>Marca:</label>
          <select
            name="marca_id"
            value={nuevoProducto.marca_id}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>

          <label>Nombre del producto:</label>
          <input
            name="modelo"
            value={nuevoProducto.modelo}
            onChange={handleChange}
            placeholder="Ej: Botín negro"
            style={inputStyle}
          />

          <label>Color:</label>
          <select name="color_id" value={nuevoProducto.color_id} onChange={handleChange} style={inputStyle}>
            <option value="">Seleccionar Color</option>
            {colores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>

          <label>Material:</label>
          <select name="material_id" value={nuevoProducto.material_id} onChange={handleChange} style={inputStyle}>
            <option value="">Seleccionar material</option>
            {materiales.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <label>Imagen del producto:</label>
          <input
            name="imagen_url"
            value={nuevoProducto.imagen_url}
            onChange={handleChange}
            placeholder="https://..."
            style={inputStyle}
          />

          <label>Precio de compra:</label>
          <input
            name="precio_compra"
            value={nuevoProducto.precio_compra}
            onChange={handleChange}
            placeholder="Ingresar precio de compra"
            type="number"
            style={inputStyle}
          />

          <label>Precio de venta:</label>
          <input
            name="precio_venta"
            value={nuevoProducto.precio_venta}
            onChange={handleChange}
            placeholder="Ingresar precio de venta"
            type="number"
            style={inputStyle}
          />

          {/* Botón en fila completa */}
          <div style={{ gridColumn: "1 / span 2", textAlign: "center", marginTop: "1rem" }}>
            <button type="submit" style={{
              padding: "0.6rem 1.5rem",
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold"
            }}>
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroZ;
