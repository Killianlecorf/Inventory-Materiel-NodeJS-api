import request from 'supertest';
import { app } from '../../index'; // Assurez-vous d'importer votre application correctement
import Material, { IMaterials } from '../../src/Models/Materials.model'; // Assurez-vous d'importer votre modèle correctement
import "../setupBDD";
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
  
    // Vérification de l'enregistrement dans la base de données
    const createdMaterial = await Material.findOne({
      name: newMaterialData.name,
      description: newMaterialData.description,
    });
  
    expect(createdMaterial).not.toBeNull(); // Vérifie si le matériau a été trouvé en base de données
  });
  

  it('ne devrait pas créer un matériau avec des données manquantes', async () => {
    const invalidMaterialData: Partial<IMaterials> = {
      // Les données sont incomplètes, ce qui devrait entraîner une erreur
      description: 'Ceci est un matériau incomplet de test.',
    };

    const response = await request(app)
      .post('/materials')
      .send(invalidMaterialData);

    expect(response.status).toBe(404);
  });
});
