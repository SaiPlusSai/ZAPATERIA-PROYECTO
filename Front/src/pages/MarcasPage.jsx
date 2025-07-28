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

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Marcas</h2>

      {/* Formulario para agregar nueva marca */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la marca"
          value={nueva.nombre}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de marcas */}
      <ul>
        {marcas.map((marca) => (
          <li key={marca.id}>
            {editandoId === marca.id ? (
              <>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <button onClick={() => handleUpdate(marca.id)}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {marca.nombre}
                <button
                  onClick={() => handleEdit(marca.id, marca.nombre)}
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

export default MarcasPage;
