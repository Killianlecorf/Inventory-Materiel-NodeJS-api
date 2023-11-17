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
describe('deleteLendMaterial', () => {
    it('devrait supprimer un prêt de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        const validObjectId = new mongoose_1.default.Types.ObjectId();
        const lendMaterial = new LendMaterials_1.default({
            material: validObjectId,
            email: 'user1@example.com',
            date: new Date(),
        });
        yield lendMaterial.save();
        const response = yield request
            .delete(`/api/lend/${lendMaterial._id}`)
            .expect(204);
        expect(response.status).toBe(204);
    }));
    it("devrait renvoyer une erreur 404 si le prêt de matériel n'est pas trouvé", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentLendMaterialId = '123456789012345678901235';
        const response = yield request
            .delete(`/api/lend/${nonExistentLendMaterialId}`)
            .expect(404);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
    }));
    it('devrait renvoyer une erreur 404 en cas d\'ID de matériel non valide', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidLendMaterialId = 'invalid_id';
        const response = yield request
            .delete(`/api/lend/${invalidLendMaterialId}`)
            .expect(404);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
    }));
});
