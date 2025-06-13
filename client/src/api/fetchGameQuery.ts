import { useQuery } from "@tanstack/react-query";

export type GameResponse = {
  scenario: string;
  bot1Statement: string;
  bot2Statement: string;
  questionId: string;
  bot1Question: string | null;
  bot1Response: string | null;
  bot2Question: string | null;
  bot2Response: string | null;
  actualAnswer: "bot1" | "bot2" | null;
  result: boolean | null;
};

export const fetchNewGameQuery = () => {
  return useQuery<GameResponse>({
    queryKey: ["game-start"],
    queryFn: async function () {
      const res = await fetch("http://localhost:3000/game/start");
      if (!res.ok) {
        throw new Error("Failed to start a new game. Please try again later");
      }
      const body = await res.json();
      return body.data;
    },
    gcTime: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
