import supertest from 'supertest';
import { app } from '../../index';
import { connect, clearDatabase, closeDatabase } from '../setupBDD';
import LendMaterial from '../../src/Models/LendMaterials';
import mongoose from 'mongoose';

const request = supertest(app);

beforeAll(async () => {
  await connect();
  console.log('connected');
});

afterEach(async () => {
  await clearDatabase();
  console.log('cleared');
});

afterAll(async () => {
  await closeDatabase();
  console.log('closed');
});

describe('deleteLendMaterial', () => {
  it('devrait supprimer un prêt de matériel avec succès', async () => {
    const validObjectId = new mongoose.Types.ObjectId();

    const lendMaterial = new LendMaterial({
      material: validObjectId,
      email: 'user1@example.com',
      date: new Date(),
    });

    await lendMaterial.save();

    const response = await request
      .delete(`/api/lend/${lendMaterial._id}`)
      .expect(204);

    expect(response.status).toBe(204);
  });

  it("devrait renvoyer une erreur 404 si le prêt de matériel n'est pas trouvé", async () => {
    const nonExistentLendMaterialId = '123456789012345678901235';

    const response = await request
      .delete(`/api/lend/${nonExistentLendMaterialId}`)
      .expect(404);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
  });

  it('devrait renvoyer une erreur 404 en cas d\'ID de matériel non valide', async () => {
    const invalidLendMaterialId = 'invalid_id';

    const response = await request
      .delete(`/api/lend/${invalidLendMaterialId}`)
      .expect(404);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
  });
});
