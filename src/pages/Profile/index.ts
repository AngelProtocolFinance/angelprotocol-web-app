import type { RouteObject } from "@remix-run/react";
import { convert } from "helpers/route";
import { bodyRoute } from "./Body";

export const profileRoute: RouteObject = {
  lazy: () => import("./Profile").then(convert),
  children: [bodyRoute],
};
