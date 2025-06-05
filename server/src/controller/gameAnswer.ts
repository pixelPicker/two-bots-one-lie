import { Request, Response } from "express";
import z from "zod";
import logger from "../config/logger.js";
import { catchDrizzzzzleError } from "../utils/catchError.js";
import { db } from "../db/db.js";
import { gameRounds } from "../db/schema.js";
import { eq } from "drizzle-orm";

const questionRequestSchema = z.object({
  answer: z.enum(["bot1", "bot2"]),
});

export const answerController = async (req: Request, res: Response) => {
  const gameId = req.params.gameId;

  const bodyParseResult = questionRequestSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    const formattedError = bodyParseResult.error.format()._errors.join(". ");
    logger.warn({ error: formattedError });
    res.status(400).json({ error: formattedError });
    return;
  }

  const [fetchGameError, fetchedGame] = await catchDrizzzzzleError(
    db
      .select()
      .from(gameRounds)
      .where(eq(gameRounds.questionId, gameId))
      .limit(1)
  );

  if (fetchGameError || !fetchedGame) {
    logger.warn({
      error: "Failed to fetch game",
      errorMessage: fetchGameError?.message,
      game: fetchedGame,
    });
    res
      .status(500)
      .json({ error: "Couldn't submit request. Please try again later" });
    return;
  }

  if (fetchedGame[0].answer) {
    res.status(400).json({ error: "An answer has already been submitted" });
    return;
  }

  const [updateGameDataError, updatedGameData] = await catchDrizzzzzleError(
    db
      .update(gameRounds)
      .set({
        answer: bodyParseResult.data.answer,
        result: fetchedGame[0].actualAnswer === bodyParseResult.data.answer,
      })
      .where(eq(gameRounds.questionId, gameId))
      .returning()
  );

  if (updateGameDataError || !updatedGameData) {
    logger.warn({
      error: "Failed to update db",
      errorMessage: updateGameDataError?.message,
      gameData: updatedGameData,
    });
    res
      .status(500)
      .json({ error: "Couldn't submit request. Please try again later" });
    return;
  }

  if (fetchedGame[0].actualAnswer === bodyParseResult.data.answer) {
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
};
