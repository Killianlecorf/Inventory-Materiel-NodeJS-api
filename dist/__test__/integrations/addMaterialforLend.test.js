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
const LendMaterials_1 = __importDefault(require("../../src/Models/LendMaterials"));
const index_1 = require("../../index");
const setupBDD_1 = require("../setupBDD");
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
describe('createLendMaterial', () => {
    it('devrait créer un prêt de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        const material = new Materials_model_1.default({
            name: 'écran',
            etudiants: 'étudiant1',
            number: 1,
            date: new Date(),
        });
        yield material.save();
        const response = yield request
            .post(`/lend/${material._id}`)
            .send({
            email: 'klecorf@normandiewebschool.fr',
        })
            .expect(201);
        const lendMaterial = response.body;
        expect(lendMaterial).toHaveProperty('email', 'klecorf@normandiewebschool.fr');
        expect(lendMaterial).toHaveProperty('material');
        // Vérifiez que le prêt de matériel a été correctement enregistré dans la base de données
        const savedLendMaterial = yield LendMaterials_1.default.findById(lendMaterial._id);
        expect(savedLendMaterial).toBeTruthy();
    }));
    it('devrait renvoyer une erreur 404 si le matériel n\'existe pas', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentMaterialId = 'non_existent_id'; // Utilisez un ID qui n'existe pas
        const response = yield request
            .post(`/lend/${nonExistentMaterialId}`)
            .send({
            email: 'klecorf@normandiewebschool.fr',
        })
            .expect(404);
        expect(response.body).toHaveProperty('error', 'Matériel non trouvé');
    }));
});
