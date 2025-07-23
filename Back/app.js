import express from 'express';
import cors from 'cors';
import materialesRoutes from './routes/materialesRoutes.js';
import productosRoutes from './routes/productosRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/materiales', materialesRoutes);
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
