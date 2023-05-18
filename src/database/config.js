import Knex from "knex";
import * as dotenv from "dotenv";

export const configureDatabase = () => {
  dotenv.config();
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  return Knex({
    client: "pg",
    debug: true,
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
  });
};
