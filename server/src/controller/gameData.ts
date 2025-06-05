import { Request, Response } from "express";
import { catchDrizzzzzleError } from "../utils/catchError.js";
import { gameRounds } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import logger from "../config/logger.js";

export const gameDataController = async (req: Request, res: Response) => {
  const gameId = req.params.gameId;

  const [fetchGameError, fetchedGame] = await catchDrizzzzzleError(
    db
      .select()
      .from(gameRounds)
      .where(eq(gameRounds.questionId, gameId))
      .limit(1)
  );

  if (fetchGameError || !fetchedGame) {
    logger.warn({
      error: "Failed to fetch game data",
      errorMessage: fetchGameError?.message,
      game: fetchedGame,
    });
    res.status(500).json({ error: "failed to fetch game. Please try again" });
    return;
  }
  res.status(200).json({ data: fetchedGame[0] });
};
