import type { MetaFunction } from "@remix-run/react";

export { default } from "./nonprofit-info";

export const meta: MetaFunction = () => [
  {
    title: "For Nonprofits",
    description: "Accept any type of donation, anywhere in the world",
  },
];
