import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", display: "flex", gap: "1rem" }}>
      <Link to="/">Ver Zapatos</Link>
      <Link to="/registrar/">Registrar Zapatos</Link>
    </nav>
  );
};

export default Navbar;
