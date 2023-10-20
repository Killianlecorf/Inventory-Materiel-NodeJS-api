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
exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const Materials_model_1 = __importDefault(require("../src/Models/Materials.model"));
const mongod = mongodb_memory_server_1.MongoMemoryServer.create();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = (yield mongod).getUri();
    yield mongoose_1.default.connect(uri);
});
exports.connect = connect;
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield (yield mongod).stop();
});
exports.closeDatabase = closeDatabase;
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany({});
    }
});
exports.clearDatabase = clearDatabase;
const request = (0, supertest_1.default)(index_1.app);
describe('Integration Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.connect)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.clearDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.closeDatabase)();
    }));
    it('GET /api/materials/:id should return a material with a specific ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Créez un document de test dans la base de données
        const newMaterial = new Materials_model_1.default({
            name: 'Test Material',
            description: 'This is a test material',
        });
        const savedMaterial = yield newMaterial.save();
        // Effectuez une requête pour obtenir le document par son ID
        const response = yield request.get(`/api/materials/${savedMaterial._id}`);
        const material = response.body;
        expect(response.status).toBe(200);
        expect(material).toEqual({
            _id: savedMaterial._id.toString(),
            name: savedMaterial.name,
            description: savedMaterial.description,
            __v: savedMaterial.__v,
        });
    }));
});
