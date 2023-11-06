import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import {
  connect,
  clearDatabase,
  closeDatabase
} from '../setupBDD';

describe('DELETE /api/materials/:materialId', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('devrait supprimer un matériau par ID', async () => {
    const materialData = {
      name: 'Matériau de test',
      etudiants: 'killian',
      number: 42,
      date: new Date(),
    } as IMaterials;

    const createdMaterial = await Material.create(materialData);

    const response = await request(app)
      .delete(`/api/materials/${createdMaterial._id}`);

    expect(response.status).toBe(204);
  });

  it('ne devrait pas supprimer un matériau inexistant par ID', async () => {
    const nonExistentID = '60b3a16925eae2f9683fe999';

    const response = await request(app)
      .delete(`/api/materials/${nonExistentID}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Matériau non trouvé');
  });

  it('ne devrait pas supprimer un matériau avec un ID invalide', async () => {
    const invalidID = 'invalid_id';
  
    const response = await request(app)
      .delete(`/api/materials/${invalidID}`);
  
    expect(response.status).toBe(404); 
    expect(response.body.error).toBe('Matériau non trouvé');
  });
});
