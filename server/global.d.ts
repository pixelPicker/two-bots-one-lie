declare global {
  interface GameResponse {
    questionId: string;
    scenario: string;
    bot1Statement: string;
    bot1Question: string | null;
    bot1Response: string | null;
    bot2Statement: string;
    bot2Question: string | null;
    bot2Response: string | null;
    answer: "bot1" | "bot2" | null;
    actualAnswer: "bot1" | "bot2";
    result: boolean | null;
  }
}

export {};
