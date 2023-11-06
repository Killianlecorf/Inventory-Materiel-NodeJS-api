"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_middleware_1 = require("../middleware/cors.middleware");
const LendMaterials_controller_1 = require("../Controllers/LendMaterials.controller");
const router = express_1.default.Router();
// Routes pour les opérations CRUD
router.post('/:materialId', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.createLendMaterial);
router.get('/', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.getAllLendMaterials);
router.get('/:id', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.getLendMaterialById);
router.get('/material/:materialId', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.getLendMaterialsByMaterialId);
router.put('/:id', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.updateLendMaterial);
router.delete('/:id', cors_middleware_1.corsMiddleware, LendMaterials_controller_1.deleteLendMaterial);
exports.default = router;
