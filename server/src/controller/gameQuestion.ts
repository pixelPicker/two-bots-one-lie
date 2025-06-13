import { Request, Response } from "express";
import z from "zod/v4";
import { catchDrizzzzzleError } from "../utils/catchError.js";
import { db } from "../db/db.js";
import { gameRounds } from "../db/schema.js";
import { eq } from "drizzle-orm";
import logger from "../config/logger.js";

const questionRequestSchema = z.object({
  toBot: z.enum(["bot1", "bot2"]),
  question: z.string().nonempty(),
});

const questionBotResponseSchema = z.object({
  response: z.string(),
});

function botQuestion(
  scenario: string,
  previousBotStatement: string,
  question: string
) {
  return {
    model: process.env.CHATBOT_NAME,
    prompt: `
    You're continuing a round of a game called "2 Bots 1 Lie". The user has been presented with this scenario ${scenario}. Two bots gave initial responses. The user has now asked a follow-up question to one of the bots. Your job is to generate that specific bot's follow-up answer. Be consistent with the bot's original statement — even if it's a lie. Don't contradict the original stance. Respond in a short, clear, and confident way. Here's the previous statement from the bot ${previousBotStatement} and the question asked by the user ${question}. 
    `,
    stream: false,
    format: z.toJSONSchema(questionBotResponseSchema),
  };
}

export const questionController = async (req: Request, res: Response) => {
  const gameId = req.params.gameId;

  const bodyParseResult = questionRequestSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    const formattedError = bodyParseResult.error.message;
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
    res
      .status(500)
      .json({ error: "Cannot send request right now. Please try again later" });
    return;
  }

  if (fetchedGame[0].bot1Question || fetchedGame[0].bot2Question) {
    res.status(400).json({ error: "Only 1 question is allowed per bot" });
    return;
  }

  const questionRes = await fetch(process.env.CHATBOT_URL!, {
    method: "POST",
    body: JSON.stringify(
      botQuestion(
        fetchedGame[0].scenario,
        bodyParseResult.data.toBot === "bot1"
          ? fetchedGame[0].bot1Statement
          : fetchedGame[0].bot2Statement,
        bodyParseResult.data.question
      )
    ),
  });

  if (!questionRes.ok) {
    logger.warn({
      resStatus: questionRes.status,
      errorMessage: "Couldn't fetch chatbot response",
    });
    res.status(500).json({ error: "An error occured. PLease try again later" });
    return;
  }

  const botResBody = await questionRes.json();
  const botResponse = JSON.parse(botResBody.response);
  
  const botResponseParseResult =
    questionBotResponseSchema.safeParse(botResponse);

  if (!botResponseParseResult.success) {
    logger.warn({
      errorMessage: "Invalid format for chatbot response",
      error: botResponseParseResult.error.message,
    });
    res.status(500).json({
      error: "Error while generation response. Please try again later",
    });
    return;
  }

  const [updateGameDataError, updatedGameData] = await catchDrizzzzzleError(
    db
      .update(gameRounds)
      .set(
        bodyParseResult.data.toBot === "bot1"
          ? {
              bot1Question: bodyParseResult.data.question,
              bot1Response: botResponseParseResult.data.response,
            }
          : {
              bot2Question: bodyParseResult.data.question,
              bot2Response: botResponseParseResult.data.response,
            }
      )
      .where(eq(gameRounds.questionId, gameId))
      .returning()
  );

  if (updateGameDataError || !updatedGameData) {
    logger.warn({
      errorWhile: "Updating game data",
      errorMessage: "Couldn't fetch chatbot response",
    });
    res.status(500).json({
      error: "Error while generation response. Please try again later.",
    });
    return;
  }

  const { actualAnswer, ...gameData } = updatedGameData[0];

  res.status(200).json({ data: gameData });
};
