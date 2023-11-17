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
        // Vérifiez si l'ID du matériel est valide (par exemple, si sa longueur est de 24 caractères)
        if (!isValidMaterialId(materialId)) {
            return res.status(404).json({ error: 'ID de matériel non valide' });
        }
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
        // Gérez les erreurs internes du serveur ici
        console.error(error);
        res.status(500).json({ error: 'Impossible de créer le prêt de matériel' });
    }
});
exports.createLendMaterial = createLendMaterial;
function isValidMaterialId(id) {
    return id.length === 24;
}
const getLendMaterialsByMaterialId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materialId = req.params.materialId;
        // Vérifie si l'ID du matériel est valide
        if (!isValidMaterialId(materialId)) {
            return res.status(404).json({ error: 'ID de matériel non valide' });
        }
        // Recherche les prêts de matériel pour l'ID de matériel donné
        const lendMaterials = yield LendMaterials_1.default.find({ material: materialId });
        if (lendMaterials.length === 0) {
            return res.status(404).json({ error: 'Aucun prêt de matériel trouvé pour cet ID de matériel.' });
        }
        // Renvoie les prêts de matériel trouvés
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
        res.status(200).json(lendMaterials);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer les prêts de matériel' });
    }
});
exports.getAllLendMaterials = getAllLendMaterials;
const getLendMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lendMaterialId = req.params.id;
        // Vérifie si l'ID du matériel est valide
        if (!isValidMaterialId(lendMaterialId)) {
            return res.status(404).json({ error: 'ID de matériel non valide' });
        }
        const lendMaterial = yield LendMaterials_1.default.findById(lendMaterialId);
        if (!lendMaterial) {
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        res.status(200).json(lendMaterial);
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
        if (!isValidMaterialId(lendMaterial === null || lendMaterial === void 0 ? void 0 : lendMaterial._id)) {
            return res.status(404).json({ error: 'ID de matériel non valide' });
        }
        if (!lendMaterial) {
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        res.status(200).json(lendMaterial);
    }
    catch (error) {
        res.status(500).json({ error: 'Impossible de mettre à jour le prêt de matériel' });
    }
});
exports.updateLendMaterial = updateLendMaterial;
// Controller pour supprimer un élément LendMaterials par ID
const deleteLendMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation de l'ID de matériel
        if (!isValidMaterialId(req.params.id)) {
            return res.status(404).json({ error: 'ID de matériel non valide' });
        }
        const lendMaterial = yield LendMaterials_1.default.findByIdAndRemove(req.params.id);
        if (!lendMaterial) {
            // Si le prêt de matériel n'est pas trouvé, renvoyer une erreur 404
            return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
        }
        // Le prêt de matériel a été trouvé et supprimé avec succès, renvoyer une réponse 204 (No Content)
        res.status(204).end();
    }
    catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 (Internal Server Error)
        res.status(500).json({ error: 'Impossible de supprimer le prêt de matériel' });
    }
});
exports.deleteLendMaterial = deleteLendMaterial;
