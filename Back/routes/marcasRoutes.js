import { Router } from 'express';
import { crearMarca, listarMarcas } from '../controllers/marcasController.js';

const router = Router();


router.post('/', crearMarca);

router.get('/', listarMarcas);

export default router;
