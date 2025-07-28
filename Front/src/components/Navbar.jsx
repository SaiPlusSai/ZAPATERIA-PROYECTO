import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", display: "flex", gap: "1rem" }}>
      <Link to="/">Productos</Link>
      <Link to="/tallas">Tallas</Link>
      <Link to="/colores">Colores</Link>
      <Link to="/materiales">Materiales</Link>
      <Link to="/marcas">Marcas</Link>
    </nav>
  );
};

export default Navbar;
