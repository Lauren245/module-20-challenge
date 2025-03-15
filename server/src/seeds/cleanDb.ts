import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: keyof typeof models, collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model) {
      throw new Error(`Model ${modelName} does not exist.`);
    }

    // Ensure model.db and model.db.db exist before proceeding
    if (!model.db?.db) {
      throw new Error(`Database connection for model ${modelName} is not properly initialized.`);
    }

    const modelExists = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};