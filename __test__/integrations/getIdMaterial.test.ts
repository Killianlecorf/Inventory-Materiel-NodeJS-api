import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model'; // Assurez-vous que le nom du modèle est correct
import { connect, closeDatabase, clearDatabase } from '../setupBDD';

describe('GET /api/materials/:materialId', () => {

  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('devrait récupérer un matériau par ID', async () => {
    const materialData = {
      name: 'Matériau de test',
      etudiants: 'Description du matériau de test',
      number: 42,
      date: new Date(),
    } as IMaterials;
  
    const createdMaterial = await Material.create(materialData);
    const savedMaterialId = createdMaterial.id;
  
    console.log('Saved Material ID:', savedMaterialId);
  
    const response = await request(app)
      .get(`/api/materials/${savedMaterialId}`);
  
    console.log('Response:', response.status, response.body);
  
    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions pour vérifier les données renvoyées
  });
  
  

  it('devrait renvoyer une erreur 404 si l\'ID du matériau n\'existe pas', async () => {
    const nonExistentId = 'invalid-id'; 
    const response = await request(app)
      .get(`/api/materials/${nonExistentId}`)
      .expect(404);

    expect(response.body.error).toEqual('Matériau non trouvé');
  });
});
