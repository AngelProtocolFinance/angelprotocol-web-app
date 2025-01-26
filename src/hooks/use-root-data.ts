import { useRouteLoaderData } from "@remix-run/react";
import type { DetailedUser } from "types/auth";

export const useRootData = () => {
  const user = useRouteLoaderData("root") as DetailedUser | null;
  return user;
};
