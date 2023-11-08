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
const Materials_model_1 = __importDefault(require("../../src/Models/Materials.model"));
const index_1 = require("../../index");
const setupBDD_1 = require("../setupBDD");
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
const mockRequest = () => ({
    body: {
        email: 'klecorf@normandiewebschool.fr',
    },
    params: {
        materialId: '654b7b2dc0c89c8a35eb2444',
    },
});
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};
describe('createLendMaterial', () => {
    it('devrait créer un prêt de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assurez-vous d'ajouter un enregistrement Material factice dans la base de données
        const material = new Materials_model_1.default({
            _id: 'votreIdDeTest',
            // Ajoutez d'autres champs nécessaires ici
        });
        yield material.save();
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/votre-endpoint-de-création')
            .send({
            email: 'klecorf@normandiewebschool.fr',
            materialId: '654b7b2dc0c89c8a35eb2444',
        });
        // Assurez-vous que le statut de réponse est 201 (Created)
        expect(response.status).toBe(201);
        // Assurez-vous que la réponse JSON contient les données du prêt de matériel créé
        expect(response.body).toEqual(expect.objectContaining({
            email: 'klecorf@normandiewebschool.fr',
            material: 'votreIdDeTest',
        }));
    }));
});
