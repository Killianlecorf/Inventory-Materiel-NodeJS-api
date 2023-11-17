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
const LendMaterials_1 = __importDefault(require("../../src/Models/LendMaterials"));
const mongoose_1 = __importDefault(require("mongoose"));
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
describe('getLendMaterialById', () => {
    it('devrait récupérer un prêt de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        const validObjectId = new mongoose_1.default.Types.ObjectId(); // Crée un nouvel ObjectId valide
        const lendMaterial = new LendMaterials_1.default({
            material: validObjectId,
            email: 'user1@example.com',
            date: new Date(),
        });
        yield lendMaterial.save();
        const response = yield request
            .get(`/api/lend/${lendMaterial._id}`)
            .expect(200);
        const returnedLendMaterial = response.body;
        expect(returnedLendMaterial).toHaveProperty('material', validObjectId.toString());
        expect(returnedLendMaterial).toHaveProperty('email', 'user1@example.com');
    }));
    it('devrait renvoyer une erreur 404 si le prêt de matériel n\'existe pas', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentLendMaterialId = '123456789012345678901235';
        const response = yield request
            .get(`/api/lend/${nonExistentLendMaterialId}`)
            .expect(404);
        expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
    }));
    it('devrait renvoyer une erreur 404 en cas d\'échec de récupération du prêt de matériel', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simuler une erreur en vidant la base de données
        yield (0, setupBDD_1.clearDatabase)();
        const response = yield request
            .get('/api/lend/123456789012345678901235')
            .expect(404);
        expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
    }));
    it('devrait renvoyer une erreur 404 si l\'ID du matériel n\'a pas 24 caractères', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidMaterialId = '12345678901234567890123'; // ID de 23 caractères
        const response = yield request
            .get(`/api/lend/${invalidMaterialId}`)
            .expect(404);
        expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
    }));
});
