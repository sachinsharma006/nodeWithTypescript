import { MongoClient } from "mongodb";

var collection:any;
const connectToDB = async () => {
  const DB_URL: string = String(process.env.DB_URL);
  console.log(typeof process.env.DB_URL)
  console.log(DB_URL)
  try {
    const URL =
      "mongodb+srv://sachin006:sachin006@cluster0.hel6j.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(URL);
    await client.connect();
    const db = client.db("TypeScriptTasks");
    collection = db.collection("Tasks");
    console.log("DB Connected")
  } catch (err) {
    console.log(err);
  }
};

export {connectToDB, collection};