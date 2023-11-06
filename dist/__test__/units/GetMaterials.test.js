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
describe('GET /api/materials', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.connect)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.clearDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setupBDD_1.closeDatabase)();
    }));
    it('devrait récupérer tous les matériaux', () => __awaiter(void 0, void 0, void 0, function* () {
        const materialData = {
            name: 'Matériau de test',
            etudiants: 'Description du matériau de test',
            number: 42,
            date: new Date(),
        };
        yield Materials_model_1.default.create(materialData);
        const response = yield (0, supertest_1.default)(index_1.app)
            .get('/api/materials');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
    }));
    it('ne devrait pas récupérer un matériau inexistant par ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentID = '60b3a16925eae2f9683fe999';
        const response = yield (0, supertest_1.default)(index_1.app)
            .get(`/api/materials/${nonExistentID}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Matériau non trouvé');
    }));
});
