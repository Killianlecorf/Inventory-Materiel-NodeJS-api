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
const Materials_model_1 = __importDefault(require("../../src/Models/Materials.model")); // Assurez-vous que le nom du modèle est correct
const setupBDD_1 = require("../setupBDD");
describe('GET /api/materials/:materialId', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.connect)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.clearDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.closeDatabase)();
    }));
    it('devrait récupérer un matériau par ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const materialData = {
            name: 'Matériau de test',
            etudiants: 'Description du matériau de test',
            number: 42,
            date: new Date(),
        };
        const createdMaterial = yield Materials_model_1.default.create(materialData);
        const savedMaterialId = createdMaterial.id;
        console.log('Saved Material ID:', savedMaterialId);
        const response = yield (0, supertest_1.default)(index_1.app)
            .get(`/api/materials/${savedMaterialId}`);
        console.log('Response:', response.status, response.body);
        expect(response.status).toBe(200);
        // Ajoutez d'autres assertions pour vérifier les données renvoyées
    }));
    it('devrait renvoyer une erreur 404 si l\'ID du matériau n\'existe pas', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = 'invalid-id';
        const response = yield (0, supertest_1.default)(index_1.app)
            .get(`/api/materials/${nonExistentId}`);
        expect(response.body.error).toEqual('Matériau non trouvé');
    }));
});
