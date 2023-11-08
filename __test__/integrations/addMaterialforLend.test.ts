import supertest from 'supertest';
import Material from '../../src/Models/Materials.model';
import LendMaterial from '../../src/Models/LendMaterials';
import { app } from '../../index';
import {
  connect,
  clearDatabase,
  closeDatabase,
} from '../setupBDD';

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

describe('createLendMaterial', () => {
  it('devrait créer un prêt de matériel avec succès', async () => {
    const material = new Material({
      name: 'écran',
      etudiants: 'étudiant1',
      number: 1,
      date: new Date(),
    });
    await material.save();

    const response = await request
      .post(`/api/lend/${material._id}`)
      .send({
        email: 'klecorf@normandiewebschool.fr',
      })
      .expect(201);

    const lendMaterial = response.body;
    expect(lendMaterial).toHaveProperty('email', 'klecorf@normandiewebschool.fr');
    expect(lendMaterial).toHaveProperty('material');

    // Vérifiez que le prêt de matériel a été correctement enregistré dans la base de données
    const savedLendMaterial = await LendMaterial.findById(lendMaterial._id);
    expect(savedLendMaterial).toBeTruthy();
  });

  it('devrait renvoyer une erreur 404 si le matériel n\'existe pas', async () => {
    const nonExistentMaterialId = '123456789012345678901235'; 

    const response = await request
      .post(`/api/lend/${nonExistentMaterialId}`)
      .send({
        email: 'klecorf@normandiewebschool.fr',
      })
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Matériel non trouvé' );
  });

  it('devrait renvoyer une erreur 404 si l\'ID du matériel n\'a pas 24 caractères', async () => {
    const invalidMaterialId = '12345678901234567890123'; // ID de 23 caractères
  
    const response = await request
      .post(`/api/lend/${invalidMaterialId}`)
      .send({
        email: 'klecorf@normandiewebschool.fr',
      })
      .expect(404);
  
    expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
  });
});
