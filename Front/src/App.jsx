import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductosPage from "./pages/ProductosPage";
import TallasPage from "./pages/TallasPage";
import ColoresPage from "./pages/ColoresPage";
import MaterialesPage from "./pages/MaterialesPage";
import MarcasPage from "./pages/MarcasPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductosPage />} />
        <Route path="/tallas" element={<TallasPage />} />
        <Route path="/colores" element={<ColoresPage />} />
        <Route path="/materiales" element={<MaterialesPage />} />
        <Route path="/marcas" element={<MarcasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
