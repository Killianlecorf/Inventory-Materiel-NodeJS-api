import request from 'supertest'
import { Request, Response } from 'express';
import { createLendMaterial } from '../../src/Controllers/LendMaterials.controller'; 
import Material from '../../src/Models/Materials.model';
import LendMaterial from '../../src/Models/LendMaterials';
import { app } from "../../index";
import {
    connect,
    clearDatabase,
    closeDatabase
  } from '../setupBDD';


beforeAll(async () => {
    await connect();
    console.log("connected");
  });

  afterEach(async () => {
    await clearDatabase();
    console.log("cleared");
  });

  afterAll(async () => {
    await closeDatabase();
    console.log("closed");
  });


const mockRequest = () => ({
  body: {
    email: 'klecorf@normandiewebschool.fr',
  },
  params: {
    materialId: '654b7b2dc0c89c8a35eb2444', 
  },
});

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

describe('createLendMaterial', () => {
    it('devrait créer un prêt de matériel avec succès', async () => {
        // Assurez-vous d'ajouter un enregistrement Material factice dans la base de données
        const material = new Material({
          _id: 'votreIdDeTest',
          // Ajoutez d'autres champs nécessaires ici
        });
        await material.save();
    
        const response = await request(app) // Remplacez `app` par l'instance de votre application Express
          .post('/votre-endpoint-de-création')
          .send({
            email: 'klecorf@normandiewebschool.fr',
            materialId: '654b7b2dc0c89c8a35eb2444',
          });
    
        // Assurez-vous que le statut de réponse est 201 (Created)
        expect(response.status).toBe(201);
    
        // Assurez-vous que la réponse JSON contient les données du prêt de matériel créé
        expect(response.body).toEqual(
          expect.objectContaining({
            email: 'klecorf@normandiewebschool.fr',
            material: 'votreIdDeTest',
          })
        );
      });
});
