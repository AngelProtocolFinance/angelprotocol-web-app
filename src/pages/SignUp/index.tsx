import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import { Outlet, type RouteObject } from "react-router";

export const signUpRoute: RouteObject = {
  path: appRoutes.signup,
  errorElement: <ErrorElement />,
  element: (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      <Seo title="Sign Up - Better Giving" />
      <Outlet />
    </div>
  ),
  children: [
    { index: true, lazy: () => import("./SignupForm") },
    {
      path: "confirm",
      lazy: () => import("./confirm-form"),
    },
    { path: "success", lazy: () => import("./Success") },
  ],
};
