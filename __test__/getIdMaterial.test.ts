import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../index';
import Material from "../src/Models/Materials.model";
import "./setupBDD";
import { 
  connect,
  clearDatabase,
  closeDatabase
 } from "../__test__/setupBDD";

const request = supertest(app);

describe('Integration Test', () => {

  beforeAll(async () => {
    await connect()
    console.log("connected");
  });

  afterEach(async () => {
      await clearDatabase()
      console.log("cleared");
  });

  afterAll(async () => {
      await closeDatabase()
      console.log("closed");
  });

  it('GET /api/materials/:id should return a material with a specific ID', async () => {
    const newMaterial = new Material({
      name: 'Test Material',
      description: 'This is a test material',
    });
    const savedMaterial = await newMaterial.save();

    const response = await request.get(`/api/materials/${savedMaterial._id}`);
    const material = response.body;

    expect(response.status).toBe(200);
    expect(material.name).toBe(savedMaterial.name);
    expect(material.description).toBe(savedMaterial.description);
  });

  it('GET /api/materials/:id should return 404 for non-existent ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request.get(`/api/materials/${nonExistentId}`);

    expect(response.status).toBe(404);
  });
});
