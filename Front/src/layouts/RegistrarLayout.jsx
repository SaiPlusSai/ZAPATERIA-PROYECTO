import { Outlet, Link } from "react-router-dom";

const RegistrarLayout = () => {
  return (
    <div>
      <nav style={{ padding: "0.5rem", backgroundColor: "#cce", display: "flex", gap: "1rem" }}>
        <Link to="registro">Registro</Link>
        <Link to="tallas">Tallas</Link>
        <Link to="colores">Colores</Link>
        <Link to="materiales">Materiales</Link>
        <Link to="marcas">Marcas</Link>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Outlet /> {/* Aquí se renderiza cada sub-vista */}
      </div>
    </div>
  );
};

export default RegistrarLayout;
