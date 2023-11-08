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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const Materials_model_1 = __importDefault(require("../../src/Models/Materials.model"));
const setupBDD_1 = require("../setupBDD");
// Tests unitaires pour PUT /api/materials/:id (modification d'un matériau)
describe('PUT /api/materials/:materialId', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.connect)();
        console.log("connected");
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.clearDatabase)();
        console.log("cleared");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.closeDatabase)();
        console.log("closed");
    }));
    it('devrait mettre à jour un matériau existant avec des données valides', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingMaterialData = {
            name: 'Matériau existant',
            etudiants: 'Description du matériau existant',
            number: 42,
            date: new Date(),
        };
        const existingMaterial = yield Materials_model_1.default.create(existingMaterialData);
        const updatedMaterialData = {
            name: 'Nouveau Matériau',
            etudiants: 'Ceci est une mise à jour du matériau de test.',
            number: 55,
            date: new Date(),
        };
        const response = yield (0, supertest_1.default)(index_1.app)
            .put(`/api/materials/${existingMaterial._id}`)
            .send(updatedMaterialData);
        expect(response.status).toBe(200);
        const updatedMaterial = yield Materials_model_1.default.findById(existingMaterial._id);
        expect(updatedMaterial).not.toBeNull();
        expect(updatedMaterial === null || updatedMaterial === void 0 ? void 0 : updatedMaterial.name).toBe(updatedMaterialData.name);
        expect(updatedMaterial === null || updatedMaterial === void 0 ? void 0 : updatedMaterial.etudiants).toBe(updatedMaterialData.etudiants);
    }));
    it('ne devrait pas créer un matériau avec des données manquantes', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidMaterialData = {
            etudiants: 'Ceci est un matériau incomplet de test.',
        };
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/api/materials/create')
            .send(invalidMaterialData);
        expect(response.status).toBe(404);
    }));
    it('ne devrait pas mettre à jour un matériau avec un ID introuvable', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentID = '60b3a16925eae2f9683fe999';
        const response = yield (0, supertest_1.default)(index_1.app)
            .put(`/api/materials/${nonExistentID}`)
            .send({ name: 'Nouveau nom', etudiants: 'Nouvelle description' });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Matériau non trouvé');
    }));
});
