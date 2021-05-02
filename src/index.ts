import "reflect-metadata";
import { userName, password, connectionString } from "./constants";
import { createConnection } from "typeorm";
import express from "express";
import { RequestData } from "./models/RequestData";
import { HistoricalData } from "./entities/HistoricalData";
import { Bill } from "./entities/Bill";

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

  const billsRepository = conn.getRepository(Bill);

  const addUserToDatabase = async (req: RequestData) => {
    // if (req.Data) {

    for (const x of req.Data) {
      // await billsRepository.save(x);

      // const newPost = billsRepository.create();

      await billsRepository.save({ ...x.Bills, UserData: x });
    }
    // req.Data.forEach(async (x) => {
    //   await usersRepository.save(x);
    // });

    // await Promise.(promises);
    // }

    // req.data.map((element) => {
    //   usersRepository.save(element);
    // });
  };

  //   const getUsers = await User.find();

  const app = express();
  const port = 3000;
  app.use(express.json());

  app.post("/", (req, res) => {
    console.dir(req.body);
    addUserToDatabase(req.body);
    res.send("zayebiscie");
  });

  app.listen(port);
};

main();
