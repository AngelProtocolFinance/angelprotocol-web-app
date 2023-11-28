import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  return (
    <div className="w-full grid content-start pb-16">
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-x-8 content-start padded-container min-h-screen">
        <Toolbar classes="my-10" />
        <Cards />
      </div>
    </div>
  );
}
