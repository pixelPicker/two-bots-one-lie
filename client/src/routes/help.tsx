import { IoPlay } from "react-icons/io5";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  component: RouteComponent,
});

function RouteComponent() {
  const rules = [
    "Read the chaotic scenario dropped on your screen. Something sus is going on.",
    "Meet your suspects: two bots, both giving confidently different stories.",
    "You get one question for each bot. Choose wisely.",
    "You have total 2 minutes to investigate. After that, guess which bot is lying.",
    "Make your final choice: who's spitting facts and who's failed?",
    "Keep playing and Trust no bot.",
  ];

  return (
    <div className="bg-[url(images\\landing-bg.jpg)] brightness-75 w-screen h-screen bg-cover grid place-items-center !p-32">
      <div className="w-full h-full bg-woo-white/10 backdrop-blur-[5px] rounded-2xl shadow-xl grid place-items-center justify-center">
        <div>
          <h2 className="text-3xl text-center font-Fredoka !pb-8">
            How to Play <IoPlay className="inline" />
          </h2>
          <ol className="list-decimal !pl-6 space-y-2 text-lg font-Fredoka">
  {rules.map((rule, index) => (
    <li key={index}>{rule}</li>
  ))}
</ol>
        </div>
      </div>
    </div>
  );
}
