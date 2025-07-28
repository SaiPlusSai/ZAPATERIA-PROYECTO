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

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Tallas por Producto</h2>

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.modelo} (código: {p.codigo})
            </option>
          ))}
        </select>
        <button onClick={fetchTallas} disabled={!productoId}>
          Buscar tallas
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Agregar nuevas tallas</h3>
        {nuevasTallas.map((talla, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>
            <input
              type="text"
              placeholder="Talla"
              value={talla.talla}
              onChange={(e) =>
                handleInputChange(index, "talla", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Stock"
              value={talla.stock}
              onChange={(e) =>
                handleInputChange(index, "stock", e.target.value)
              }
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddInput}>
          + Añadir otra talla
        </button>
        <button type="submit" style={{ marginLeft: "1rem" }} disabled={!productoId}>
          Guardar tallas
        </button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Tallas registradas</h3>
      {tallas.length === 0 && productoId && <p>No hay tallas registradas aún.</p>}
      <ul>
        {tallas.map((t) => (
          <li key={t.id}>
            <strong>ID:</strong> {t.id} – <strong>Talla:</strong>{" "}
            <input
              type="text"
              value={t.talla}
              onChange={(e) =>
                handleEditarTalla(t.id, "talla", e.target.value)
              }
            />{" "}
            – <strong>Stock:</strong>{" "}
            <input
              type="number"
              value={t.stock}
              onChange={(e) =>
                handleEditarTalla(t.id, "stock", e.target.value)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TallasPage;
