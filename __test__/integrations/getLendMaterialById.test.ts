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

describe('getLendMaterialById', () => {
    it('devrait récupérer un prêt de matériel avec succès', async () => {
        const validObjectId = new mongoose.Types.ObjectId(); // Crée un nouvel ObjectId valide
    
        const lendMaterial = new LendMaterial({
          material: validObjectId,
          email: 'user1@example.com',
          date: new Date(),
        });
    
        await lendMaterial.save();
    
        const response = await request
          .get(`/api/lend/${lendMaterial._id}`)
          .expect(200);
    
        const returnedLendMaterial = response.body;
        expect(returnedLendMaterial).toHaveProperty('material', validObjectId.toString());
        expect(returnedLendMaterial).toHaveProperty('email', 'user1@example.com');
      });

  it('devrait renvoyer une erreur 404 si le prêt de matériel n\'existe pas', async () => {
    const nonExistentLendMaterialId = '123456789012345678901235'; 

    const response = await request
      .get(`/api/lend/${nonExistentLendMaterialId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
  });

  it('devrait renvoyer une erreur 404 en cas d\'échec de récupération du prêt de matériel', async () => {
    // Simuler une erreur en vidant la base de données
    await clearDatabase();

    const response = await request
      .get('/api/lend/123456789012345678901235')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Prêt de matériel non trouvé');
  });

  it('devrait renvoyer une erreur 404 si l\'ID du matériel n\'a pas 24 caractères', async () => {
    const invalidMaterialId = '12345678901234567890123'; // ID de 23 caractères
  
    const response = await request
      .get(`/api/lend/${invalidMaterialId}`)
      .expect(404);
  
    expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
  });
});
