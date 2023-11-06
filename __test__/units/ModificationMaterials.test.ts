import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import {
  connect,
  clearDatabase,
  closeDatabase
} from '../setupBDD';

// Tests unitaires pour PUT /api/materials/:id (modification d'un matériau)
describe('PUT /api/materials/:materialId', () => {
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

  it('devrait mettre à jour un matériau existant avec des données valides', async () => {
    // Crée d'abord un matériau existant que vous allez mettre à jour
    const existingMaterialData = {
      name: 'Matériau existant',
      etudiants: 'Description du matériau existant',
      number: 42,
      date: new Date(),
    } as IMaterials;
  
    // Crée le matériau existant dans la base de données
    const existingMaterial = await Material.create(existingMaterialData);
  
    // Données de mise à jour
    const updatedMaterialData = {
      name: 'Nouveau Matériau',
      etudiants: 'Ceci est une mise à jour du matériau de test.',
      number: 55,
      date: new Date(),
    } as IMaterials;

    const response = await request(app)
      .put(`/api/materials/${existingMaterial._id}`)
      .send(updatedMaterialData);
  
    expect(response.status).toBe(200);
  
    expect(response.body).toHaveProperty('material');
    expect(response.body.material.name).toBe(updatedMaterialData.name);
    expect(response.body.material.etudiants).toBe(updatedMaterialData.etudiants);
  
    const updatedMaterial = await Material.findById(existingMaterial._id);
    expect(updatedMaterial).not.toBeNull();
    expect(updatedMaterial?.name).toBe(updatedMaterialData.name);
    expect(updatedMaterial?.etudiants).toBe(updatedMaterialData.etudiants);
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

  it('ne devrait pas mettre à jour un matériau avec un ID introuvable', async () => {
    const nonExistentID = '60b3a16925eae2f9683fe999';

    const response = await request(app)
      .put(`/api/materials/${nonExistentID}`)
      .send({ name: 'Nouveau nom', etudiants: 'Nouvelle description' });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Matériau non trouvé');
  });
});
