import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../../index';
import Material, {IMaterials} from "../../src/Models/Materials.model";
import "../setupBDD";
import { 
  connect,
  clearDatabase,
  closeDatabase
 } from "../setupBDD";

const request = supertest(app);

describe('Integration Test', () => {

  beforeAll(async () => {
    await connect();
    console.log("connected");
  });

  afterEach(async () => {
    await clearDatabase();
    console.log("cleared");
  });

  afterAll(async () => {
    await closeDatabase();
    console.log("closed");
  });

  it('devrait récupérer tous les matériaux', async () => {
    const materialData = {
      name: 'Matériau de test',
      etudiants: 'Description du matériau de test',
      number: 42,
      date: new Date(),
    } as IMaterials;

    await Material.create(materialData);

    const response = await supertest(app)
      .get('/api/materials');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('GET /api/materials/:id should return 404 for non-existent ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request.get(`/api/materials/${nonExistentId}`);

    expect(response.status).toBe(404);
  });
});
