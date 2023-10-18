import express from 'express';
import { corsMiddleware } from '../middleware/cors.middleware';
import {
    createMaterial,
    getMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial
  } from '../Controllers/Materials.Controller';

const router = express.Router();


router.post('/create',corsMiddleware, createMaterial);
router.get('/',corsMiddleware, getMaterials);
router.get('/:materialId',corsMiddleware, getMaterialById);
router.delete('/materialId',corsMiddleware, deleteMaterial)
router.put('/materialId',corsMiddleware, updateMaterial)

export default router;