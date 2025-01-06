import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import nProgressStyles from "nprogress/nprogress.css?url";
import laira from "./assets/images/flying-character.png";
import cc from "./cookie-consent.css?url";
import tailwind from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: cc },
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Quicksand:wght@400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Gochi Hand",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css",
  },
];

export const meta: MetaFunction = () => [
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
  },
  { name: "charset", content: "UTF-8" },
];

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
