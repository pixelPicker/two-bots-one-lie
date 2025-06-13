import { FaLocationArrow } from "react-icons/fa6";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fetchNewGameQuery, type GameResponse } from "@/api/fetchGameQuery";
import { useEffect, useRef, useState } from "react";
import { askQuestionMutation } from "@/api/askQuestionMutation";
import type { UseMutationResult } from "@tanstack/react-query";
import { answerMutation } from "@/api/answerMutation";

export const Route = createFileRoute("/game")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showScenarioDialog, setShowScenarioDialog] = useState(true);
  const navigate = useNavigate();
  const [gameTimer, setGameTimer] = useState(90);
  const [errorMessage, setErrorMessage] = useState<string | null>("null");
  const [gameData, setGameData] = useState<GameResponse | null>(null);

  const query = fetchNewGameQuery();

  const mutation = askQuestionMutation({ setErrorMessage, setGameData });

  useEffect(() => {
    // * Return if game isn't started yet and timer is 0
    if (!gameData) {
      return;
    }
    if(gameData && gameTimer <= 0) {
      navigate({to: "/notCompleted"})
    }
    const interval = setInterval(() => {
      setGameTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [query.data, gameTimer]);

  // * QUESTION ERROR DIALOG TIMEOUT
  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timeout = setTimeout(() => {
      setErrorMessage(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage]);

  useEffect(() => {
    if (query.data && !gameData) {
      setGameData(query.data);
    }
  }, [query.data]);

  if (query.isLoading) {
    return (
      <div className="font-Fredoka bg-[url('/images/landing-bg.jpg')] brightness-75 w-screen h-screen bg-cover grid place-items-center p-24 text-center">
        <h3 className="text-xl animate-pulse">
          Content is Loading... <br />
          Please wait
        </h3>
      </div>
    );
  }

  if (query.isError || !query.data) {
    <div className="font-Fredoka bg-[url('/images/landing-bg.jpg')] brightness-75 w-screen h-screen bg-cover grid place-items-center p-24 text-center">
      <h3 className="text-xl !pb-4">
        An error occurred. <br />
        Please try again later
      </h3>
      <button
        className="!px-3 !py-1 bg-deep-blue border-[2px] border-woo-white"
        onClick={() => {
          query.refetch();
        }}
      >
        Retry
      </button>
    </div>;
  }

  if (gameData) {
    return (
      <div className="font-Fredoka bg-[url('/images/landing-bg.jpg')] brightness-75 bg-cover w-screen h-screen grid place-items-center gap-4 !p-4">
        {showScenarioDialog ? (
          // * Scenario here
          <div className="bg-woo-white/10 backdrop-blur-[5px] rounded-2xl shadow-xl !p-4 ">
            <h2 className="text-2xl font-semibold !mb-3">Scenario</h2>
            <p className="text-gray-800 w-[50ch] !mb-3">{gameData.scenario}</p>
            <button
              className="!ml-auto border-[2px] font-Fredoka text-gray-100 text-center rounded-full !px-6 !py-2 border-gray-100 bg-rich-blue bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300 block"
              onClick={() => setShowScenarioDialog(false)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col !px-4">
            <section>
              <h1 className="text-5xl text-center font-Orbitron-Bold font-semibold">
                {gameTimer}
              </h1>
            </section>

            <div className="flex-1 grid grid-cols-3 gap-8">
              <BotOne data={gameData} mutation={mutation} />

              <SubmitButtons
                data={gameData}
                setShowScenarioDialog={setShowScenarioDialog}
                setErrorMessage={setErrorMessage}
              />

              <BotTwo data={gameData} mutation={mutation} />
            </div>
          </div>
        )}
        {errorMessage && (
          <p className="fixed top-9/10 left-1/2 -translate-1/2 !p-3 rounded-lg bg-woo-white/80 text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
}

function BotOne({
  data,
  mutation,
}: {
  data: GameResponse;
  mutation: UseMutationResult<
    GameResponse,
    Error,
    {
      toBot: "bot1" | "bot2";
      question: string;
      gameId: string;
    },
    unknown
  >;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleBotOneInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    const question = inputRef.current.value;
    inputRef.current.value = "";
    mutation.mutate({
      gameId: data.questionId,
      toBot: "bot2",
      question: question,
    });
  };

  return (
    <div className="bg-woo-white/20 backdrop-blur-[5px] rounded-2xl w-full flex flex-col shadow-xl">
      <h5 className="!p-4 bg-woo-white/30 rounded-t-2xl text-center text-xl">
        Bot 1
      </h5>
      <div className="overflow-y-scroll flex-1">
        <p className="!py-2 !mt-4 !px-6 w-4/5">{data.bot1Statement}</p>
        {data.bot1Question && (
          <p className="!py-2 !mt-4 !px-6 w-4/5 !ml-auto !mr-6 rounded-t-lg rounded-bl-lg text-end bg-rich-blue/40">
            {data.bot1Question}
          </p>
        )}
        {data.bot1Response && (
          <p className="!py-2 !mt-4 !px-6 w-4/5">{data.bot1Response}</p>
        )}
      </div>
      <form
        onSubmit={handleBotOneInputSubmit}
        className="bg-woo-white/30 rounded-b-2xl text-center flex items-center"
      >
        <input
          type="text"
          name="question"
          required
          disabled={data.bot1Question ? true : false}
          maxLength={50}
          minLength={2}
          placeholder="Ask a question"
          className="!px-4 !py-4 text-base placeholder:text-base flex-1 focus-within:outline-none outline-none disabled:placeholder:line-through disabled:cursor-not-allowed"
        />
        <button
          disabled={data.bot1Question ? true : false}
          className="hover:bg-woo-white/40 h-full rounded-br-2xl active:bg-woo-white/70 transition-all disabled:cursor-not-allowed cursor-pointer"
        >
          <FaLocationArrow className="!mx-4 h-full text-xl" />
        </button>
      </form>
    </div>
  );
}

function BotTwo({
  data,
  mutation,
}: {
  data: GameResponse;
  mutation: UseMutationResult<
    GameResponse,
    Error,
    {
      toBot: "bot1" | "bot2";
      question: string;
      gameId: string;
    },
    unknown
  >;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleBotTwoInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    const question = inputRef.current.value;
    inputRef.current.value = "";
    mutation.mutate({
      gameId: data.questionId,
      toBot: "bot2",
      question: question,
    });
  };

  return (
    <div className="bg-woo-white/20 backdrop-blur-[5px] rounded-2xl flex flex-col shadow-xl">
      <h5 className="!p-4 bg-woo-white/30 rounded-t-2xl text-center text-xl">
        Bot 2
      </h5>
      <div className="overflow-y-scroll flex-1">
        <p className="!py-2 !mt-4 !px-6 w-4/5">{data.bot2Statement}</p>
        {data.bot2Question && (
          <p className="!py-2 !mt-4 !px-6 w-4/5 !ml-auto !mr-6 rounded-t-lg rounded-bl-lg text-end bg-rich-blue/40">
            {data.bot2Question}
          </p>
        )}
        {data.bot2Response && (
          <p className="!py-2 !mt-4 !px-6 w-4/5">{data.bot2Response}</p>
        )}
      </div>
      <form
        onSubmit={handleBotTwoInputSubmit}
        className="bg-woo-white/30 rounded-b-2xl text-center flex items-center"
      >
        <input
          type="text"
          name="question"
          required
          ref={inputRef}
          disabled={data.bot2Question ? true : false}
          maxLength={50}
          minLength={2}
          placeholder="Ask a question"
          className="!px-4 !py-4 text-base placeholder:text-base flex-1 focus-within:outline-none outline-none disabled:placeholder:line-through disabled:cursor-not-allowed"
        />
        <button
          disabled={data.bot2Question ? true : false}
          className="hover:bg-woo-white/40 h-full rounded-br-2xl active:bg-woo-white/70 transition-all disabled:cursor-not-allowed cursor-pointer"
        >
          <FaLocationArrow className="!mx-4 h-full text-xl" />
        </button>
      </form>
    </div>
  );
}

function SubmitButtons({
  data,
  setShowScenarioDialog,
  setErrorMessage,
}: {
  data: GameResponse;
  setShowScenarioDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();
  const mutation = answerMutation({ navigate, setErrorMessage });

  return (
    <div className="flex justify-center items-center h-full">
      <button
        onClick={() => {
          mutation.mutate({answer: "bot1", gameId: data.questionId});
        }}
        className="border-[2px] font-Fredoka text-lg text-gray-100 text-center rounded-l-full !px-8 !py-3 border-gray-100 bg-dark-red bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300"
        >
        Liar
      </button>

      <button
        onClick={() => {
          mutation.mutate({answer: "bot2", gameId: data.questionId});
        }}
       className="border-[2px] font-Fredoka text-lg text-gray-100 text-center rounded-r-full !px-8 !py-3 border-gray-100 bg-dark-red bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300">
        Liar
      </button>
      <button
        onClick={() => setShowScenarioDialog((prev) => !prev)}
        className="absolute top-9/10 left-1/2 -translate-1/2 bg-woo-white/40 !p-3 rounded-lg backdrop-blur-[2px] shadow-lg"
      >
        See Scenario
      </button>
    </div>
  );
}
