import { Outlet } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@vercel/remix";
import { metas } from "helpers/seo";
import nProgressStyles from "nprogress/nprogress.css?url";
import ccbase from "vanilla-cookieconsent/dist/cookieconsent.css?url";
import laira from "./assets/images/flying-character.webp";
import cc from "./cookie-consent.css?url";
import tailwind from "./index.css?url";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/quicksand";
import "@fontsource/gochi-hand";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "stylesheet", href: ccbase },
  { rel: "stylesheet", href: cc },
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

export default function Root() {
  return <Outlet />;
}
