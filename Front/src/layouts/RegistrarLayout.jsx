import { Outlet, Link } from "react-router-dom";

const RegistrarLayout = () => {
  const navStyle = {
    padding: "1rem 2rem",
    backgroundColor: "#1f2937", // fondo oscuro pro
    display: "flex",
    gap: "1rem",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    backgroundColor: "#374151",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    fontSize: "0.95rem",
    transition: "background-color 0.3s ease",
  };

  const linkHoverStyle = {
    backgroundColor: "#4b5563",
  };

  return (
    <div>
      <nav style={navStyle}>
        {["registro", "tallas", "colores", "materiales", "marcas"].map((ruta) => (
          <Link
            key={ruta}
            to={ruta}
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = linkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
          >
            {ruta.charAt(0).toUpperCase() + ruta.slice(1)}
          </Link>
        ))}
      </nav>

      <div style={{ padding: "2rem", fontFamily: "Segoe UI, Roboto, sans-serif" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default RegistrarLayout;
