import "module-alias/register";

import app from "./app";
import { ENV } from "@utils/constants";
import Logger from "@utils/logger";
import { AppDataSource } from "@utils/data-source";

const startServer = async () => {
  AppDataSource.initialize()
    .then(() => {
      app.listen(ENV.PORT, ENV.HOST, () => {
        Logger.info(`Server is running at http://${ENV.HOST}:${ENV.PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error starting the server:", error);
    });
};

startServer();
