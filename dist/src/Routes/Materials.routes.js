"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_middleware_1 = require("../middleware/cors.middleware");
const Materials_Controller_1 = require("../Controllers/Materials.Controller");
const router = express_1.default.Router();
router.post('/create', cors_middleware_1.corsMiddleware, Materials_Controller_1.createMaterial);
router.get('/', cors_middleware_1.corsMiddleware, Materials_Controller_1.getMaterials);
router.get('/:materialId', cors_middleware_1.corsMiddleware, Materials_Controller_1.getMaterialById);
router.delete('/materialId', cors_middleware_1.corsMiddleware, Materials_Controller_1.deleteMaterial);
router.put('/materialId', cors_middleware_1.corsMiddleware, Materials_Controller_1.updateMaterial);
exports.default = router;
