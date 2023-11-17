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
const setupBDD_1 = require("../setupBDD");
const Materials_model_1 = __importDefault(require("../../src/Models/Materials.model")); // Assurez-vous d'importer le modèle Material correctement
const LendMaterials_1 = __importDefault(require("../../src/Models/LendMaterials")); // Assurez-vous d'importer le modèle LendMaterial correctement
const request = (0, supertest_1.default)(index_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setupBDD_1.connect)();
    console.log('connected');
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setupBDD_1.clearDatabase)();
    console.log('cleared');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setupBDD_1.closeDatabase)();
    console.log('closed');
}));
describe('getLendMaterialsByMaterialId', () => {
    it('devrait récupérer les prêts de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        const material = new Materials_model_1.default({
            name: 'écran',
            etudiants: 'étudiant1',
            number: 1,
            date: new Date(),
        });
        yield material.save();
        const lendMaterial = new LendMaterials_1.default({
            material: material._id,
            email: 'klecorf@normandiewebschool.fr',
            date: new Date(),
        });
        yield lendMaterial.save();
        const response = yield request
            .get(`/api/lend/material/${material._id}`)
            .expect(200);
        const lendMaterials = response.body;
        expect(Array.isArray(lendMaterials)).toBe(true);
        expect(lendMaterials.length).toBe(1);
    }));
    it('devrait renvoyer une erreur 404 si aucun prêt de matériel n\'est trouvé', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentMaterialId = '123456789012345678901235';
        const response = yield request
            .get(`/api/lend/material/${nonExistentMaterialId}`)
            .expect(404);
        expect(response.body).toHaveProperty('error', 'Aucun prêt de matériel trouvé pour cet ID de matériel.');
    }));
    it('devrait renvoyer une erreur 404 si l\'ID du matériel n\'a pas 24 caractères', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidMaterialId = '12345678901234567890123'; // ID de 23 caractères
        const response = yield request
            .get(`/api/lend/material/${invalidMaterialId}`)
            .expect(404);
        expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
    }));
});
