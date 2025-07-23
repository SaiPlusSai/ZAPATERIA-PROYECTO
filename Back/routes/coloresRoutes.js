import { Router } from 'express';
import { crearColor, listarColores, editarColor } from '../controllers/coloresController.js';

const router = Router();
router.post('/', crearColor);
router.get('/', listarColores);
router.put('/:id', editarColor); // 👈 ruta para editar

export default router;