import { useOutletContext } from "react-router-dom";
import type { UserV2 } from "types/auth";
import type { Endowment } from "types/aws";

export type AdminContext = {
  id: number;
  user: UserV2;
  /** need to be awaited */
  endow: Promise<Pick<Endowment, "logo" | "name">>;
};

export const useAdminContext = (): AdminContext => {
  return useOutletContext();
};
