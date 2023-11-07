import express from 'express';
import { corsMiddleware } from '../middleware/cors.middleware';
import {
  createLendMaterial,
  getAllLendMaterials,
  getLendMaterialById,
  updateLendMaterial,
  deleteLendMaterial,
  getLendMaterialsByMaterialId
} from '../Controllers/LendMaterials.controller';

const router = express.Router();

// Routes pour les opérations CRUD
router.post('/:materialId', corsMiddleware,  createLendMaterial);
router.get('/', corsMiddleware, getAllLendMaterials);
router.get('/:id', corsMiddleware, getLendMaterialById);
router.get('/material/:materialId', corsMiddleware,  getLendMaterialsByMaterialId);
router.put('/:materialId', corsMiddleware, updateLendMaterial);
router.delete('/:id', corsMiddleware, deleteLendMaterial);

export default router;
