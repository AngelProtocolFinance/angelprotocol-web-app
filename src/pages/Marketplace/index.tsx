import { useSearchParams } from "react-router-dom";
import Profile from "../Profile";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const [params] = useSearchParams();
  const slug = params.get("slug");

  if (slug) return <Profile slug={slug} />;

  return (
    <div className="w-full grid content-start pb-16">
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        <Cards />
      </div>
    </div>
  );
}
