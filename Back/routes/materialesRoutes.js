import { Router } from 'express';
import { crearMaterial, listarMateriales, editarMaterial } from '../controllers/materialesController.js';

const router = Router();
router.post('/', crearMaterial);
router.get('/', listarMateriales);
router.put('/:id', editarMaterial); // 👈 ruta para editar

export default router;
