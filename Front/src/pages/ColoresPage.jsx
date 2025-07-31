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


  // return (
  //   <div style={{ padding: "1rem" }}>
  //     <h2>Colores</h2>

  //     {/* Formulario para agregar nuevo color */}
  //     <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
  //       <input
  //         type="text"
  //         name="nombre"
  //         placeholder="Nombre del color"
  //         value={nuevo.nombre}
  //         onChange={handleChange}
  //       />
  //       <button type="submit">Agregar</button>
  //     </form>

  //     {/* Lista de colores */}
  //     <ul>
  //       {colores.map((color) => (
  //         <li key={color.id}>
  //           {editandoId === color.id ? (
  //             <>
  //               <input
  //                 type="text"
  //                 value={editNombre}
  //                 onChange={(e) => setEditNombre(e.target.value)}
  //               />
  //               <button onClick={() => handleUpdate(color.id)}>Guardar</button>
  //               <button onClick={() => setEditandoId(null)}>Cancelar</button>
  //             </>
  //           ) : (
  //             <>
  //               {color.nombre}
  //               <button
  //                 onClick={() => handleEdit(color.id, color.nombre)}
  //                 style={{ marginLeft: "1rem" }}
  //               >
  //                 Editar
  //               </button>
  //             </>
  //           )}
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
      maxWidth: "600px",
      width: "100%",
      backgroundColor: "white",
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Colores
      </h2>

      {/* Formulario para agregar nuevo color */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del color"
          value={nuevo.nombre}
          onChange={handleChange}
          style={{ ...inputStyle, flex: 1 }}
        />
        <button type="submit" style={buttonStyle}>Agregar</button>
      </form>

      {/* Lista de colores */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {colores.map((color) => (
          <li key={color.id} style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.8rem"
          }}>
            {editandoId === color.id ? (
              <>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  style={inputStyle}
                />
                <button onClick={() => handleUpdate(color.id)} style={mutedButton}>Guardar</button>
                <button onClick={() => setEditandoId(null)} style={cancelButton}>Cancelar</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{color.nombre}</span>
                <button
                  onClick={() => handleEdit(color.id, color.nombre)}
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



export default ColoresPage;
