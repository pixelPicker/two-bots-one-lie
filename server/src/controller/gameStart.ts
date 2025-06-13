import { Request, Response } from "express";
import z from "zod/v4";
import { catchDrizzzzzleError } from "../utils/catchError.js";
import { db } from "../db/db.js";
import { gameRounds } from "../db/schema.js";

const botResponseSchema = z.object({
  scenario: z.string(),
  bot1Statement: z.string(),
  bot2Statement: z.string(),
  actualAnswer: z.enum(["bot1", "bot2"]),
});

const botPrompt = {
  model: process.env.CHATBOT_NAME,
  prompt:
    'You"re generating content for a game called "2 Bots 1 Lie". Generate a **realistic and thought-provoking scenario** where two AI bots respond to a situation, but one of them is lying. The responses should reflect their reasoning or opinion, and the lie should be subtle—not obvious or exaggerated. Requirements: - Start with a **1-2 sentence scenario** describing a situation or dilemma. - Then, write **2 bot statements** in response to that scenario. - One of the bot responses must be a lie while other must be saying the truth. The lie should be believable and slightly misleading, not absurd. - Do **not** label which bot is lying. - Keep language clear and conversational. Return the result in JSON format only with the following structure only { "scenario": "<scenario>", "bot1Statement": "<statement>", "bot2Statement": "<statement>", "actualAnswer": <"the bot lying">, } ',
  stream: false,
  format: z.toJSONSchema(botResponseSchema),
};

export const gameStartController = async (req: Request, res: Response) => {
  const botRes = await fetch(process.env.CHATBOT_URL!, {
    method: "POST",
    body: JSON.stringify(botPrompt),
  });
  if (!botRes.ok || !botRes.body) {
    res.status(500).json({
      error: "Cannot generate response at the moment. Please try again later",
    });
    return;
  }

  const botResBody = await botRes.json();
  const botResponse = JSON.parse(botResBody.response);

  const parseResult = botResponseSchema.safeParse(botResponse);

  if (!parseResult.success) {
    res.status(500).json({ error: parseResult.error.message });
    return;
  }

  const [insertGameRoundError, gameRound] = await catchDrizzzzzleError(
    db
      .insert(gameRounds)
      .values({
        scenario: parseResult.data.scenario,
        bot1Statement: parseResult.data.bot1Statement,
        bot2Statement: parseResult.data.bot2Statement,
        actualAnswer: parseResult.data.actualAnswer,
      })
      .returning()
  );
  if (insertGameRoundError || !gameRound) {
    res.status(500).json({
      error: "Cannot generate response at the moment. Please try again later",
    });
    return;
  }

  const { actualAnswer, ...gameData } = gameRound[0];
  res.status(200).json({ data: gameData });
  return;
};
