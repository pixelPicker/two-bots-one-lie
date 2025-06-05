import express from "express";
import { gameStartController } from "../controller/gameStart.js";
import { answerController } from "../controller/gameAnswer.js";
import { questionController } from "../controller/gameQuestion.js";
import { gameDataController } from "../controller/gameData.js";

const router = express.Router();

router
  .get("game/start", gameStartController)
  .post("game/:gameId/answer", answerController)
  .post("game/:gameId/question", questionController)
  .post("game/:gameId", gameDataController);

export default router;
