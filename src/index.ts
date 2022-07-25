import express, { Request, Response } from "express";
import { connectToDB, collection } from "./db/dbConnection";

const app: express.Application = express();

app.use(express.json());
require("dotenv").config();

//! home route
app.get("/", (req: Request, res: Response) => {
  const data = process.env.DB_URL;
  // console.log(data)
  res.json({ status: "ok" });
});

//! add a task route
app.post("/add", async (req: Request, res: Response) => {
  const { task, id } = req.body;
  const data = await collection.insertOne({
    task,
    id,
    dateOfEntry: new Date().toLocaleDateString(),
  });
  res.json({ status: "ok", action: "task added" });
});

//! delete a specific route
app.delete("/delete/:id", async (req: Request, res: Response) => {
  const data = await collection.deleteMany({
    id: parseInt(req.params.id),
  });

  console.log(req.params.id);
  res.json({ status: "ok", action: "task deleted" });
});

//! get all tasks route
app.get("/tasks", async (req: Request, res: Response) => {
  const data = await collection.find().toArray();
  res.json({ status: "ok", data });
});

//! update a task
app.put("/update/:id", async (req: Request, res: Response) => {
  const { task } = req.body;
  const data = collection.updateOne(
    { id: parseInt(req.params.id) },
    {
      $set: {
        task: task,
      },
    }
  );

  res.json({ status: "ok", action: "Task Updated" });
});

app.listen(8000, () => {
  // console.log(process.env)
  connectToDB();
  console.log(`server Started at ${8000}`);
});
