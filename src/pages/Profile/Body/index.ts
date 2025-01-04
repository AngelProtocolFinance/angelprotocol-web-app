import type { RouteObject } from "@remix-run/react";
import { convert } from "helpers/route";

export { default } from "./Body";

export const bodyRoute: RouteObject = {
  lazy: () => import("./Body").then(convert),
  children: [
    { index: true, lazy: () => import("./GeneralInfo").then(convert) },
    {
      path: "program/:programId",
      lazy: () => import("./Program").then(convert),
    },
  ],
};
