import gochiHand from "@fontsource/gochi-hand/index.css?url";
import quicksand from "@fontsource/lexend/index.css?url";
import { metas } from "helpers/seo";
import nProgressStyles from "nprogress/nprogress.css?url";
import { type LinksFunction, type MetaFunction, Outlet } from "react-router";
import ccbase from "vanilla-cookieconsent/dist/cookieconsent.css?url";
import laira from "./assets/images/flying-character.webp";
import cc from "./cookie-consent.css?url";
import tailwind from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: nProgressStyles },
  {
    rel: "stylesheet",
    href: ccbase,
  },
  { rel: "stylesheet", href: cc },
  { rel: "stylesheet", href: quicksand },
  { rel: "stylesheet", href: gochiHand },
];

export const meta: MetaFunction = () => metas({});

export { loader } from "./root-loader";
export { action } from "./root-action";
export { Layout } from "./root-layout";

export function HydrateFallback() {
  return (
    <img
      className="place-self-center animate-pulse"
      src={laira}
      width={300}
      height={300}
    />
  );
}

export { ErrorBoundary } from "components/error";
export default function Root() {
  return <Outlet />;
}
