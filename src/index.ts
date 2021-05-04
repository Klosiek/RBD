import "reflect-metadata";
import { userName, password, connectionString } from "./constants";
import { createConnection } from "typeorm";
import express from "express";
import { HistoricalData } from "./entities/HistoricalData";
import { Bill } from "./entities/Bill";
import { RequestData } from "./models/RequestData";
import { ServiceProvidersDictionary } from "./entities/ServiceProvidersDictionary";
import { ProvidersData } from "./models/ProvidersData";
import { RenovationFund } from "./entities/RenovationFund";

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
    entities: [
      HistoricalData,
      Bill,
      ServiceProvidersDictionary,
      RenovationFund,
    ],
    extra: {
      connectionLimit: 2,
      max: 2,
      poolSize: 2,
      connectionTimeoutMillis: 1000,
    },
  });

  const repo = conn.getRepository(HistoricalData);
  const repoServiceProviders = conn.getRepository(ServiceProvidersDictionary);
  const repoRenovation = conn.getRepository(RenovationFund);

  const addHistoricalDataToDatabase = async (data: RequestData) => {
    // const xd = data.Data.map((x) => {
    //   repo.save(x);
    //   repoRenovation.save({
    //     OwnerId: x.OwnerId,
    //     RenovationFundContribution: x.RenovationFundContribution,
    //     PaymentDate: Date.now(),
    //   });
    // });
    // await Promise.all(xd);

    for (const item of data.Data) {
      repo.save(item);
      repoRenovation.save({
        OwnerId: item.OwnerId,
        RenovationFundContribution: item.RenovationFundContribution,
        PaymentDate: new Date().toISOString(),
      });
    }
  };

  const addDictionaryTable = (data: ProvidersData) => {
    repoServiceProviders.save(data.Data);
  };

  app.post("/", (req, res) => {
    console.dir(req.body);
    addHistoricalDataToDatabase(req.body);
    res.send("git");
  });

  app.post("/providers", (req, res) => {
    console.dir(req.body);
    addDictionaryTable(req.body);
    res.send("git");
  });
};

main();
