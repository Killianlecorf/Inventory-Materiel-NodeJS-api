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
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
require("../src/Models/Materials.model");
describe('Integration Test', () => {
    const baseUrl = 'http://localhost:5252';
    it('GET /api/materials should return a list of materials', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${baseUrl}/api/materials`;
        const expectedMaterials = [
            { id: 1, name: 'Material 1', description: 'Description 1' },
            { id: 2, name: 'Material 2', description: 'Description 2' },
        ];
        const response = yield fetch(url);
        const data = yield response.json();
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        data.forEach((material, index) => {
            expect(material).toEqual(expect.objectContaining({
                id: expectedMaterials[index].id,
                name: expectedMaterials[index].name,
                description: expectedMaterials[index].description,
            }));
        });
    }));
    it('GET /api/invalid-endpoint should return status 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${baseUrl}/api/invalid-endpoint`;
        const response = yield fetch(url);
        expect(response.status).toBe(404);
    }));
    it('GET /api/materials should return status 500 on server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${baseUrl}/api/materials`;
        // Supposons que le serveur renvoie un statut 500 en cas d'erreur interne
        const response = yield fetch(url);
        expect(response.status).toBe(500);
    }));
});
