import "dotenv/config";
import express from "express";
import logger from "./config/logger.js";
import { pinoHttp } from "pino-http";
const app = express();
const port = 3000;

app.use(express.json());

app.use(pinoHttp({ logger }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Request send successfully" });
});

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
  console.log(`App listening on port ${port}`);
});
