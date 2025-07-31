import { useEffect, useState } from "react";
import {
  getMarcas,
  createMarca,
  updateMarca,
} from "../services/marcasService";

const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState("");

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    const data = await getMarcas();
    setMarcas(data);
  };

  const handleChange = (e) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nueva.nombre.trim()) return alert("El nombre es requerido");
    await createMarca(nueva);
    setNueva({ nombre: "" });
    fetchMarcas();
  };

  const handleEdit = (id, nombre) => {
    setEditandoId(id);
    setEditNombre(nombre);
  };

  const handleUpdate = async (id) => {
    if (!editNombre.trim()) return alert("El nuevo nombre es requerido");
    await updateMarca(id, { nombre: editNombre });
    setEditandoId(null);
    fetchMarcas();
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

  const mutedButton = {
    ...buttonStyle,
    backgroundColor: "#4b5563"
  };

  const cancelButton = {
    ...buttonStyle,
    backgroundColor: "#9ca3af"
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "white",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px"
      }}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Marcas
        </h2>

        {/* Formulario para agregar nueva marca */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la marca"
            value={nueva.nombre}
            onChange={handleChange}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button type="submit" style={buttonStyle}>Agregar</button>
        </form>

        {/* Lista de marcas */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {marcas.map((marca) => (
            <li key={marca.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.8rem"
            }}>
              {editandoId === marca.id ? (
                <>
                  <input
                    type="text"
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    style={inputStyle}
                  />
                  <button onClick={() => handleUpdate(marca.id)} style={mutedButton}>Guardar</button>
                  <button onClick={() => setEditandoId(null)} style={cancelButton}>Cancelar</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{marca.nombre}</span>
                  <button
                    onClick={() => handleEdit(marca.id, marca.nombre)}
                    style={buttonStyle}
                  >
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarcasPage;
