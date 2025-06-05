import { pgTable, uuid, text, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const botChoice = pgEnum("bot_choice", ['bot1', 'bot2'])


export const gameRounds = pgTable("game_rounds", {
	questionId: uuid("question_id").defaultRandom().primaryKey().notNull(),
	scenario: text().notNull(),
	bot1Statement: text().notNull(),
	bot1Question: text(),
	bot1Response: text(),
	bot2Statement: text().notNull(),
	bot2Question: text(),
	bot2Response: text(),
	answer: botChoice(),
	result: boolean(),
	actualAnswer: botChoice("actual_answer").notNull(),
});
