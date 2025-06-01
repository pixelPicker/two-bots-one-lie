import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[url(images\\landing-bg.jpg)] brightness-75 w-screen h-screen bg-cover grid place-items-center p-24">
      
    </div>
  );
}
