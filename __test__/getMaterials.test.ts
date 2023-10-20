import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import { app } from '../index';
import "./setupBDD";
import { 
  connect,
  clearDatabase,
  closeDatabase
 } from "../__test__/setupBDD";

const mongod = MongoMemoryServer.create();


const request = supertest(app);

describe('Integration Test', () => {

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

  it('GET /api/materials should return a list of materials', async () => {
    const response = await request.get('/api/materials');
    const data = response.body;

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);

    const expectedMaterials = data;

    data.forEach((material: any, index: number) => {
      expect(material).toEqual({
        _id: expectedMaterials[index]._id,
        description: expectedMaterials[index].description,
        name: expectedMaterials[index].name,
        __v: expectedMaterials[index].__v,
      });
    });
  });
});
