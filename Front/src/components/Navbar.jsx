import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const navStyle = {
    display: "flex",
    gap: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "#111827",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, backgroundColor: "#1f2937" }}>
        Ver Zapatos
      </Link>
      <Link to="/registrar/" style={{ ...linkStyle, backgroundColor: "#1f2937" }}>
        Registrar Zapatos
      </Link>
    </nav>
  );
};

export default Navbar;
