import "dotenv/config";
import logger from "./config/logger.js";
import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";

import GameRoutes from "./routes/gameRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(pinoHttp({ logger }));

app.get("/", (req, res) => {
  res.status(200).send("Yoink");
});
app.use(GameRoutes);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
  console.log(`App listening on port ${port}`);
});
