import { GiPartyPopper } from "react-icons/gi";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RiRobotFill } from "react-icons/ri";

export const Route = createFileRoute("/result/$hasWon")({
  component: RouteComponent,
});
// TODO: EDIT THE PATH PARAM TO INCLUDE THE WIN OR LUN
function RouteComponent() {
  const hasWon = Route.useParams().hasWon === "true" ? true : false;
  return (
    <div className="bg-[url('/images/landing-bg.jpg')] font-Fredoka brightness-75 w-screen h-screen bg-cover grid place-items-center !p-24 relative">
      <div className="z-10 grid text-center gap-6">
        {hasWon ? (
          <div className="flex items-center gap-4">
            <GiPartyPopper className="text-5xl"/>
            <h1 className=" text-5xl text-black drop-shadow-lg">You won!</h1>
            <GiPartyPopper className="text-5xl rotate-y-180"/>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <RiRobotFill className="text-5xl"/>
            <h1 className=" text-5xl text-black drop-shadow-lg">Bot deceives you!</h1>
            <RiRobotFill className="text-5xl rotate-y-180"/>
          </div>
        )}
        <p className="text-lg text-black">
          {hasWon
            ? "Nice job! You spotted the lying bot."
            : "Better luck next time. One bot fooled you."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 !mt-8">
          <Link
            to="/game"
            className="border-[2px] text-xl text-gray-100 text-center rounded-full !px-8 !py-3 border-gray-100 bg-rich-blue bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300"
          >
            Play Again
          </Link>
          <Link
            to="/"
            className="text-gray-900 underline underline-offset-4 hover:text-black transition"
          >
            Back to Lobby
          </Link>
        </div>
      </div>
    </div>
  );
}
