import { Router } from 'express';
import { crearColor, listarColores } from '../controllers/coloresController.js';

const router = Router();

// POST: crear color
router.post('/', crearColor);

// GET: listar colores
router.get('/', listarColores);

export default router;
