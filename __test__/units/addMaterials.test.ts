import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import "../setupBDD";
import {
  connect,
  clearDatabase,
  closeDatabase
} from "../setupBDD";

describe('POST /api/materials/', () => {

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
      etudiants: 'Ceci est un nouveau matériau de test.',
      number: 42,
      date: new Date(),
    } as IMaterials;
  
    const response = await request(app)
      .post('/api/materials/')
      .send(newMaterialData);
  
    // Assurez-vous que la réponse a un statut 201 (Créé)
    expect(response.status).toBe(201);
  
    // Assurez-vous que les propriétés du matériau correspondent aux données que vous avez envoyées
    expect(response.body.name).toBe(newMaterialData.name);
    expect(response.body.etudiants).toBe(newMaterialData.etudiants);
    expect(response.body.number).toBe(newMaterialData.number);
  });

  it('ne devrait pas créer un matériau avec des données manquantes', async () => {
    const invalidMaterialData: Partial<IMaterials> = {
      etudiants: 'Ceci est un matériau incomplet de test.',
    };

    const response = await request(app)
      .post('/api/materials/create')
      .send(invalidMaterialData);

    expect(response.status).toBe(404);
  });
  
});
