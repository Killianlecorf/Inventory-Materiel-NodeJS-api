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
exports.deleteMaterial = exports.updateMaterial = exports.getMaterialById = exports.getMaterials = exports.createMaterial = void 0;
const Materials_model_1 = __importDefault(require("../Models/Materials.model"));
// Contrôleur pour la création d'un nouveau matériau
const createMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, etudiants, number } = req.body;
        const date = new Date();
        const material = new Materials_model_1.default({ name, etudiants, number, date });
        yield material.save();
        res.status(201).json(material);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du matériau' });
    }
});
exports.createMaterial = createMaterial;
// Contrôleur pour la récupération de tous les matériaux
const getMaterials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield Materials_model_1.default.find();
        res.status(200).json(materials);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des matériaux' });
    }
});
exports.getMaterials = getMaterials;
const getMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materialId = req.params.materialId;
    try {
        const material = yield Materials_model_1.default.findById(materialId);
        if (!material) {
            return res.status(404).json({ error: 'Matériau non trouvé' });
        }
        res.status(200).json(material);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du matériau' });
    }
});
exports.getMaterialById = getMaterialById;
// Contrôleur pour la mise à jour d'un matériau par ID
const updateMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materialId = req.params.materialId;
    try {
        const updatedMaterial = yield Materials_model_1.default.findByIdAndUpdate(materialId, req.body, { new: true });
        if (!updatedMaterial) {
            return res.status(404).json({ error: 'Matériau non trouvé' });
        }
        res.status(200).json(updatedMaterial);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du matériau' });
    }
});
exports.updateMaterial = updateMaterial;
// Contrôleur pour la suppression d'un matériau par ID
const deleteMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materialId = req.params.materialId;
    try {
        const deletedMaterial = yield Materials_model_1.default.findByIdAndRemove(materialId);
        if (!deletedMaterial) {
            return res.status(404).json({ error: 'Matériau non trouvé' });
        }
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du matériau' });
    }
});
exports.deleteMaterial = deleteMaterial;
