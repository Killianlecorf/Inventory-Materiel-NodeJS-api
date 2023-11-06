"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLendMaterial = exports.updateLendMaterial = exports.getLendMaterialById = exports.getAllLendMaterials = exports.getLendMaterialsByMaterialId = exports.createLendMaterial = void 0;
const LendMaterials_1 = __importDefault(require("../../src/Models/LendMaterials"));
const Materials_model_1 = __importDefault(require("../../src/Models/Materials.model"));
// Controller pour créer un nouvel élément LendMaterials
const createLendMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const date = new Date();
        const { materialId } = req.params;
        const material = yield Materials_model_1.default.findById(materialId);
        if (!material) {
            return res.status(404).json({ error: 'Matériel non trouvé' });
        }
        const lendMaterial = new LendMaterials_1.default({
            email,
            date,
            material: materialId,
        });
        const savedLendMaterial = yield lendMaterial.save();
        res.status(201).json(savedLendMaterial);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de créer le prêt de matériel' });
    }
});
exports.createLendMaterial = createLendMaterial;
const getLendMaterialsByMaterialId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materialId = req.params.materialId; // Récupérez l'ID du matériel depuis les paramètres de l'URL
        // Utilisez la méthode find de Mongoose pour récupérer tous les prêts de matériel avec le même ID de matériel
        const lendMaterials = yield LendMaterials_1.default.find({ material: materialId });
        if (lendMaterials.length === 0) {
            return res.status(404).json({ error: 'Aucun prêt de matériel trouvé pour cet ID de matériel.' });
        }
        res.status(200).json(lendMaterials);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer les prêts de matériel.' });
    }
});
exports.getLendMaterialsByMaterialId = getLendMaterialsByMaterialId;
// Controller pour récupérer tous les éléments LendMaterials
const getAllLendMaterials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lendMaterials = yield LendMaterials_1.default.find();
        res.json(lendMaterials);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer les prêts de matériel' });
    }
});
exports.getAllLendMaterials = getAllLendMaterials;
// Controller pour récupérer un élément LendMaterials par ID
const getLendMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lendMaterial = yield LendMaterials_1.default.findById(req.params.id);
        if (!lendMaterial) {
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        res.json(lendMaterial);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer le prêt de matériel' });
    }
});
exports.getLendMaterialById = getLendMaterialById;
// Controller pour mettre à jour un élément LendMaterials par ID
const updateLendMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lendMaterial = yield LendMaterials_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lendMaterial) {
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        res.json(lendMaterial);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de mettre à jour le prêt de matériel' });
    }
});
exports.updateLendMaterial = updateLendMaterial;
// Controller pour supprimer un élément LendMaterials par ID
const deleteLendMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lendMaterial = yield LendMaterials_1.default.findByIdAndRemove(req.params.id);
        if (!lendMaterial) {
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        res.json({ message: 'Prêt de matériel supprimé avec succès' });
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de supprimer le prêt de matériel' });
    }
});
exports.deleteLendMaterial = deleteLendMaterial;
