import { useMutation } from "@tanstack/react-query";
import type { UseNavigateResult } from "@tanstack/react-router";

export const answerMutation = ({
  setErrorMessage,
  navigate,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  navigate: UseNavigateResult<string>;
}) => {
  return useMutation({
    mutationKey: ["answer-mutation"],
    mutationFn: async function ({
      answer,
      gameId,
    }: {
      answer: "bot1" | "bot2";
      gameId: string;
    }): Promise<boolean> {
      const res = await fetch(`http://localhost:3000/game/${gameId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit answer. PLease try again later");
      }
      const body = await res.json();
      return body.result;
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: (result) => {
      navigate({
        to: "/result/$hasWon",
        params: { hasWon: result ? "true" : "false" },
      });
    },
  });
};
