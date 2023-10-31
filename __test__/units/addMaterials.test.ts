import request from 'supertest';
import { app } from '../../index'; 
import Material, { IMaterials } from '../../src/Models/Materials.model'; 
import "../setupBDD";
import { 
  connect,
  clearDatabase,
  closeDatabase
 } from "../setupBDD";

describe('POST /materials/create', () => {

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

  it('devrait créer un nouveau matériau avec des données valides', async () => {
    const newMaterialData = {
      name: 'Nouveau Matériau',
      description: 'Ceci est un nouveau matériau de test.',
    } as IMaterials;
  
    const response = await request(app)
      .post('/api/materials')
      .send(newMaterialData);
  
    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('material');
    expect(response.body.material.name).toBe(newMaterialData.name);
    expect(response.body.material.description).toBe(newMaterialData.description);
  
    const createdMaterial = await Material.findOne({
      name: newMaterialData.name,
      description: newMaterialData.description,
    });
  
    expect(createdMaterial).not.toBeNull();
  });
  

  it('ne devrait pas créer un matériau avec des données manquantes', async () => {
    const invalidMaterialData: Partial<IMaterials> = {
      description: 'Ceci est un matériau incomplet de test.',
    };

    const response = await request(app)
      .post('/materials')
      .send(invalidMaterialData);

    expect(response.status).toBe(404);
  });
});
