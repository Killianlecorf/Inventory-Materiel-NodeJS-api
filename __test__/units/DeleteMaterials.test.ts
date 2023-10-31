import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import {
  connect,
  clearDatabase,
  closeDatabase
} from '../setupBDD';

describe('DELETE /materials', () => {
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
      description: 'Description du matériau de test',
    } as IMaterials;

    const createdMaterial = await Material.create(materialData);

    const response = await request(app)
      .delete(`/api/materials/${createdMaterial._id}`);

    expect(response.status).toBe(204); // Le statut 204 signifie que la ressource a été supprimée
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

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('ID invalide');
  });
});
