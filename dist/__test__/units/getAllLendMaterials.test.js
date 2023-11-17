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
describe('getAllLendMaterials', () => {
    it('devrait récupérer tous les prêts de matériel avec succès', () => __awaiter(void 0, void 0, void 0, function* () {
        const materialId1 = new mongoose_1.default.Types.ObjectId();
        const materialId2 = new mongoose_1.default.Types.ObjectId();
        const lendMaterial1 = new LendMaterials_1.default({
            material: materialId1,
            email: 'user1@example.com',
            date: new Date(),
        });
        const lendMaterial2 = new LendMaterials_1.default({
            material: materialId2,
            email: 'user2@example.com',
            date: new Date(),
        });
        yield lendMaterial1.save();
        yield lendMaterial2.save();
        const response = yield request
            .get('/api/lend/')
            .expect(200);
        const lendMaterials = response.body;
        expect(Array.isArray(lendMaterials)).toBe(true);
        expect(lendMaterials.length).toBe(2);
    }));
});
