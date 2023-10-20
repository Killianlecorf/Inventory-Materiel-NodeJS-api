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
        console.log("connected");
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.clearDatabase)();
        console.log("cleared");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.closeDatabase)();
        console.log("closed");
    }));
    it('GET /api/materials should return a list of materials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/materials');
        const data = response.body;
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        const expectedMaterials = data;
        data.forEach((material, index) => {
            expect(material).toEqual({
                _id: expectedMaterials[index]._id,
                description: expectedMaterials[index].description,
                name: expectedMaterials[index].name,
                __v: expectedMaterials[index].__v,
            });
        });
    }));
});
