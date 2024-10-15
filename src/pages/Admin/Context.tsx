import { useOutletContext } from "react-router-dom";
import type { UserV2 } from "types/auth";

export type AdminContext = { id: number; user: UserV2 };

export const useAdminContext = (): AdminContext => {
  return useOutletContext();
};
