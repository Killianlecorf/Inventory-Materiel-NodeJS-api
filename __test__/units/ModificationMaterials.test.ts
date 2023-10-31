import request from 'supertest';
import { app } from '../../index';
import Material, { IMaterials } from '../../src/Models/Materials.model';
import { 
    connect,
    clearDatabase,
    closeDatabase
   } from "../setupBDD";

// Tests unitaires pour POST /materials (création d'un matériau)
describe('POST /materials/create', () => {
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
      description: 'Ceci est un nouveau matériau de test.',
    } as IMaterials;

    const response = await request(app)
      .post('/api/materials')
      .send(newMaterialData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('material');
    expect(response.body.material.name).toBe(newMaterialData.name);
    expect(response.body.material.description).toBe(newMaterialData.description);

    const createdMaterial = await Material.findOne({
      name: newMaterialData.name,
      description: newMaterialData.description,
    });

    expect(createdMaterial).not.toBeNull();
  });

  it('ne devrait pas créer un matériau avec des données manquantes', async () => {
    const invalidMaterialData: Partial<IMaterials> = {
      description: 'Ceci est un matériau incomplet de test.',
    };

    const response = await request(app)
      .post('/api/materials')
      .send(invalidMaterialData);

    expect(response.status).toBe(400);
  });

  it('ne devrait pas mettre à jour un matériau avec un ID introuvable', (done) => {
    const nonExistentID = '60b3a16925eae2f9683fe999';
  
    request(app)
      .put(`/api/materials/${nonExistentID}`)
      .send({ name: 'Nouveau nom', description: 'Nouvelle description' })
      .expect(404)
      .end((error, response) => {
        if (error) {
          done(error);
        } else {
          if (response.body.error !== 'Matériau non trouvé') {
            done(new Error(`Message d'erreur inattendu : ${response.body.error}`));
          } else {
            done();
          }
        }
      });
  });
});
