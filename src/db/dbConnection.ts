import { MongoClient } from "mongodb";

var collection:any;
const connectToDB = async () => {
  const DB_URL: string = String(process.env.DB_URL);
  const DB_NAME: string = String(process.env.DB_NAME);
  const DB_COLLECTION: string = String(process.env.DB_COLLECTION);
  console.log(typeof process.env.DB_URL)
  console.log(DB_URL)
  try {

    const client = new MongoClient(DB_URL);
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection(DB_COLLECTION);
    console.log("DB Connected")
  } catch (err) {
    console.log(err);
  }
};

export {connectToDB, collection};