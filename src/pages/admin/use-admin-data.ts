import { useRouteLoaderData } from "@remix-run/react";
import type { LoaderData } from "./types";

export const use_admin_data = (): LoaderData | undefined => {
  return useRouteLoaderData("admin") as any;
};
