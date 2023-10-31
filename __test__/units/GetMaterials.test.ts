import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import {
  connect,
  clearDatabase,
  closeDatabase
} from '../setupBDD';

describe('GET /materials', () => {
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
      description: 'Description du matériau de test',
    } as IMaterials;

    const createdMaterial = await Material.create(materialData);

    const response = await request(app) 
      .get(`/api/materials/${createdMaterial._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(materialData.name);
    expect(response.body.description).toBe(materialData.description);
  });

  it('devrait récupérer tous les matériaux', async () => {
    const materialData = {
      name: 'Matériau de test',
      description: 'Description du matériau de test',
    } as IMaterials;

    await Material.create(materialData);

    const response = await request(app) 
      .get('/api/materials');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('ne devrait pas récupérer un matériau inexistant par ID', async () => {
    const nonExistentID = '60b3a16925eae2f9683fe999';

    const response = await request(app)
      .get(`/api/materials/${nonExistentID}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Matériau non trouvé');
  });
});
