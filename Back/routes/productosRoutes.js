import { Router } from 'express';
import {
  crearProducto, listarProductos, editarProducto, eliminarProducto
} from '../controllers/productosController.js';

const router = Router();
router.post('/', crearProducto);
router.get('/', listarProductos);
router.put('/:id', editarProducto);
router.delete('/:id', eliminarProducto);

export default router;

