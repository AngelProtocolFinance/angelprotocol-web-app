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
import type { ExternalScriptsHandle } from "remix-utils/external-scripts";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: nProgressStyles },
  {
    rel: "stylesheet",
    href: ccbase,
  },
  { rel: "stylesheet", href: cc },
];

export const meta: MetaFunction = () => metas({});

export const handle: ExternalScriptsHandle = {
  scripts({ location: l }) {
    if (import.meta.env.VITE_ENVIRONMENT !== "production") return [];
    // we don't want bg consent banner showing on donate-widget on NPO's website
    if (l.pathname.startsWith("/donate-widget")) return [];
    return [
      { src: "/cookie-consent.js" },
      { src: "/scripts/cookie-consent.js" },
      //functional cookies
      { src: "/scripts/intercom.js", "data-category": "functional" },
      //analytics
      { src: "/scripts/gtm-init.js", "data-category": "analytics" },

      //tracking
      {
        src: "/scripts/twitter-conversion-tracking.js",
        "data-category": "tracking",
      },
      {
        src: "/scripts/meta-pixel.js",
        "data-category": "tracking",
      },
      { src: "/scripts/linkedin-tracking.js", "data-category": "tracking" },
      { src: "/scripts/hotjar-tracking.js", "data-category": "tracking" },
      {
        id: "hs-script-loader",
        src: "//js-eu1.hs-scripts.com/24900163.js",
        "data-category": "tracking",
      },
    ];
  },
};
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
