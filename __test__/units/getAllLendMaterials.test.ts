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

describe('getAllLendMaterials', () => {
    it('devrait récupérer tous les prêts de matériel avec succès', async () => {
        const materialId1 = new mongoose.Types.ObjectId();
        const materialId2 = new mongoose.Types.ObjectId();
    
        const lendMaterial1 = new LendMaterial({
          material: materialId1,
          email: 'user1@example.com',
          date: new Date(),
        });
    
        const lendMaterial2 = new LendMaterial({
          material: materialId2,
          email: 'user2@example.com',
          date: new Date(),
        });
    
        await lendMaterial1.save();
        await lendMaterial2.save();
    
        const response = await request
          .get('/api/lend/')
          .expect(200);
    
        const lendMaterials = response.body;
        expect(Array.isArray(lendMaterials)).toBe(true);
        expect(lendMaterials.length).toBe(2);
      });
});
