import { appRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";

export const signUpRoute: RouteObject = {
  path: appRoutes.signup,
  children: [{ index: true, lazy: () => import("./SignupForm") }],
};
