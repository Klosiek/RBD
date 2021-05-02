import "reflect-metadata";
import { userName, password, connectionString } from "./constants";
import { createConnection } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: connectionString,
    username: userName,
    password: password,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const repository = conn.getRepository(User);

  const mati = new User();
  mati.firstName = "Mateusz";
  mati.lastName = "Karakan";
  mati.isActive = mati.lastName.toLocaleLowerCase().substr(0, 4) === "kara";

  await repository.save(mati);

  const getUsers = await User.find();

  console.dir(getUsers);
};

main();
