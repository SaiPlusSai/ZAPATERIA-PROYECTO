import { useEffect, useState } from "react";
import {
  agregarTallas,
  getTallasDeProducto,
  editarTalla,
} from "../services/tallasService";
import { getProductos } from "../services/productosService"; // 👈 nuevo import

const TallasPage = () => {
  const [productos, setProductos] = useState([]); // 👈 nuevo estado
  const [productoId, setProductoId] = useState("");
  const [tallas, setTallas] = useState([]);
  const [nuevasTallas, setNuevasTallas] = useState([{ talla: "", stock: "" }]);

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  // Obtener tallas cuando se seleccione producto
  useEffect(() => {
    if (productoId) fetchTallas();
  }, [productoId]);

  const fetchTallas = async () => {
    const data = await getTallasDeProducto(productoId);
    setTallas(data);
  };

  const handleAddInput = () => {
    setNuevasTallas([...nuevasTallas, { talla: "", stock: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...nuevasTallas];
    updated[index][field] = value;
    setNuevasTallas(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await agregarTallas({ producto_id: productoId, tallas: nuevasTallas });
    setNuevasTallas([{ talla: "", stock: "" }]);
    fetchTallas();
  };

  const handleEditarTalla = async (id, field, value) => {
    await editarTalla(id, { [field]: value });
    fetchTallas();
  };

  const inputStyle = {
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fdfdfd"
};

const buttonStyle = {
  padding: "0.4rem 1rem",
  backgroundColor: "#111827",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer"
};


  // return (
  //   <div style={{ padding: "1rem" }}>
  //     <h2>Tallas por Producto</h2>

  //     <div style={{ marginBottom: "1rem" }}>
  //       <select
  //         value={productoId}
  //         onChange={(e) => setProductoId(e.target.value)}
  //       >
  //         <option value="">Seleccione un producto</option>
  //         {productos.map((p) => (
  //           <option key={p.id} value={p.id}>
  //             {p.modelo} (código: {p.codigo})
  //           </option>
  //         ))}
  //       </select>
  //       <button onClick={fetchTallas} disabled={!productoId}>
  //         Buscar tallas
  //       </button>
  //     </div>

  //     <form onSubmit={handleSubmit}>
  //       <h3>Agregar nuevas tallas</h3>
  //       {nuevasTallas.map((talla, index) => (
  //         <div key={index} style={{ marginBottom: "0.5rem" }}>
  //           <input
  //             type="text"
  //             placeholder="Talla"
  //             value={talla.talla}
  //             onChange={(e) =>
  //               handleInputChange(index, "talla", e.target.value)
  //             }
  //           />
  //           <input
  //             type="number"
  //             placeholder="Stock"
  //             value={talla.stock}
  //             onChange={(e) =>
  //               handleInputChange(index, "stock", e.target.value)
  //             }
  //             style={{ marginLeft: "0.5rem" }}
  //           />
  //         </div>
  //       ))}
  //       <button type="button" onClick={handleAddInput}>
  //         + Añadir otra talla
  //       </button>
  //       <button type="submit" style={{ marginLeft: "1rem" }} disabled={!productoId}>
  //         Guardar tallas
  //       </button>
  //     </form>

  //     <h3 style={{ marginTop: "2rem" }}>Tallas registradas</h3>
  //     {tallas.length === 0 && productoId && <p>No hay tallas registradas aún.</p>}
  //     <ul>
  //       {tallas.map((t) => (
  //         <li key={t.id}>
  //           <strong>ID:</strong> {t.id} – <strong>Talla:</strong>{" "}
  //           <input
  //             type="text"
  //             value={t.talla}
  //             onChange={(e) =>
  //               handleEditarTalla(t.id, "talla", e.target.value)
  //             }
  //           />{" "}
  //           – <strong>Stock:</strong>{" "}
  //           <input
  //             type="number"
  //             value={t.stock}
  //             onChange={(e) =>
  //               handleEditarTalla(t.id, "stock", e.target.value)
  //             }
  //           />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );


  return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh"
  }}>
    <div style={{
      maxWidth: "800px",
      width: "100%",
      backgroundColor: "white",
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Tallas por Producto
      </h2>

      {/* Selector de producto */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="">Seleccione un producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.modelo} (código: {p.codigo})
            </option>
          ))}
        </select>
        <button onClick={fetchTallas} disabled={!productoId} style={buttonStyle}>
          Buscar tallas
        </button>
      </div>

      {/* Formulario nuevas tallas */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Agregar nuevas tallas</h3>
        {nuevasTallas.map((talla, index) => (
          <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
            <input
              type="text"
              placeholder="Talla"
              value={talla.talla}
              onChange={(e) => handleInputChange(index, "talla", e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Stock"
              value={talla.stock}
              onChange={(e) => handleInputChange(index, "stock", e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}
        <div style={{ marginTop: "1rem" }}>
          <button type="button" onClick={handleAddInput} style={{ ...buttonStyle, backgroundColor: "#4b5563" }}>
            + Añadir otra talla
          </button>
          <button
            type="submit"
            disabled={!productoId}
            style={{ ...buttonStyle, marginLeft: "1rem" }}
          >
            Guardar tallas
          </button>
        </div>
      </form>

      {/* Lista de tallas registradas */}
      <h3 style={{ marginBottom: "1rem" }}>Tallas registradas</h3>
      {tallas.length === 0 && productoId && <p>No hay tallas registradas aún.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tallas.map((t) => (
          <li key={t.id} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <span><strong>ID:</strong> {t.id}</span>
            <span><strong>Talla:</strong></span>
            <input
              type="text"
              value={t.talla}
              onChange={(e) => handleEditarTalla(t.id, "talla", e.target.value)}
              style={inputStyle}
            />
            <span><strong>Stock:</strong></span>
            <input
              type="number"
              value={t.stock}
              onChange={(e) => handleEditarTalla(t.id, "stock", e.target.value)}
              style={inputStyle}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

};

export default TallasPage;
