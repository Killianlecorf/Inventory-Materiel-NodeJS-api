import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import { app } from '../index';
import Material from "../src/Models/Materials.model";

const mongod = MongoMemoryServer.create();

export const connect = async () => {
  const uri = (await mongod).getUri();
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const request = supertest(app);

describe('Integration Test', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('GET /api/materials/:id should return a material with a specific ID', async () => {
    const newMaterial = new Material({
      name: 'Test Material',
      description: 'This is a test material',
    });
    const savedMaterial = await newMaterial.save();

    const response = await request.get(`/api/materials/${savedMaterial._id}`);
    const material = response.body;

    expect(response.status).toBe(200);
    expect(material).toEqual({
      _id: savedMaterial._id.toString(),
      name: savedMaterial.name,
      description: savedMaterial.description,
      __v: savedMaterial.__v,
    });
  });
});
