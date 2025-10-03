import { useRouteLoaderData } from "react-router";
import type { Route } from "../+types/root";

export const use_root_data = () =>
  useRouteLoaderData<Route.ComponentProps["loaderData"]>("root");
