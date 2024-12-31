import { convert } from "helpers/route";
import type { RouteObject } from "react-router";
import { bodyRoute } from "./Body";

export const profileRoute: RouteObject = {
  lazy: () => import("./Profile").then(convert),
  children: [bodyRoute],
};
