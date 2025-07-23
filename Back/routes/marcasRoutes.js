import { Router } from 'express';
import { crearMarca, listarMarcas, editarMarca } from '../controllers/marcasController.js';

const router = Router();
router.post('/', crearMarca);
router.get('/', listarMarcas);
router.put('/:id', editarMarca); // 👈 ruta para editar

export default router;
