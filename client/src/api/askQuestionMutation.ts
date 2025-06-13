import { QueryClient, useMutation } from "@tanstack/react-query";
import type { GameResponse } from "./fetchGameQuery";

export const askQuestionMutation = ({
  setErrorMessage,
  setGameData,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setGameData: React.Dispatch<React.SetStateAction<GameResponse | null>>;
}) => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["ask-question"],
    mutationFn: async function ({
      toBot,
      question,
      gameId,
    }: {
      toBot: "bot1" | "bot2";
      question: string;
      gameId: string;
    }): Promise<GameResponse> {
      const res = await fetch(`http://localhost:3000/game/${gameId}/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toBot,
          question,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to post question. Please try again");
      }
      const body = await res.json();
      return body.data;
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: (data) => {
      setGameData(data);
    },
  });
};
