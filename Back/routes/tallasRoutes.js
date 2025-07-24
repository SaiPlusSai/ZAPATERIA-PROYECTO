import { Router } from 'express';
import {
  agregarTallas,
  listarTallasDeProducto,
  editarTalla
} from '../controllers/tallasController.js';

const router = Router();


router.post('/', agregarTallas);


router.get('/:productoId', listarTallasDeProducto);


router.put('/:id', editarTalla);

export default router;
