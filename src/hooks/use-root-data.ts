import { useRouteLoaderData } from "react-router";
import type { DetailedUser } from "types/auth";

export const useRootData = () => {
  const user = useRouteLoaderData("root") as DetailedUser | null;
  return user;
};
