import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@models/user";
import { Client } from "@models/client";
import { ENV } from "./constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [User, Client],
  synchronize: true,
});
