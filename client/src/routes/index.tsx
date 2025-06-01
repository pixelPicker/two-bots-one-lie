import { RiRobotFill } from "react-icons/ri";
import { RiRobotLine } from "react-icons/ri";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[url(images\\landing-bg.jpg)] brightness-75 w-screen h-screen bg-cover grid place-items-center p-24">
      <div className="w-full absolute h-full backdrop-blur-[1px]"></div>
      <img src="\logos\logo.svg" className="scale-300"/>
      <div className="grid  gap-4 z-10">
        <Link to="/" className="border-[2px] font-Fredoka text-xl text-gray-100 text-center rounded-full !px-12 !py-4 border-gray-100 bg-rich-blue bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300">
          Start Game
        </Link>
        <Link to="/help" className="border-[2px] font-Fredoka text-xl text-gray-100 text-center rounded-full !px-12 !py-4 border-gray-100 bg-rich-blue bg-radial-[at_25%_100%] bg-size-[200%] from-gray-100/50 via-gray-100/50 via-10% to-gray-100/10 to-25% inset-shadow-sm inset-shadow-gray-300/75 shadow-lg hover:scale-110 active:scale-90 transition-all duration-300">
          Help
        </Link>
      </div>
    </div>
  );
}
