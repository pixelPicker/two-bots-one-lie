import { FaLocationArrow } from "react-icons/fa6";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/game")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="font-Fredoka bg-[url(images\\landing-bg.jpg)] brightness-75 w-screen h-screen bg-cover grid place-items-center p-24 text-center">
        <h3 className="text-xl animate-pulse">
          Content is Loading... <br />
          Please wait
        </h3>
      </div> 
    );
  }

  return (
    <div className="font-Fredoka bg-[url(images\\landing-bg.jpg)] brightness-75 bg-cover w-screen h-screen flex flex-col gap-4 !p-4">
      <section>
        {/* TODO: ADD THE TIMER */}
        <h1 className="text-5xl text-center font-Orbitron-Bold font-semibold">
          0:69
        </h1>
      </section>

      <div className="flex-1 grid grid-cols-3 gap-8 !px-20">
        <BotOne />

        <SubmitButtons />

        <BotTwo />
      </div>
    </div>
  );
}

function BotOne() {
  const handleBotOneInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: SET THE RESPONSE LATER
    const formData = new FormData(e.currentTarget);
    console.log("Submitted:", formData);
  };

  return (
    <div className="bg-woo-white/20 backdrop-blur-[5px] rounded-2xl flex flex-col shadow-xl">
      <h5 className="!p-4 bg-woo-white/30 rounded-t-2xl text-center text-xl">
        Bot 1
      </h5>
      <div className="overflow-y-scroll flex-1">
        <p className="!pb-2 !pt-6 !px-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          aliquid architecto, molestiae error recusandae praesentium tempora
          rerum nostrum facilis distinctio suscipit maxime, id, tenetur atque.
          Hic itaque sed modi officiis!
        </p>
      </div>
      <form
        onSubmit={handleBotOneInputSubmit}
        className="bg-woo-white/30 rounded-b-2xl text-center flex items-center"
      >
        <input
          type="text"
          name="question"
          required
          maxLength={50}
          placeholder="Ask a question"
          className="!px-4 !py-4 text-base placeholder:text-base flex-1 focus-within:outline-none outline-none"
        />
        <button className="hover:bg-woo-white/40 h-full rounded-br-2xl active:bg-woo-white/70 transition-all">
          <FaLocationArrow className="!mx-4 h-full text-xl cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

function BotTwo() {
  const handleBotTwoInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: SET THE RESPONSE LATER
    const formData = new FormData(e.currentTarget);
    console.log("Submitted:", formData);
  };

  return (
    <div className="bg-woo-white/20 backdrop-blur-[5px] rounded-2xl flex flex-col shadow-xl">
      <h5 className="!p-4 bg-woo-white/30 rounded-t-2xl text-center text-xl">
        Bot 2
      </h5>
      <div className="overflow-y-scroll flex-1">
        <p className="!pb-2 !pt-6 !px-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          aliquid architecto, molestiae error recusandae praesentium tempora
          rerum nostrum facilis distinctio suscipit maxime, id, tenetur atque.
          Hic itaque sed modi officiis!
        </p>
      </div>
      <form
        onSubmit={handleBotTwoInputSubmit}
        className="bg-woo-white/30 rounded-b-2xl text-center flex items-center"
      >
        <input
          type="text"
          name="question"
          required
          maxLength={50}
          placeholder="Ask a question"
          className="!px-4 !py-4 text-base placeholder:text-base flex-1 focus-within:outline-none outline-none"
        />
        <button className="hover:bg-woo-white/40 h-full rounded-br-2xl active:bg-woo-white/70 transition-all">
          <FaLocationArrow className="!mx-4 h-full text-xl cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

function SubmitButtons() {
  return (
    <div className="flex justify-center items-center h-full">
      <button className="border-[2px] font-Fredoka text-lg text-gray-100 text-center rounded-l-full !px-8 !py-3 border-gray-100 bg-dark-red bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300">
        Liar
      </button>

      <button className="border-[2px] font-Fredoka text-lg text-gray-100 text-center rounded-r-full !px-8 !py-3 border-gray-100 bg-dark-red bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300">
        Liar
      </button>
    </div>
  );
}
