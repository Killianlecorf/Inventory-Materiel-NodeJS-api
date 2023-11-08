import supertest from 'supertest';
import { app } from '../../index';
import { connect, clearDatabase, closeDatabase } from '../setupBDD';
import Material from '../../src/Models/Materials.model'; // Assurez-vous d'importer le modèle Material correctement
import LendMaterial from '../../src/Models/LendMaterials'; // Assurez-vous d'importer le modèle LendMaterial correctement

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

describe('getLendMaterialsByMaterialId', () => {
  it('devrait récupérer les prêts de matériel avec succès', async () => {
    const material = new Material({
      name: 'écran',
      etudiants: 'étudiant1',
      number: 1,
      date: new Date(),
    });
    await material.save();

    const lendMaterial = new LendMaterial({
      material: material._id,
      email: 'klecorf@normandiewebschool.fr',
      date: new Date(),
    });
    await lendMaterial.save();

    const response = await request
      .get(`/api/lend/material/${material._id}`)
      .expect(200);

    const lendMaterials = response.body;
    expect(Array.isArray(lendMaterials)).toBe(true);
    expect(lendMaterials.length).toBe(1);
  });

  it('devrait renvoyer une erreur 404 si aucun prêt de matériel n\'est trouvé', async () => {
    const nonExistentMaterialId = '123456789012345678901235'; 

    const response = await request
      .get(`/api/lend/material/${nonExistentMaterialId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Aucun prêt de matériel trouvé pour cet ID de matériel.');
  });

  it('devrait renvoyer une erreur 404 si l\'ID du matériel n\'a pas 24 caractères', async () => {
    const invalidMaterialId = '12345678901234567890123'; // ID de 23 caractères
  
    const response = await request
      .get(`/api/lend/material/${invalidMaterialId}`)
      .expect(404);
  
    expect(response.body).toHaveProperty('error', 'ID de matériel non valide');
  });
});
