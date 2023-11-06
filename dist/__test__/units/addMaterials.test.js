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
require("../setupBDD");
const setupBDD_1 = require("../setupBDD");
describe('POST /api/materials/', () => {
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
    it('devrait créer un nouveau matériau avec des données valides', () => __awaiter(void 0, void 0, void 0, function* () {
        const newMaterialData = {
            name: 'Nouveau Matériau',
            etudiants: 'Ceci est un nouveau matériau de test.',
            number: 42,
            date: new Date(),
        };
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/api/materials/')
            .send(newMaterialData);
        // Assurez-vous que la réponse a un statut 201 (Créé)
        expect(response.status).toBe(201);
        // Assurez-vous que les propriétés du matériau correspondent aux données que vous avez envoyées
        expect(response.body.name).toBe(newMaterialData.name);
        expect(response.body.etudiants).toBe(newMaterialData.etudiants);
        expect(response.body.number).toBe(newMaterialData.number);
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
});
