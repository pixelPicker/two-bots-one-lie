import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/notCompleted")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[url('/images/landing-bg.jpg')] font-Fredoka brightness-75 w-screen h-screen bg-cover grid place-items-center !p-24 relative">
      <div className="z-10 grid text-center gap-6">
        <h1 className="text-3xl text-black drop-shadow-lg">Time over</h1>
        <div className="grid gap-4 !mt-8">
          <Link
            to="/game"
            className="border-[2px] text-xl text-gray-100 text-center rounded-full !px-8 !py-3 border-gray-100 bg-rich-blue bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300"
          >
            Play Again
          </Link> 
          <Link
            to="/"
            className="text-gray-900 underline hover:text-black transition"
          >
            Back to Lobby
          </Link>
        </div>
      </div>
    </div>
  );
}
