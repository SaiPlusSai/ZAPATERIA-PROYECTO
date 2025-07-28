import { useEffect, useState } from "react";
import {
  getMateriales,
  createMaterial,
  updateMaterial,
} from "../services/materialesService";

const MaterialesPage = () => {
  const [materiales, setMateriales] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState("");

  useEffect(() => {
    fetchMateriales();
  }, []);

  const fetchMateriales = async () => {
    const data = await getMateriales();
    setMateriales(data);
  };

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevo.nombre.trim()) return alert("El nombre es requerido");
    await createMaterial(nuevo);
    setNuevo({ nombre: "" });
    fetchMateriales();
  };

  const handleEdit = (id, nombre) => {
    setEditandoId(id);
    setEditNombre(nombre);
  };

  const handleUpdate = async (id) => {
    if (!editNombre.trim()) return alert("El nuevo nombre es requerido");
    await updateMaterial(id, { nombre: editNombre });
    setEditandoId(null);
    fetchMateriales();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Materiales</h2>

      {/* Formulario para agregar nuevo material */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del material"
          value={nuevo.nombre}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de materiales */}
      <ul>
        {materiales.map((material) => (
          <li key={material.id}>
            {editandoId === material.id ? (
              <>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <button onClick={() => handleUpdate(material.id)}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {material.nombre}
                <button
                  onClick={() => handleEdit(material.id, material.nombre)}
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

export default MaterialesPage;
