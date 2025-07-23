import { Router } from 'express';
import { crearMaterial, listarMateriales } from '../controllers/materialesController.js';

const router = Router();
router.post('/', crearMaterial);
router.get('/', listarMateriales);

export default router;
