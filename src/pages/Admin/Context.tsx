import type { Endow } from "@better-giving/endowment";
import { useOutletContext } from "@remix-run/react";
import type { UserV2 } from "types/auth";

export type AdminContext = {
  id: number;
  user: UserV2;
  /** need to be awaited */
  endow: Promise<Pick<Endow, "logo" | "name">>;
};

export const useAdminContext = (): AdminContext => {
  return useOutletContext();
};
