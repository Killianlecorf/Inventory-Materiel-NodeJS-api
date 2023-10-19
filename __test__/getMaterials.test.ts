import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const supertest = require("supertest")
import { app } from "../index";

const mongod = MongoMemoryServer.create();
export const connect = async () => {
   const uri = (await mongod).getUri();
   await mongoose.connect(uri);
}
export const closeDatabase = async () => {
   await mongoose.connection.dropDatabase();
   await mongoose.connection.close();
   await (await mongod).stop();
}
export const clearDatabase = async () => {
   const collections = mongoose.connection.collections;
   for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
   }
}

describe('Integration Test', () => {

  beforeAll(async () => {
    await connect()
    console.log("connected");
});
afterEach(async () => {
    await clearDatabase()
    await closeDatabase()
    console.log("cleared");
});


const request = supertest(app);

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
