import { useEffect, useState } from "react";
import {
  getColores,
  createColor,
  updateColor,
} from "../services/coloresService";

const ColoresPage = () => {
  const [colores, setColores] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState("");

  useEffect(() => {
    fetchColores();
  }, []);

  const fetchColores = async () => {
    const data = await getColores();
    setColores(data);
  };

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevo.nombre.trim()) return alert("El nombre es requerido");
    await createColor(nuevo);
    setNuevo({ nombre: "" });
    fetchColores();
  };

  const handleEdit = (id, nombre) => {
    setEditandoId(id);
    setEditNombre(nombre);
  };

  const handleUpdate = async (id) => {
    if (!editNombre.trim()) return alert("El nuevo nombre es requerido");
    await updateColor(id, { nombre: editNombre });
    setEditandoId(null);
    fetchColores();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Colores</h2>

      {/* Formulario para agregar nuevo color */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del color"
          value={nuevo.nombre}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de colores */}
      <ul>
        {colores.map((color) => (
          <li key={color.id}>
            {editandoId === color.id ? (
              <>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <button onClick={() => handleUpdate(color.id)}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {color.nombre}
                <button
                  onClick={() => handleEdit(color.id, color.nombre)}
                  style={{ marginLeft: "1rem" }}
                >
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColoresPage;
