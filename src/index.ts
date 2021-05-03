import "reflect-metadata";
import { userName, password, connectionString } from "./constants";
import { createConnection } from "typeorm";
import express from "express";
import { HistoricalData } from "./entities/HistoricalData";
import { Bill } from "./entities/Bill";
import { RequestData } from "./models/RequestData";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(port);

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: connectionString,
    username: userName,
    password: password,
    logging: true,
    synchronize: true,
    entities: [HistoricalData, Bill],
  });

  const repo = conn.getRepository(HistoricalData);

  const addUserToDatabase = async (req: RequestData) => {
    const xd = req.Data.map((x) => repo.save(x));

    await Promise.all(xd);
  };

  app.post("/", (req, res) => {
    console.dir(req.body);
    addUserToDatabase(req.body);
    res.send("git");
  });
};

main();
